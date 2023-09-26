import "./components/CountryCard.js";
import "./styles/reset.css";
import "./main.css";

import { getAsianCountries, searchAsianCountries } from "./utils/country.js";
import { debounce } from "./utils/debounce.js";

function renderAsianCountries(countries, err) {
  const countriesContainerEl = document.getElementsByClassName(
    "countries-container"
  )[0];
  const amountOfChildEl = countriesContainerEl.childElementCount;

  if (amountOfChildEl !== 0) {
    for (let i = 1; i <= amountOfChildEl; i++) {
      countriesContainerEl.firstElementChild?.remove();
    }
  }

  if (err !== "") {
    const errContainerEl = document.createElement("p");
    errContainerEl.setAttribute("class", "error-message");
    errContainerEl.textContent = "Uh Oh!";

    const errMsgEl = document.createElement("span");
    errMsgEl.textContent = err;
    errContainerEl.appendChild(errMsgEl);
    countriesContainerEl.appendChild(errContainerEl);
    return;
  }

  for (const country of countries) {
    const countryCard = document.createElement("country-card");
    countryCard.country = country;
    countriesContainerEl.appendChild(countryCard);
  }
}

getAsianCountries(renderAsianCountries);

const debouncingSearch = debounce((searchKeywords) => {
  searchAsianCountries(searchKeywords, renderAsianCountries);
}, 750);

const inputEl = document.getElementById("search");
inputEl.addEventListener("input", (event) => {
  const searchKeywords = event.target.value;
  debouncingSearch(searchKeywords);
});
