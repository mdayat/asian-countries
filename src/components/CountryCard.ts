import type { Country } from "../types/country";

class CountryCard extends HTMLElement {
  _country: Country = {
    name: "",
    ISOCode: "",
    diallingCodes: [],
    capital: [],
    currencies: [],
    subregion: "",
    languages: [],
    flag: { url: "", alt: "" },
  };

  set country(country: Country) {
    this._country = country;
    this.render();
  }

  connectedCallback() {}

  disconnectedCallback() {}

  render() {
    this.setAttribute("class", "country-card");

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", this._country.flag.url);
    imgEl.setAttribute("alt", this._country.flag.alt);
    this.appendChild(imgEl);

    const divEl = document.createElement("div");
    this.appendChild(divEl);

    const h3El = document.createElement("h3");
    h3El.textContent = this._country.name;
    divEl.appendChild(h3El);

    const pEl = document.createElement("p");
    divEl.appendChild(pEl);

    const subregionSpanEl = document.createElement("span");
    subregionSpanEl.textContent = this._country.subregion;
    pEl.appendChild(subregionSpanEl);

    const iddSpanEl = document.createElement("span");
    iddSpanEl.textContent = this._country.diallingCodes[0] as string;
    pEl.appendChild(iddSpanEl);

    const buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.setAttribute("class", "btn-primary");
    buttonEl.textContent = "Details";
    this.appendChild(buttonEl);
  }
}

customElements.define("country-card", CountryCard);
export { CountryCard };
