// Copied from chat-bot-booking (LeadChatbot/countryMeta.ts); same country list.
import { countries } from "./countryCode";

// ISO 3166 alpha-3 (as in `countries`) -> alpha-2, for the flag and the name
const ISO2: Record<string, string> = {
  AFG: "AF", ALB: "AL", DZA: "DZ", AND: "AD", AGO: "AO", ATG: "AG", ARG: "AR",
  ARM: "AM", AUS: "AU", AUT: "AT", AZE: "AZ", BHS: "BS", BHR: "BH", BGD: "BD",
  BRB: "BB", BLR: "BY", BEL: "BE", BLZ: "BZ", BEN: "BJ", BTN: "BT", BOL: "BO",
  BIH: "BA", BWA: "BW", BRA: "BR", BRN: "BN", BGR: "BG", BFA: "BF", BDI: "BI",
  CPV: "CV", KHM: "KH", CMR: "CM", CAN: "CA", CAF: "CF", TCD: "TD", CHL: "CL",
  CHN: "CN", COL: "CO", COM: "KM", COG: "CG", CRI: "CR", HRV: "HR", CUB: "CU",
  CYP: "CY", CZE: "CZ", DNK: "DK", DJI: "DJ", DMA: "DM", DOM: "DO", TLS: "TL",
  ECU: "EC", EGY: "EG", SLV: "SV", GNQ: "GQ", ERI: "ER", EST: "EE", ETH: "ET",
  FJI: "FJ", FIN: "FI", FRA: "FR", GAB: "GA", GMB: "GM", GEO: "GE", DEU: "DE",
  GHA: "GH", GRC: "GR", GRD: "GD", GTM: "GT", GIN: "GN", GNB: "GW", GUY: "GY",
  HTI: "HT", HND: "HN", HUN: "HU", ISL: "IS", IND: "IN", IDN: "ID", IRN: "IR",
  IRQ: "IQ", IRL: "IE", ISR: "IL", ITA: "IT", JAM: "JM", JPN: "JP", JOR: "JO",
  KAZ: "KZ", KEN: "KE", KIR: "KI", PRK: "KP", KOR: "KR", XKX: "XK", KWT: "KW",
  KGZ: "KG", LAO: "LA", LVA: "LV", LBN: "LB", LSO: "LS", LBR: "LR", LBY: "LY",
  LIE: "LI", LTU: "LT", LUX: "LU", MDG: "MG", MWI: "MW", MYS: "MY", MDV: "MV",
  MLI: "ML", MLT: "MT", MHL: "MH", MRT: "MR", MUS: "MU", MEX: "MX", FSM: "FM",
  MDA: "MD", MCO: "MC", MNG: "MN", MNE: "ME", MAR: "MA", MOZ: "MZ", MMR: "MM",
  NAM: "NA", NRU: "NR", NPL: "NP", NLD: "NL", NZL: "NZ", NIC: "NI", NER: "NE",
  NGA: "NG", MKD: "MK", NOR: "NO", OMN: "OM", PAK: "PK", PLW: "PW", PSE: "PS",
  PAN: "PA", PNG: "PG", PRY: "PY", PER: "PE", PHL: "PH", POL: "PL", PRT: "PT",
  QAT: "QA", ROU: "RO", RUS: "RU", RWA: "RW", KNA: "KN", LCA: "LC", VCT: "VC",
  WSM: "WS", SMR: "SM", STP: "ST", SAU: "SA", SEN: "SN", SRB: "RS", SYC: "SC",
  SLE: "SL", SGP: "SG", SVK: "SK", SVN: "SI", SLB: "SB", SOM: "SO", ZAF: "ZA",
  SSD: "SS", ESP: "ES", LKA: "LK", SDN: "SD", SUR: "SR", SWE: "SE", CHE: "CH",
  SYR: "SY", TWN: "TW", TJK: "TJ", TZA: "TZ", THA: "TH", TGO: "TG", TON: "TO",
  TTO: "TT", TUN: "TN", TUR: "TR", TKM: "TM", TUV: "TV", UGA: "UG", UKR: "UA",
  ARE: "AE", GBR: "GB", USA: "US", URY: "UY", UZB: "UZ", VUT: "VU", VAT: "VA",
  VEN: "VE", VNM: "VN", YEM: "YE", ZMB: "ZM", ZWE: "ZW",
};

