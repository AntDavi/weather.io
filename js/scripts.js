// Variaveis e seleções de eventos

const apiKey = "";

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data")

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

// Funções

const getWeatherData = async (city) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return data
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide")
}

// Eventos

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {

    if (e.code === 'Enter') {
        const city = e.target.value;

        showWeatherData(city);
    }
})
