import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { eazotelApi } from "../api/eazotelApi";
import { logout, persistToken, setToken } from "./authSlice";
import type { RootState } from "../store";

export type OnboardingStep = "account" | "property" | "launch" | "success";

export const ONBOARDING_STEPS: { id: OnboardingStep; label: string }[] = [
  { id: "account", label: "Create account" },
  { id: "property", label: "Property details" },
  { id: "launch", label: "Review & launch" },
  { id: "success", label: "You're live" },
];

export const PROPERTY_CATEGORIES = [
  "Hotel",
  "Resort",
  "Homestay",
  "Villa",
  "Boutique Stay",
  "Hostel",
] as const;

export type LaunchStage =
  | "idle"
  | "account"
  | "subscription"
  | "website"
  | "template"
  | "done"
  | "error";

export interface OnboardingForm {
  hotelName: string;
  email: string;
  password: string;
  countryCode: string;
  // Alpha-3 country behind countryCode, as +1/+7 are shared. Empty until the
  // hotel picks one or it is detected from the device time zone.
  countryIso?: string;
  phone: string;
  category: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export interface OnboardingState {
  step: OnboardingStep;
  form: OnboardingForm;
  launchStage: LaunchStage;
  error: string | null;
  websiteLink: string | null;
  engineLink: string | null;
  websiteCreated: boolean;
}

const initialForm: OnboardingForm = {
  hotelName: "",
  email: "",
  password: "",
  countryCode: "+91",
  countryIso: "",
  phone: "",
  category: "Hotel",
  city: "",
  state: "",
  country: "",
  pinCode: "",
};

const initialState: OnboardingState = {
  step: "account",
  form: initialForm,
  launchStage: "idle",
  error: null,
  websiteLink: null,
  engineLink: null,
  websiteCreated: false,
};

// Progress survives a refresh so a half-finished signup can be resumed.
// The password is never stored.
const PROGRESS_STORAGE_KEY = "eazotelOnboarding";

type SavedProgress = Pick<
  OnboardingState,
  "step" | "form" | "websiteCreated" | "websiteLink" | "engineLink"
>;

export const readSavedProgress = (): SavedProgress | null => {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedProgress) : null;
  } catch {
    return null;
  }
};

export const saveProgress = (state: OnboardingState) => {
  try {
    const progress: SavedProgress = {
      step: state.step,
      form: { ...state.form, password: "" },
      websiteCreated: state.websiteCreated,
      websiteLink: state.websiteLink,
      engineLink: state.engineLink,
    };
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage unavailable (private mode) — progress stays in memory only
  }
};

// Templates the generator picks from, same set as the original flow.
const TEMPLATES = ["1", "2", "5", "6"];

