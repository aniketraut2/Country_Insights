let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-input");
let result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value.trim();
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);

  if (countryName !== "") {
    fetch(finalURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 404) {
          // Country not found
          result.innerHTML = "<h3>Country not found</h3>";
        } else {
          const country = data[0];

          // Display country information
          result.innerHTML = `
            <img src="${country.flags.svg}" class="flag-img">
            <h2>${country.name.common}</h2>
            <div class="wrapper">
              <div class="data-wrapper">
                <h4><b>Capital:</b></h4>
                <span>${country.capital[0]}</span>
              </div>
            </div>
            <div class="wrapper">
              <div class="data-wrapper">
                <h4><b>Continent:</b></h4>
                <span>${country.continents[0]}</span>
              </div>
            </div>
            <div class="wrapper">
              <div class="data-wrapper">
                <h4><b>Population:</b></h4>
                <span>${country.population}</span>
              </div>
            </div>
            <div class="wrapper">
              <div class="data-wrapper">
                <h4><b>Currency:</b></h4>
                <span>${country.currencies[Object.keys(country.currencies)].name} - ${Object.keys(country.currencies)[0]}</span>
              </div>
            </div>
            <div class="wrapper">
              <div class="data-wrapper">
                <h4><b>Common Languages:</b></h4>
                <span>${Object.values(country.languages).join(", ")}</span>
              </div>
            </div>
          `;
        }
      })
      .catch(() => {
        result.innerHTML = "<h3>Something went wrong. Please try again.</h3>";
      });
  } else {
    result.innerHTML = "<h3>The input field cannot be empty</h3>";
  }
});
