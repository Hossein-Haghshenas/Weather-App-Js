const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const pageNotFound = document.querySelector(".not-found");
const weatherInfo = document.querySelector(".weather-information");

const cityName = document.querySelector(".city-name");

const eventHandle = () => {
  searchInput.value !== "" ? findCity() : alert("Please enter something !!!");
  searchInput.value = "";
};

searchInput.addEventListener("keypress", (e) => {
  e.code === "Enter" ? eventHandle() : null;
});
searchBtn.addEventListener("click", eventHandle);

const findCity = () => {
  const url = `https://api.weatherapi.com/v1/current.json?key=08e3bf692cfa4f90b42141857210109&q=${searchInput.value}`;
  const getInfo = async (url) => {
    try {
      const information = await axios.get(url);
      const data = information.data;
    } catch {
      weatherInfo.classList.add("d-none");
      pageNotFound.classList.remove("d-none");
      console.log(`something went wrong `);
    }
  };
  getInfo(url);
};
