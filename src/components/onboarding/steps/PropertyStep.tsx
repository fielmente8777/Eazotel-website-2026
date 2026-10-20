"use client";

import { useLazyReverseGeocodeQuery } from "@/store/api/eazotelApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  goToStep,
  OnboardingForm,
  PROPERTY_CATEGORIES,
  updateForm,
} from "@/store/slices/onboardingSlice";
import { detectCountry } from "@/utils/countryMeta";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCrosshair,
  FiLoader,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import CountryCodePicker from "../CountryCodePicker";
import { Button, FieldError, TextField } from "../ui";
import { FormErrors, validateProperty } from "../validation";

const PropertyStep = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.onboarding.form);
  const [errors, setErrors] = useState<FormErrors>({});
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);
  const [reverseGeocode] = useLazyReverseGeocodeQuery();

  // Default the code to the visitor's country (from the device time zone),
  // unless a code was already picked or a phone came in from Google.
  useEffect(() => {
    if (form.countryIso || form.phone) return;
    const country = detectCountry();
    dispatch(updateForm({ countryCode: country.code, countryIso: country.iso3 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const set =
    (field: keyof OnboardingForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        field === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value;
      dispatch(updateForm({ [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const detectLocation = () => {
    setLocateError(null);
    if (!navigator.geolocation) {
      setLocateError("Location isn't supported by this browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const data = await reverseGeocode({
            latitude: coords.latitude,
            longitude: coords.longitude,
          }).unwrap();
          dispatch(
            updateForm({
              city: data.city || data.locality || "",
              state: data.principalSubdivision || "",
              country: data.countryName || "",
              pinCode: data.postcode || "",
            })
          );
          setErrors((prev) => ({ ...prev, city: undefined, country: undefined }));
        } catch {
          setLocateError("Couldn't look up your location. Please type it in.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setLocateError("Location permission denied. Please type it in.");
      },
      { timeout: 10000 }
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validateProperty(form);
    setErrors(next);
    if (Object.keys(next).length === 0) dispatch(goToStep("launch"));
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-primary text-2xl font-semibold md:text-3xl">
          Where are guests staying?
        </h2>
        <p className="text-white/60">
          We use this to set up your website, contact details and booking engine.
        </p>
      </div>

      {/* category */}
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-white/80">
          Property type
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PROPERTY_CATEGORIES.map((cat) => {
            const active = form.category === cat;
            return (
              <label
                key={cat}
                className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-color-4/40 ${
                  active
                    ? "border-color-4 bg-color-4/15 text-white"
                    : "border-white/10 bg-[#1E1E1E] text-white/70 hover:border-white/25 hover:text-white"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={active}
                  onChange={set("category")}
                  className="sr-only"
                />
                {cat}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* phone */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-white/80">
          Reservation phone number
        </label>
        <div
          className={`flex rounded-lg border bg-[#1E1E1E] transition-all focus-within:border-color-4 focus-within:ring-2 focus-within:ring-color-4/30 ${errors.phone ? "border-[#FF6161]/70" : "border-white/10"}`}
        >
          <CountryCodePicker
            code={form.countryCode}
            iso3={form.countryIso}
            onChange={(c) =>
              dispatch(updateForm({ countryCode: c.code, countryIso: c.iso3 }))
            }
          />
          <div className="relative flex-1">
            <FiPhone className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9EA3AB]" />
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="98765 43210"
              value={form.phone}
              onChange={set("phone")}
              autoComplete="tel-national"
              className="w-full bg-transparent py-3.5 pr-4 pl-9 text-white outline-none placeholder:text-[#9EA3AB]"
            />
          </div>
        </div>
        {errors.phone && <FieldError message={errors.phone} />}
      </div>

      {/* location */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-sm font-medium text-white/80">
            <FiMapPin className="text-color-4" /> Location
          </span>
          <button
            type="button"
            onClick={detectLocation}
            disabled={locating}
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15 disabled:opacity-60"
          >
            {locating ? <FiLoader className="animate-spin" /> : <FiCrosshair />}
            {locating ? "Detecting…" : "Detect my location"}
          </button>
        </div>
        {locateError && <p className="text-xs text-[#F5C451]">{locateError}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="City"
            placeholder="Mussoorie"
            value={form.city}
            onChange={set("city")}
            error={errors.city}
            autoComplete="address-level2"
          />
          <TextField
            label="State / Region"
            placeholder="Uttarakhand"
            value={form.state}
            onChange={set("state")}
            autoComplete="address-level1"
          />
          <TextField
            label="Country"
            placeholder="India"
            value={form.country}
            onChange={set("country")}
            error={errors.country}
            autoComplete="country-name"
          />
          <TextField
            label="PIN / ZIP code"
            placeholder="248179"
            value={form.pinCode}
            onChange={set("pinCode")}
            autoComplete="postal-code"
          />
        </div>
      </div>

      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row">
        <Button
          type="button"
          variant="ghost"
          onClick={() => dispatch(goToStep("account"))}
          className="sm:w-auto"
        >
          <FiArrowLeft /> Back
        </Button>
        <Button type="submit" icon={<FiArrowRight />} className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default PropertyStep;
