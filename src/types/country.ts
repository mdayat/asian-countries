interface Currency {
  name: string;
  code: string;
}

interface CountryFlag {
  url: string;
  alt: string;
}

interface Country {
  name: string;
  ISOCode: string;
  diallingCode: string[];
  capital: string[];
  currency: Currency[];
  language: string[];
  flag: CountryFlag;
  subregion: string;
}

export type { Country };
