import "./components/CountryCard";
import "./styles/reset.css";
import "./main.css";

import { getAsianCountries, searchAsianCountries } from "./utils/country";
import { debounce } from "./utils/debounce";
import type { Country } from "./types/country";
import type { CountryCard } from "./components/CountryCard";

function renderAsianCountries(countries: Country[], err: string) {
  const countriesContainerEl = document.getElementsByClassName(
    "countries-container"
  )[0] as HTMLUListElement;
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
    const countryCard = document.createElement("country-card") as CountryCard;
    countryCard.country = country;
    countriesContainerEl.appendChild(countryCard);
  }
}

getAsianCountries(renderAsianCountries);

const debouncingSearch = debounce<string>((searchKeywords) => {
  searchAsianCountries(searchKeywords, renderAsianCountries);
}, 750);

const inputEl = document.getElementById("search") as HTMLInputElement;
inputEl.addEventListener("input", (event) => {
  const searchKeywords = (event.target as HTMLInputElement).value;
  debouncingSearch(searchKeywords);
});
