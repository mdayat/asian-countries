interface CountryFlag {
  url: string;
  alt: string;
}

interface Currency {
  code: string;
  name: string;
}

interface CountryResponse {
  name: { official: string };
  cca3: string;
  idd: { root: string; suffixes: string[] };
  capital: string[];
  currencies: { [key: string]: { name: string } };
  languages: string[];
  flags: { png: string; alt: string };
  subregion: string;
}

interface Country {
  name: string;
  ISOCode: string;
  diallingCodes: string[];
  capital: string[];
  currencies: Currency[];
  languages: string[];
  flag: CountryFlag;
  subregion: string;
}

export type { Currency, Country, CountryResponse };
