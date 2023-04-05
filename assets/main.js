const apiKey = "e644dde39103fdad5c9cd1dc1aae5511";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".actual-weather").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".forecast").innerHTML = data.weather[0].main;

    if(data.weather[0].main == "Clear"){
        emoji.src = "assets/icons/forecast-conditions/clear.png"
    }
    else if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "assets/icons/forecast-conditions/clouds.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "assets/icons/forecast-conditions/rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "assets/icons/forecast-conditions/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "assets/icons/forecast-conditions/mist.png"
    }
    else if(data.weather[0].main == "Wind"){
        weatherIcon.src = "assets/icons/forecast-conditions/wind.png"
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "assets/icons/forecast-conditions/snow.png"
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})


