const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const weatherInfo = document.querySelector(".weather-information");
const cityName = document.querySelector(".city-name");

const recommendText = document.querySelector(".recommend-sentence");

const firstPage = document.querySelector(".first-page");
const pageNotFound = document.querySelector(".not-found");

/* Create event handler */

const eventHandle = () => {
  searchInput.value !== "" ? findCity() : alert("Please enter something !!!");
  searchInput.value = "";
};

/* submit event for city name search input */

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  eventHandle();
});

/* click event for city name search btn */

searchBtn.addEventListener("click", eventHandle);

const findCity = () => {
  firstPage.classList.add("d-none");

  /* api address with custom query*/

  const url = `https://api.weatherapi.com/v1/current.json?key=08e3bf692cfa4f90b42141857210109&q=${searchInput.value}`;

  /* get data with axios from api */

  const getInfo = async (url) => {
    try {
      const information = await axios.get(url);
      const data = information.data;

      setInfo(data);
      recommend(data);
    } catch {
      weatherInfo.classList.add("d-none");
      pageNotFound.classList.remove("d-none");
      console.log(`something went wrong `);
    }
  };
  getInfo(url);

  /* set data for show */

  const setInfo = (data) => {
    pageNotFound.classList.add("d-none");
    weatherInfo.classList.remove("d-none");

    const stateImg = document.querySelector("#state-img");
    stateImg.setAttribute("src", data.current.condition.icon);
    stateImg.setAttribute("alt", data.current.condition.text);

    const stateText = document.querySelector("#state-text");
    stateText.textContent = data.current.condition.text;

    const degree = document.querySelector("#degree");
    degree.textContent = `${data.current.temp_c} °C`;

    const nameIcon = document.querySelector("#city-icon");
    nameIcon.className = "fa fa-location-dot fa-xl text-primary";
    const nameText = document.querySelector("#city-name");
    nameText.textContent = data.location.name;
  };

  /* Create recommended sentences for different weathers */

  const recommend = (data) => {
    const temp = data.current.temp_c;
    const state = data.current.condition.text;

    switch (true) {
      case (5 < temp < 25 && state === "Clear") ||
        (5 < temp < 25 && state === "Sunny"):
        recommendText.textContent = `Great weather, go for a walk`;
        break;
      case state === "Partly cloudy" ||
        state === "cloudy" ||
        state === "Patchy rain possible" ||
        state === "Overcast":
        recommendText.textContent = `The weather is cloudy, it may rain`;
        break;
      case state === "Light rain" || state === "rain":
        recommendText.textContent = `Great weather. Take your umbrella and go outside`;
        break;
      case state === "ُSnow" || state === "Heavy snow":
        recommendText.textContent = `The snow is heavy. Do not leave the house`;
        break;
      case state === "Sunny":
        recommendText.textContent = `Do not forget the Sun glasses`;
        break;
      case state === "Mist":
        recommendText.textContent = `The weather is foggy. Drive with caution`;
        break;
      case temp > 20:
        recommendText.textContent = `The weather is hot. Wear a cool outfit`;
        break;
      case temp < 2:
        recommendText.textContent = `The weather is cold. Wear a warm outfit`;
        break;
      default:
        recommendText.textContent = `The weather is ${state}`;
    }
  };
};
