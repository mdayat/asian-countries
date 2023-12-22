function closeCountryDetails(event) {
  const countryDetailsEl = event.target.parentElement?.parentElement;
  window.onscroll = () => {};
  window.scrollTo(0, countryDetailsEl.scrollY);
  countryDetailsEl.remove();
}

class CountryDetails extends HTMLElement {
  scrollY = 0;
  _country = {
    name: "",
    ISOCode: "",
    diallingCodes: [],
    capital: [],
    currencies: [],
    subregion: "",
    languages: [],
    flag: { url: "", alt: "" },
  };

  set country(country) {
    this._country = country;
    this.render();
  }

  connectedCallback() {
    this.scrollY = Number(this.getAttribute("scrollY"));
    window.scrollTo(0, 0);
    window.onscroll = () => {
      window.scrollTo(0, 0);
    };

    const btnCloseEl = this.firstElementChild?.lastElementChild;
    btnCloseEl.addEventListener("click", closeCountryDetails);
  }

  disconnectedCallback() {
    const btnCloseEl = this.firstElementChild?.lastElementChild;
    btnCloseEl.removeEventListener("click", closeCountryDetails);
  }

  render() {
    this.setAttribute("class", "country-details");

    const articleEl = document.createElement("article");
    this.appendChild(articleEl);

    const firstDiv = document.createElement("div");
    articleEl.appendChild(firstDiv);

    const firstPEl = document.createElement("p");
    firstDiv.appendChild(firstPEl);
    const subregionTitleEl = document.createElement("strong");
    subregionTitleEl.textContent = "Subregion";
    firstPEl.appendChild(subregionTitleEl);
    const ccaTitleEl = document.createElement("strong");
    ccaTitleEl.textContent = "Country Code";
    firstPEl.appendChild(ccaTitleEl);

    const secondPEl = document.createElement("p");
    firstDiv.appendChild(secondPEl);
    const subregionEl = document.createElement("span");
    subregionEl.textContent = this._country.subregion;
    secondPEl.appendChild(subregionEl);
    const ccaEl = document.createElement("span");
    ccaEl.textContent = this._country.ISOCode;
    secondPEl.appendChild(ccaEl);

    const secondDiv = document.createElement("div");
    articleEl.appendChild(secondDiv);
    const capitalTitleEl = document.createElement("strong");
    capitalTitleEl.textContent = "Capital";
    secondDiv.appendChild(capitalTitleEl);
    const capitalContainerEl = document.createElement("ul");
    secondDiv.appendChild(capitalContainerEl);
    for (const capital of this._country.capital) {
      const capitalItemEl = document.createElement("li");
      capitalItemEl.textContent = capital;
      capitalContainerEl.appendChild(capitalItemEl);
    }

    const thirdDiv = document.createElement("div");
    articleEl.appendChild(thirdDiv);
    const currencyTitleEl = document.createElement("strong");
    currencyTitleEl.textContent = "Currencies";
    thirdDiv.appendChild(currencyTitleEl);
    const currencyContainerEl = document.createElement("ul");
    thirdDiv.appendChild(currencyContainerEl);
    for (const currency of this._country.currencies) {
      const currencyItemEl = document.createElement("li");
      currencyItemEl.textContent = `${currency.name} (${currency.code})`;
      currencyContainerEl.appendChild(currencyItemEl);
    }

    const fourthDiv = document.createElement("div");
    articleEl.appendChild(fourthDiv);
    const langTitleEl = document.createElement("strong");
    langTitleEl.textContent = "Languages";
    fourthDiv.appendChild(langTitleEl);
    const langContainerEl = document.createElement("ul");
    fourthDiv.appendChild(langContainerEl);
    for (const language of this._country.languages) {
      const currencyItemEl = document.createElement("li");
      currencyItemEl.textContent = language;
      langContainerEl.appendChild(currencyItemEl);
    }

    const buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.setAttribute("class", "btn-primary");
    buttonEl.textContent = "Close";
    articleEl.appendChild(buttonEl);
  }
}

customElements.define("country-details", CountryDetails);
export { CountryDetails };
