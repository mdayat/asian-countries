import "./styles/reset.css";
import "./main.css";

import { getAsianCountries } from "./utils/country";
import type { Country } from "./types/country";

function renderCountries(countries: Country[], err: string) {
  if (err !== "") {
    const errMsgEl = document.createElement("h2");
    errMsgEl.textContent = err;
    document.body.appendChild(errMsgEl);
    return;
  }

  console.log(countries);
}

getAsianCountries(renderCountries);
