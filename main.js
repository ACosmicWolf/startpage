const clock = document.querySelector(".clock");

time = () => {
  const date = new Date();
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  clock.innerHTML = `${hours}:${minutes} ${ampm}`;
};

setInterval(time, 1000);

const weather = document.querySelector(".weather");

const API_KEY = "API_KEY";
const lat = 32.2143039;
const lon = 76.3196717;

/* Openwethermap api */
const weatherRequest = async () => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  ).then((res) => res.json());
};

const getWeather = async () => {
  const data = await weatherRequest();
  weather.innerHTML = `${data.weather[0].main} ${Math.round(
    data.main.temp - 273.15
  )}°C`;
};

getWeather();

const username = document.querySelector(".username");

/* Check if name is present in localstorage */
if (localStorage.getItem("name")) {
  username.innerHTML = localStorage.getItem("name");
} else {
  /* Get the name and store it in localstorage */
  const nameInput = prompt("Enter your name");
  localStorage.setItem("name", nameInput);
  username.innerHTML = nameInput;
}

/* Greeting */
const greeting = document.querySelector(".greeting");

const setGreetings = () => {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    greeting.innerHTML = "Good Morning";
  } else if (hours < 18) {
    greeting.innerHTML = "Good Afternoon";
  } else {
    greeting.innerHTML = "Good Evening";
  }
};

setInterval(setGreetings, 3600000);

/* Quote */
const quote = document.querySelector(".quote");

const getQuote = async () => {
  const data = await fetch("https://type.fit/api/quotes").then((res) =>
    res.json()
  );
  const randomQuote = data[Math.floor(Math.random() * data.length)];

  if (randomQuote.author === null) randomQuote.author = "Unknown";

  quote.innerHTML = `"${randomQuote.text}" - ${randomQuote.author}`;
};

getQuote();