// nexon sometimes sends a raw Python exception as the message, e.g.
// "('Unable to decode token error : {}', AttributeError(...))".
// Never show those to the hotel.
const looksLikeServerCrash = (text: string) =>
  /^\(|Error\(|Traceback|NoneType/.test(text);

const errorMessage = (err: unknown, fallback: string) => {
  if (err && typeof err === "object") {
    const e = err as { data?: { Message?: string; message?: string } };
    const text = e.data?.Message || e.data?.message;
    if (text && !looksLikeServerCrash(text)) return text;
  }
  return fallback;
};

// The token saved in this browser is no longer accepted (expired, or left over
// from another account). LaunchStep shows a "Log in again" button for this.
export const SESSION_EXPIRED_MESSAGE =
  "Your sign-in has expired. Log in again to finish setting up your website.";

const isTokenRejected = (text: string | undefined) =>
  !!text && /decode token|invalid token|token.*expired/i.test(text);

const rawMessage = (err: unknown) =>
  (err as { data?: { Message?: string; message?: string } })?.data?.Message ||
  (err as { data?: { Message?: string; message?: string } })?.data?.message;

/**
 * Runs the full launch sequence:
 *   1. register the account (skipped when already signed in)
 *   2. generate the website + booking engine (skipped on retry)
 *   3. create the trial subscription (409 = already done)
 *   4. apply a random starter template (non-fatal if it fails)
 */
export const launchOnboarding = createAsyncThunk<
  { websiteLink: string | null; engineLink: string | null },
  void,
  { state: RootState; rejectValue: string }
>("onboarding/launch", async (_, { getState, dispatch, rejectWithValue }) => {
  const { form } = getState().onboarding;
  let token = getState().auth.token;

  if (!token) {
    dispatch(setLaunchStage("account"));
    try {
      const res = await dispatch(
        eazotelApi.endpoints.createUser.initiate({
          register: true,
          emailId: form.email.trim(),
          userName: form.hotelName.trim(),
          accesskey: form.password,
        })
      ).unwrap();
      if (!res.Status || !res.Token) {
        return rejectWithValue(
          "This email is already registered. Please log in to continue."
        );
      }
      token = res.Token;
      persistToken(token);
      dispatch(setToken(token));
    } catch (err) {
      return rejectWithValue(
        errorMessage(err, "We couldn't reach the server. Please try again.")
      );
    }
  }

  // The website must come first: nexon /createwebsite inserts the
  // Zucks_profile row (ndid is its primary key) and fails if it exists.
  // On a retry after a later step failed, skip it instead of re-inserting.
  let { websiteLink, engineLink } = getState().onboarding;
  if (!getState().onboarding.websiteCreated) {
    dispatch(setLaunchStage("website"));
    try {
      const res = await dispatch(
        eazotelApi.endpoints.createWebsite.initiate({
          token,
          hotelName: form.hotelName.trim(),
          hotelPhone: `${form.countryCode}${form.phone}`,
          hotelEmail: form.email.trim(),
          category: form.category,
          city: form.city.trim(),
          state: form.state.trim(),
          country: form.country.trim(),
          pinCode: form.pinCode.trim(),
        })
      ).unwrap();
      if (!res.Status) {
        if (isTokenRejected(res.Message)) {
          persistToken(null);
          dispatch(logout());
          return rejectWithValue(SESSION_EXPIRED_MESSAGE);
        }
        return rejectWithValue(
          errorMessage(
            { data: res },
            "We couldn't generate your website. Please try again."
          )
        );
      }
      websiteLink = res.websiteLink ?? null;
      engineLink = res.engineLink ?? null;
      dispatch(setWebsiteCreated({ websiteLink, engineLink }));
    } catch (err) {
      if (isTokenRejected(rawMessage(err))) {
        persistToken(null);
        dispatch(logout());
        return rejectWithValue(SESSION_EXPIRED_MESSAGE);
      }
      return rejectWithValue(
        errorMessage(err, "We couldn't reach the server. Please try again.")
      );
    }
  }

  // Creates the trial subscription and links it to the profile made above.
  // 409 means this account is already onboarded, so carry on.
  dispatch(setLaunchStage("subscription"));
  try {
    const res = await dispatch(
      eazotelApi.endpoints.createOnboarding.initiate({
        token,
        hotelName: form.hotelName.trim(),
        hotelEmail: form.email.trim(),
        hotelPhone: `${form.countryCode}${form.phone}`,
        category: form.category,
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country.trim(),
        pinCode: form.pinCode.trim(),
      })
    ).unwrap();
    if (res.success === false && res.responseStatusCode !== 409) {
      return rejectWithValue(
        res.message || "We couldn't set up your subscription. Please try again."
      );
    }
  } catch (err) {
    const status = (err as { status?: unknown })?.status;
    const bodyStatus = (err as { data?: { responseStatusCode?: number } })
      ?.data?.responseStatusCode;
    if (status !== 409 && bodyStatus !== 409) {
      return rejectWithValue(
        errorMessage(err, "We couldn't set up your subscription. Please try again.")
      );
    }
  }

  dispatch(setLaunchStage("template"));
  try {
    await dispatch(
      eazotelApi.endpoints.changeTemplate.initiate({
        token,
        template: TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)],
      })
    ).unwrap();
  } catch {
    // The site already exists with the default template; carry on.
  }

  return { websiteLink, engineLink };
});

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<OnboardingForm>>) {
      state.form = { ...state.form, ...action.payload };
    },
    goToStep(state, action: PayloadAction<OnboardingStep>) {
      state.step = action.payload;
      state.error = null;
    },
    setLaunchStage(state, action: PayloadAction<LaunchStage>) {
      state.launchStage = action.payload;
    },
    setWebsiteCreated(
      state,
      action: PayloadAction<{
        websiteLink: string | null;
        engineLink: string | null;
      }>
    ) {
      state.websiteLink = action.payload.websiteLink;
      state.engineLink = action.payload.engineLink;
      state.websiteCreated = true;
    },
    setExistingWebsite(
      state,
      action: PayloadAction<{
        websiteLink: string | null;
        engineLink: string | null;
      }>
    ) {
      state.websiteLink = action.payload.websiteLink;
      state.engineLink = action.payload.engineLink;
      state.launchStage = "done";
      state.step = "success";
    },
    // The website exists but the subscription doesn't (e.g. the tab was
    // refreshed mid-launch). Back to the form; launch then only runs the
    // remaining subscription + template steps.
    resumeWithWebsite(
      state,
      action: PayloadAction<{
        websiteLink: string | null;
        engineLink: string | null;
      }>
    ) {
      state.websiteLink = action.payload.websiteLink;
      state.engineLink = action.payload.engineLink;
      state.websiteCreated = true;
      state.launchStage = "idle";
      const { hotelName, phone, city } = state.form;
      state.step = !hotelName ? "account" : phone && city ? "launch" : "property";
    },
    hydrateProgress(state, action: PayloadAction<SavedProgress | null>) {
      if (!action.payload) return;
      const { form, ...rest } = action.payload;
      Object.assign(state, rest);
      state.form = { ...initialForm, ...form, password: "" };
    },
    clearError(state) {
      state.error = null;
    },
    resetOnboarding() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(launchOnboarding.pending, (state) => {
        state.error = null;
      })
      .addCase(launchOnboarding.fulfilled, (state, action) => {
        state.launchStage = "done";
        state.websiteLink = action.payload.websiteLink;
        state.engineLink = action.payload.engineLink;
        state.step = "success";
        state.form.password = "";
      })
      .addCase(launchOnboarding.rejected, (state, action) => {
        state.launchStage = "error";
        state.error = action.payload ?? "Something went wrong.";
      });
  },
});

export const {
  updateForm,
  goToStep,
  setLaunchStage,
  setWebsiteCreated,
  setExistingWebsite,
  resumeWithWebsite,
  hydrateProgress,
  clearError,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
