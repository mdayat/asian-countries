import "./styles/reset.css";
import "./main.css";

import { getAsianCountries, searchAsianCountries } from "./utils/country";
import { debounce } from "./utils/debounce";
import type { Country } from "./types/country";

function renderAsianCountries(countries: Country[], err: string) {
  if (err !== "") {
    const errMsgEl = document.createElement("h2");
    errMsgEl.textContent = err;
    document.body.appendChild(errMsgEl);
    return;
  }

  console.log(countries);
}

getAsianCountries(renderAsianCountries);

const debouncingSearch = debounce<string>((searchKeywords) => {
  searchAsianCountries(searchKeywords, renderAsianCountries);
}, 1000);

const inputEl = document.getElementById("search") as HTMLInputElement;
inputEl.addEventListener("input", (event) => {
  const searchKeywords = (event.target as HTMLInputElement).value;
  debouncingSearch(searchKeywords);
});
