import { API_ENDPOINT, queryFields } from "./apiUrl.js";

const generateCountry = (country) => {
  return {
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
};

const generateCurrency = (currencies) => {
  const generatedCurrency = [];
  const currencyKeys = Object.keys(currencies);

  for (let i = 0; i < currencyKeys.length; i++) {
    const code = currencyKeys[0];
    const name = currencies[`${currencyKeys[i]}`]?.name;

    generatedCurrency.push({
      code,
      name,
    });
  }

  return generatedCurrency;
};

const getAsianCountries = (callback) => {
  fetch(`${API_ENDPOINT}region/asia/?fields=${queryFields.join(",")}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const countries = [];
      let err = "";

      if (!Array.isArray(data)) {
        err = data.message;
        callback(countries, err);
        return;
      }

      for (const country of data) {
        countries.push(generateCountry(country));
      }

      callback(countries, err);
    })
    .catch((err) => {
      console.log(err);
    });
};

const searchAsianCountries = (searchKeywords, callback) => {
  fetch(`${API_ENDPOINT}region/asia/?fields=${queryFields.join(",")}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const searchedCountries = [];
      let err = "";

      if (!Array.isArray(data)) {
        err = data.message;
        callback(searchedCountries, err);
        return;
      }

      for (let i = 0; i < data.length; i++) {
        const country = data[i];
        if (country.name.official.toLowerCase().includes(searchKeywords)) {
          searchedCountries.push(generateCountry(country));
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
};

export { getAsianCountries, searchAsianCountries };
