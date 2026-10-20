import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EAZOTEL_API_BASE_URL = "https://nexon.eazotel.com/eazotel";
export const DASHBOARD_URL = "https://dashboard.eazotel.com";
// Newer backend that records the onboarding and creates the subscription.
// export const GIAN_API_URL = "http://localhost:8000/api/v1"; // local host url
export const GIAN_API_URL = "https://gian-1eve.onrender.com/api/v1";
export const ONBOARDING_API_URL = `${GIAN_API_URL}/onboarding`;
export const SUBSCRIPTION_API_URL = `${GIAN_API_URL}/subscription/my`;
export const PROPERTY_LOOKUP_URL = `${GIAN_API_URL}/onboarding/lookup`;

// ---------- response / request types ----------

export interface CreateUserRequest {
  register: boolean;
  emailId: string;
  userName: string;
  accesskey: string;
}

export interface CreateUserResponse {
  Status: boolean;
  Token?: string;
  Message?: string;
}

export interface GetUserResponse {
  Status: boolean;
  Data?: {
    websiteLink?: string;
    bookingEngineLink?: string;
  };
  Message?: string;
}

export interface CreateWebsiteRequest {
  token: string;
  hotelName: string;
  hotelPhone: string;
  hotelEmail: string;
  category: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export interface CreateWebsiteResponse {
  Status: boolean;
  websiteLink?: string;
  engineLink?: string;
  Message?: string;
}

export interface CreateOnboardingRequest {
  token: string;
  hotelName: string;
  hotelEmail: string;
  hotelPhone: string;
  category: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export interface CreateOnboardingResponse {
  success?: boolean;
  message?: string;
  responseStatusCode?: number;
  responseMessage?: string;
}

export interface ChangeTemplateRequest {
  token: string;
  template: string;
}

export interface ReverseGeocodeResponse {
  locality?: string;
  city?: string;
  countryCode?: string;
  countryName?: string;
  principalSubdivision?: string;
  postcode?: string;
}

// One Google Maps listing from gian's /onboarding/lookup.
export interface PropertyMatch {
  placeId: string;
  title: string;
  fullAddress: string;
  type: string;
  rating: number | null;
  thumbnail: string;
  details: {
    hotelName: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    hotelPhone: string;
    accommodationType: string;
  };
}

// Defaults the Eazotel backend expects when a website is generated. The hotel
// can change all of these later from the dashboard.
const buildWebsitePayload = (req: CreateWebsiteRequest) => ({
  Token: req.token,
  template: "1",
  hotelName: req.hotelName,
  hotelPhone: req.hotelPhone,
  // nexon copies hotelAddress into the first location's `local`, which both
  // dashboards show as the property name (an empty one stays empty, it does
  // not fall back to hotelName). So it gets the hotel name, not an address.
  hotelAddress: req.hotelName,
  hotelState: req.state,
  hotelCity: req.city,
  hotelCountry: req.country,
  hotelPinCode: req.pinCode || "112233",
  hotelEmail: req.hotelEmail,
  oldWebsite: "",
  planName: "P1",
  category: req.category,
  currency: "INR",
  starRating: "4",
  hasPool: "false",
  breakfastOption: [],
  serveBreakfast: "false",
  breakfastIncluded: "false",
  parkingType: "best",
  parkingAvailability: "false",
  parkingCost: "200",
  parkingLocation: "underground",
  pricingStructure: "",
  reservationRequirement: "false",
  logo: "https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-media-logo-png-image_1744656.jpg",
  totalroomCategory: "0",
  roomCategories: [],
  bannerVideo: "",
  hotelDescription: "Best Hotel",
  customDomain: "",
  colorCombination: {
    backgroundColor: "#153B5B",
    buttonColor: "#0A3A75",
    fontColor: "#0A3A75",
    boardColor: "#0A3A75",
  },
  Facilities: {
    FrontDesk: "true",
    Wifi: "false",
    Board: "false",
    Rooftop_Cafe: "false",
    Health_Club: "false",
    Express_checks: "false",
    Wave_Bar: "false",
    Conference_Hall: "false",
    Alchemy: "false",
    Suncafe: "false",
    Doctor: "false",
    Spa: "false",
    Babysitting: "false",
    Electricity: "false",
    Concierge: "false",
    Conditinoer: "false",
    Security: "false",
    TravelTour: "false",
    Currency_Exchange: "false",
    Laundry: "false",
    Casino: "false",
    Parking: "false",
    Elevator: "false",
    Jacuzzi: "false",
    Room_Service: "false",
    Accept_Cards: "false",
    Child_Care: "false",
    Conference_Rooms: "false",
    Fitness_Center: "false",
    "Health_&_Beauty": "false",
    Restaurant: "false",
    Swimming_Pool: "false",
    Housekeep: "false",
    cofeemaker: "false",
    minibar: "false",
    Evpoint: "false",
    SaunaStream: "false",
  },
  checkInFrom: "2024-02-12",
  checkInUntil: "01:33",
  petCharges: "100",
  allowPets: "true",
  checkOutFrom: "2024-02-12",
  allowChildren: "true",
  checkOutUntil: "01:33",
  languages: ["English"],
  pagesRequired: {},
  establishedSince: "1995",
  document: {},
  otaRequired: {},
});

// gian onboarding.controller reads these camelCase keys from propertyDetails.
const buildOnboardingPayload = (req: CreateOnboardingRequest) => ({
  propertyDetails: {
    hotelName: req.hotelName,
    hotelEmail: req.hotelEmail,
    hotelPhone: req.hotelPhone,
    hotelDescription: "",
    currency: "INR",
    category: req.category,
    address: [req.city, req.state].filter(Boolean).join(", "),
    city: req.city,
    state: req.state,
    country: req.country,
    pinCode: req.pinCode,
  },
});

export const eazotelApi = createApi({
  reducerPath: "eazotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: EAZOTEL_API_BASE_URL,
    // fetchBaseQuery sets Content-Type: application/json for object bodies.
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json, text/plain, */*");
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Handles both sign up (register: true) and sign in (register: false).
    // Note: the endpoint name "ceateuser" is spelled this way on the backend.
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: ({ register, ...body }) => ({
        url: "/ceateuser",
        method: "POST",
        body: { register: String(register), ...body },
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query<GetUserResponse, string>({
      query: (token) => `/getuser/${encodeURIComponent(token)}`,
      providesTags: ["User"],
    }),

    createWebsite: builder.mutation<CreateWebsiteResponse, CreateWebsiteRequest>(
      {
        query: (req) => ({
          url: "/createwebsite",
          method: "POST",
          body: buildWebsitePayload(req),
        }),
        invalidatesTags: ["User"],
      }
    ),

    // Absolute URL — creates the onboarding record + subscription.
    createOnboarding: builder.mutation<
      CreateOnboardingResponse,
      CreateOnboardingRequest
    >({
      query: (req) => ({
        url: ONBOARDING_API_URL,
        method: "POST",
        headers: { Authorization: `Bearer ${req.token}` },
        body: buildOnboardingPayload(req),
      }),
    }),

    // Absolute URL — true when the account has a subscription, false on
    // gian's 404 ("Subscription not found for this user"). Other failures
    // stay errors so callers can tell "missing" from "couldn't check".
    hasSubscription: builder.query<boolean, string>({
      query: (token) => ({
        url: SUBSCRIPTION_API_URL,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: () => true,
    }),

    changeTemplate: builder.mutation<{ Status: boolean }, ChangeTemplateRequest>(
      {
        query: ({ token, template }) => ({
          url: "/changeTemplate",
          method: "POST",
          body: { Token: token, template },
        }),
      }
    ),

    // Absolute URL — finds the property on Google Maps by its name (q) or by
    // the website domain of a work email, to pre-fill the form.
    lookupProperty: builder.query<
      PropertyMatch[],
      { q: string } | { email: string }
    >({
      query: (params) => ({ url: PROPERTY_LOOKUP_URL, params }),
      transformResponse: (res: { result?: { matches?: PropertyMatch[] } }) =>
        res.result?.matches ?? [],
    }),

    // Absolute URL — fetchBaseQuery skips the baseUrl for absolute URLs.
    reverseGeocode: builder.query<
      ReverseGeocodeResponse,
      { latitude: number; longitude: number }
    >({
      query: ({ latitude, longitude }) => ({
        url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useCreateWebsiteMutation,
  useCreateOnboardingMutation,
  useLazyHasSubscriptionQuery,
  useChangeTemplateMutation,
  useLookupPropertyQuery,
  useLazyReverseGeocodeQuery,
} = eazotelApi;

export const dashboardLink = (token: string) =>
  `${DASHBOARD_URL}/?id=${encodeURIComponent(token)}`;