export interface Country {
  iso3: string;
  iso2: string;
  name: string;
  code: string;
  flag: string;
}

const flagEmoji = (iso2: string) =>
  String.fromCodePoint(...iso2.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0)));

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();

const countryName = (iso2: string, fallback: string) => {
  try {
    return (iso2 && regionNames?.of(iso2)) || fallback;
  } catch {
    return fallback;
  }
};

export const COUNTRY_LIST: Country[] = countries
  .map(({ name, code }) => {
    const iso2 = ISO2[name] || "";
    return {
      iso3: name,
      iso2,
      name: countryName(iso2, name),
      code,
      flag: iso2 ? flagEmoji(iso2) : "🌐",
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const INDIA = COUNTRY_LIST.find((c) => c.iso3 === "IND") as Country;

// IANA time zone -> country (alpha-2), for the countries in `countries`.
// Browsers may report older names (America/Indianapolis, Asia/Calcutta),
// so those are listed too.
const ZONES: Record<string, string> = {
  AF: "Asia/Kabul", AL: "Europe/Tirane", DZ: "Africa/Algiers", AD: "Europe/Andorra",
  AO: "Africa/Luanda", AG: "America/Antigua", AR: "America/Buenos_Aires America/Cordoba America/Catamarca America/Jujuy America/Mendoza America/Rosario", AM: "Asia/Yerevan",
  AT: "Europe/Vienna", AZ: "Asia/Baku", BS: "America/Nassau", BH: "Asia/Bahrain",
  BD: "Asia/Dhaka Asia/Dacca", BB: "America/Barbados", BY: "Europe/Minsk", BE: "Europe/Brussels",
  BZ: "America/Belize", BJ: "Africa/Porto-Novo", BT: "Asia/Thimphu Asia/Thimbu", BO: "America/La_Paz",
  BA: "Europe/Sarajevo", BW: "Africa/Gaborone",
  BR: "America/Sao_Paulo America/Bahia America/Belem America/Fortaleza America/Recife America/Manaus America/Cuiaba America/Campo_Grande America/Porto_Velho America/Boa_Vista America/Rio_Branco America/Noronha America/Araguaina America/Maceio America/Santarem America/Eirunepe",
  BN: "Asia/Brunei", BG: "Europe/Sofia", BF: "Africa/Ouagadougou", BI: "Africa/Bujumbura",
  CV: "Atlantic/Cape_Verde", KH: "Asia/Phnom_Penh", CM: "Africa/Douala",
  CA: "America/Toronto America/Vancouver America/Edmonton America/Winnipeg America/Halifax America/St_Johns America/Regina America/Montreal America/Moncton America/Whitehorse America/Yellowknife America/Iqaluit America/Glace_Bay America/Goose_Bay America/Swift_Current America/Dawson_Creek America/Rankin_Inlet",
  CF: "Africa/Bangui", TD: "Africa/Ndjamena", CL: "America/Santiago America/Punta_Arenas Pacific/Easter",
  CN: "Asia/Shanghai Asia/Urumqi Asia/Chongqing Asia/Harbin", CO: "America/Bogota", KM: "Indian/Comoro",
  CG: "Africa/Brazzaville", CR: "America/Costa_Rica", HR: "Europe/Zagreb", CU: "America/Havana",
  CY: "Asia/Nicosia Europe/Nicosia Asia/Famagusta", CZ: "Europe/Prague", DK: "Europe/Copenhagen",
  DJ: "Africa/Djibouti", DM: "America/Dominica", DO: "America/Santo_Domingo", TL: "Asia/Dili",
  EC: "America/Guayaquil Pacific/Galapagos", EG: "Africa/Cairo", SV: "America/El_Salvador",
  GQ: "Africa/Malabo", ER: "Africa/Asmara Africa/Asmera", EE: "Europe/Tallinn",
  ET: "Africa/Addis_Ababa", FJ: "Pacific/Fiji", FI: "Europe/Helsinki", FR: "Europe/Paris",
  GA: "Africa/Libreville", GM: "Africa/Banjul", GE: "Asia/Tbilisi", DE: "Europe/Berlin Europe/Busingen",
  GH: "Africa/Accra", GR: "Europe/Athens", GD: "America/Grenada", GT: "America/Guatemala",
  GN: "Africa/Conakry", GW: "Africa/Bissau", GY: "America/Guyana", HT: "America/Port-au-Prince",
  HN: "America/Tegucigalpa", HU: "Europe/Budapest", IS: "Atlantic/Reykjavik",
  IN: "Asia/Kolkata Asia/Calcutta", ID: "Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura",
  IR: "Asia/Tehran", IQ: "Asia/Baghdad", IE: "Europe/Dublin", IL: "Asia/Jerusalem Asia/Tel_Aviv",
  IT: "Europe/Rome", JM: "America/Jamaica", JP: "Asia/Tokyo", JO: "Asia/Amman",
  KZ: "Asia/Almaty Asia/Qyzylorda Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral Asia/Qostanay",
  KE: "Africa/Nairobi", KI: "Pacific/Tarawa Pacific/Kanton Pacific/Kiritimati Pacific/Enderbury",
  KP: "Asia/Pyongyang", KR: "Asia/Seoul", KW: "Asia/Kuwait", KG: "Asia/Bishkek", LA: "Asia/Vientiane",
  LV: "Europe/Riga", LB: "Asia/Beirut", LS: "Africa/Maseru", LR: "Africa/Monrovia", LY: "Africa/Tripoli",
  LI: "Europe/Vaduz", LT: "Europe/Vilnius", LU: "Europe/Luxembourg", MG: "Indian/Antananarivo",
  MW: "Africa/Blantyre", MY: "Asia/Kuala_Lumpur Asia/Kuching", MV: "Indian/Maldives", ML: "Africa/Bamako",
  MT: "Europe/Malta", MH: "Pacific/Majuro Pacific/Kwajalein", MR: "Africa/Nouakchott",
  MU: "Indian/Mauritius",
  MX: "America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Chihuahua America/Ojinaga America/Mazatlan America/Hermosillo America/Tijuana America/Bahia_Banderas America/Ciudad_Juarez",
  FM: "Pacific/Chuuk Pacific/Truk Pacific/Pohnpei Pacific/Ponape Pacific/Kosrae", MD: "Europe/Chisinau", MC: "Europe/Monaco",
  MN: "Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan", ME: "Europe/Podgorica", MA: "Africa/Casablanca",
  MZ: "Africa/Maputo", MM: "Asia/Yangon Asia/Rangoon", NA: "Africa/Windhoek", NR: "Pacific/Nauru",
  NP: "Asia/Kathmandu Asia/Katmandu", NL: "Europe/Amsterdam", NZ: "Pacific/Auckland Pacific/Chatham",
  NI: "America/Managua", NE: "Africa/Niamey", NG: "Africa/Lagos", MK: "Europe/Skopje", NO: "Europe/Oslo",
  OM: "Asia/Muscat", PK: "Asia/Karachi", PW: "Pacific/Palau", PS: "Asia/Gaza Asia/Hebron",
  PA: "America/Panama", PG: "Pacific/Port_Moresby Pacific/Bougainville", PY: "America/Asuncion",
  PE: "America/Lima", PH: "Asia/Manila", PL: "Europe/Warsaw",
  PT: "Europe/Lisbon Atlantic/Azores Atlantic/Madeira", QA: "Asia/Qatar", RO: "Europe/Bucharest",
  RU: "Europe/Moscow Europe/Kaliningrad Europe/Samara Europe/Volgograd Europe/Saratov Europe/Ulyanovsk Europe/Astrakhan Europe/Kirov Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr",
  RW: "Africa/Kigali", KN: "America/St_Kitts", LC: "America/St_Lucia", VC: "America/St_Vincent",
  WS: "Pacific/Apia", SM: "Europe/San_Marino", ST: "Africa/Sao_Tome", SA: "Asia/Riyadh",
  SN: "Africa/Dakar", RS: "Europe/Belgrade", SC: "Indian/Mahe", SL: "Africa/Freetown",
  SG: "Asia/Singapore", SK: "Europe/Bratislava", SI: "Europe/Ljubljana", SB: "Pacific/Guadalcanal",
  SO: "Africa/Mogadishu", ZA: "Africa/Johannesburg", SS: "Africa/Juba",
  ES: "Europe/Madrid Africa/Ceuta Atlantic/Canary", LK: "Asia/Colombo", SD: "Africa/Khartoum",
  SR: "America/Paramaribo", SE: "Europe/Stockholm", CH: "Europe/Zurich", SY: "Asia/Damascus",
  TW: "Asia/Taipei", TJ: "Asia/Dushanbe", TZ: "Africa/Dar_es_Salaam", TH: "Asia/Bangkok",
  TG: "Africa/Lome", TO: "Pacific/Tongatapu", TT: "America/Port_of_Spain", TN: "Africa/Tunis",
  TR: "Europe/Istanbul Asia/Istanbul", TM: "Asia/Ashgabat", TV: "Pacific/Funafuti", UG: "Africa/Kampala",
  UA: "Europe/Kyiv Europe/Kiev Europe/Uzhgorod Europe/Zaporozhye", AE: "Asia/Dubai",
  GB: "Europe/London Europe/Belfast",
  US: "America/New_York America/Chicago America/Denver America/Los_Angeles America/Phoenix America/Anchorage America/Detroit America/Boise America/Juneau America/Adak America/Menominee America/Nome America/Sitka America/Yakutat America/Metlakatla America/Indianapolis America/Fort_Wayne America/Knox_IN America/Louisville Pacific/Honolulu",
  UY: "America/Montevideo", UZ: "Asia/Tashkent Asia/Samarkand", VU: "Pacific/Efate", VA: "Europe/Vatican",
  VE: "America/Caracas", VN: "Asia/Ho_Chi_Minh Asia/Saigon", YE: "Asia/Aden", ZM: "Africa/Lusaka",
  ZW: "Africa/Harare",
};

// whole regions of one country (e.g. America/Argentina/Cordoba)
const ZONE_PREFIXES: [string, string][] = [
  ["America/Argentina/", "AR"],
  ["Australia/", "AU"],
  ["America/Indiana/", "US"],
  ["America/Kentucky/", "US"],
  ["America/North_Dakota/", "US"],
];

const ZONE_TO_ISO2 = new Map(
  Object.entries(ZONES).flatMap(([iso2, zones]) => zones.split(" ").map((zone) => [zone, iso2]))
);

const countryFromTimeZone = (timeZone: string): string => {
  const direct = ZONE_TO_ISO2.get(timeZone);
  if (direct) return direct;
  const prefix = ZONE_PREFIXES.find(([start]) => timeZone.startsWith(start));
  return prefix ? prefix[1] : "";
};

// The visitor's country from the time zone their device is set to
// (Asia/Kolkata -> India, Europe/London -> UK). It needs no network call or
// IP lookup. Unknown zones (UTC, or a country not in the list) -> India.
export const detectCountry = (): Country => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const iso2 = countryFromTimeZone(timeZone);
    return COUNTRY_LIST.find((c) => c.iso2 === iso2) || INDIA;
  } catch {
    return INDIA;
  }
};

// The country picked in a code dropdown. +1 and +7 are shared (USA/Canada,
// Russia/Kazakhstan), so the dropdown keeps the country, not just the code.
export const countryFor = (code: string, iso3?: string): Country | undefined =>
  COUNTRY_LIST.find((c) => c.iso3 === iso3 && c.code === code) ||
  COUNTRY_LIST.find((c) => c.code === code);

// Search by country name, ISO code or dialling code ("ind", "+44", "1").
export const searchCountries = (query: string) => {
  const q = query.trim().toLowerCase().replace(/^\+/, "");
  if (!q) return COUNTRY_LIST;
  return COUNTRY_LIST.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.iso3.toLowerCase() === q ||
      c.iso2.toLowerCase() === q ||
      c.code.replace(/\D/g, "").startsWith(q.replace(/\D/g, "") || "_")
  );
};

// Windows has no flag emoji (it shows "IN"), so flags are small images.
export const flagUrl = (iso2: string) =>
  `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
