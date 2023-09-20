import type { Country, CountryResponse, Currency } from "../types/country";

const API_ENDPOINT = "https://restcountries.com/v3.1/";
const dataFields = [
  "name",
  "cca3",
  "idd",
  "capital",
  "currencies",
  "languages",
  "flags",
  "subregion",
];

function generateCurrency(currencies: {
  [key: string]: { name: string };
}): Currency[] {
  const generatedCurrency: Currency[] = [];
  const currencyKeys = Object.keys(currencies);

  for (let i = 0; i < currencyKeys.length; i++) {
    const code = currencyKeys[0] as string;
    const name = currencies[`${currencyKeys[i]}`]?.name as string;

    generatedCurrency.push({
      code,
      name,
    });
  }

  return generatedCurrency;
}

function getAsianCountries(
  callback: (value: Country[], err: string) => void
): void {
  fetch(`${API_ENDPOINT}name/indonesia/?fields=${dataFields.join(",")}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data: CountryResponse[] | { status: number; message: string }) => {
      const countries: Country[] = [];
      let err = "";

      if (!Array.isArray(data)) {
        err = "Country not found!";
        callback(countries, err);
        return;
      }

      for (const country of data) {
        const refinedData: Country = {
          name: country.name.official,
          ISOCode: country.cca3,
          diallingCodes: country.idd.suffixes.map(
            (suffix) => `${country.idd.root}${suffix}`
          ),
          capital: country.capital,
          currencies: generateCurrency(country.currencies),
          languages: Object.values(country.languages),
          flag: { url: country.flags.png, alt: country.flags.alt },
          subregion: country.subregion,
        };

        countries.push(refinedData);
      }

      callback(countries, err);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getAsianCountries };
