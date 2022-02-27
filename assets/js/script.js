const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const pageNotFound = document.querySelector(".not-found");
const weatherInfo = document.querySelector(".weather-information");

const cityName = document.querySelector(".city-name");

const eventHandle = () => {
  searchInput.value !== "" ? findCity() : alert("Please enter something !!!");
  searchInput.value = "";
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  eventHandle();
});
searchBtn.addEventListener("click", eventHandle);

const findCity = () => {
  const url = `https://api.weatherapi.com/v1/current.json?key=08e3bf692cfa4f90b42141857210109&q=${searchInput.value}`;
  const getInfo = async (url) => {
    try {
      const information = await axios.get(url);
      const data = information.data;

      setInfo(data);
    } catch {
      weatherInfo.classList.add("d-none");
      pageNotFound.classList.remove("d-none");
      console.log(`something went wrong `);
    }
  };
  getInfo(url);

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
};
