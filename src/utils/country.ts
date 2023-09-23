import type { Country, CountryResponse, Currency } from "../types/country";
import { API_ENDPOINT, queryFields } from "./apiUrl";

type Callback = (callback: Country[], err: string) => void;

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

function getAsianCountries(callback: Callback): void {
  fetch(`${API_ENDPOINT}region/asia/?fields=${queryFields.join(",")}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data: CountryResponse[] | { status: number; message: string }) => {
      const countries: Country[] = [];
      let err = "";

      if (!Array.isArray(data)) {
        err = data.message;
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

function searchAsianCountries(searchKeywords: string, callback: Callback) {
  fetch(`${API_ENDPOINT}region/asia/?fields=${queryFields.join(",")}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data: CountryResponse[] | { status: number; message: string }) => {
      const searchedCountries: Country[] = [];
      let err = "";

      if (!Array.isArray(data)) {
        err = data.message;
        callback(searchedCountries, err);
        return;
      }

      for (let i = 0; i < data.length; i++) {
        const country = data[i] as CountryResponse;

        if (country.name.official.toLowerCase().includes(searchKeywords)) {
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

          searchedCountries.push(refinedData);
        }
      }

      if (searchedCountries.length === 0) {
        err = `There is no country with the name of "${searchKeywords}"`;
        callback(searchedCountries, err);
      } else {
        callback(searchedCountries, err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getAsianCountries, searchAsianCountries };
