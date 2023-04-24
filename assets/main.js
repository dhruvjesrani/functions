const submitBtn = document.getElementById("submitBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const recipeContainer = document.getElementById("recipeContainer");
const somethingElseBtn = document.getElementById("somethingElseBtn");

function getWeatherImage(weatherDesc) {
  const images = {
    "Clear": "assets/icons/forecast-conditions/clear.png",
    "Clouds": "assets/icons/forecast-conditions/clouds.png",
    "Rain": "assets/icons/forecast-conditions/rain.png",
    "Snow": "assets/icons/forecast-conditions/snow.png",
    "Wind": "assets/icons/forecast-conditions/wind.png",
    "Drizzle": "assets/icons/forecast-conditions/drizzle.png",
    "Mist": "assets/icons/forecast-conditions/mist.png",
    "Haze": "assets/icons/forecast-conditions/haze.png",
    "Sand": "assets/icons/forecast-conditions/sand.png",
    "Squall": "assets/icons/forecast-conditions/squall.png",
    "Thunderstorm": "assets/icons/forecast-conditions/thunderstorm.png",
    "Tornado": "assets/icons/forecast-conditions/tornado.png",
    "Fog": "assets/icons/forecast-conditions/fog.png",
    "Dust": "assets/icons/forecast-conditions/dust.png",

  };

  return images[weatherDesc];
}


async function fetchWeatherData(city) {
    const apiKey = "e644dde39103fdad5c9cd1dc1aae5511";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }
  
  async function fetchRecipes() {
    const response = await fetch("assets/recipes.json");
    const data = await response.json();
    return data;
  }


  
  function displayWeather(weatherData) {
    const { main, name, weather } = weatherData;
    const temp = Math.round(main.temp);
    const weatherDesc = weather[0].main;
    const icon = weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
    const weatherImage = getWeatherImage(weatherDesc);

  
    weatherInfo.innerHTML = `
      <div class="weather-container">

        <div class="weather-details-container">

            <div class="weather-text">
                <div class="now"><p>Now</p></div>
                <div class="actual-weather"><h1>${temp}°C</h1></div>
                <div class="forecast"><p>${weatherDesc}</p></div>
            </div>

            <div class="emoji">
                <img src="${weatherImage}" class="weather-icon">
            </div>

        </div>

        <div class="weather-metadata">
            <div class="city"><p>${name}</p></div>
        </div>

    </div>

    `;
  
    return temp;
  }


  
  function displayRecipe(recipes, temperature) {
    const category = getCategory(temperature);
    const recipeList = recipes[category];
    const recipe = getRandomRecipe(recipeList);
    
  
    let stepsHTML = "";
    for (const step of recipe.steps) {
      stepsHTML += `

      <div class="instructions-container">


      <li>

        <div class="instructions-strip">

            <div class="instruction time">${step.time}</div>
            <div class="instruction step">${step.instruction}</div>
            <div class="instruction water">${step.waterAmount}</div>

        </div>

      </li>

      `;
    }
  
    recipeContainer.innerHTML = `

    <div class="under-weather-content">

    
        <div class="under-weather">

              <div class="drumroll">

                  <p>There's no better weather to enjoy</p>
                  <div class="coffee-name"><h1>${recipe.name}</h1></div>

              </div>

              <div class="coffee-image">
                  <img src= "${recipe.imageMobile}" alt="" >
              </div>

              <div class="overview">

                  <div class="overview-card">

                      <div class="prep property">Coffee</div>
                      <div class="prep coffee-quantity">${recipe.grounds}</div>

                  </div>

                <div class="overview-card">

                      <div class="prep property">Brewer</div>
                      <div class="prep brewing-device">${recipe.brewer}</div>

                </div>

              </div>


              <ol>${stepsHTML}</ol>

              <button id="somethingElseBtn">Something else</button>



        </div>

        <div class="coffee-image-desktop">

          <img src="${recipe.imageDesktop}" alt="">

        </div>

    </div>

    `;
  }


  
  function getCategory(temperature) {
    if (temperature <= 10) {
      return "cold";
    } else if (temperature <= 20) {
      return "mild";
    } else if (temperature <= 30) {
      return "warm";
    } else {
      return "hot";
    }
  }

  function getRandomRecipe(recipeList) {
    const randomIndex = Math.floor(Math.random() * recipeList.length);
    return recipeList[randomIndex];
  }
  
submitBtn.addEventListener("click", async () => {
  const city = cityInput.value;
  const weatherData = await fetchWeatherData(city);
  const temperature = displayWeather(weatherData);
  const recipes = await fetchRecipes();
  displayRecipe(recipes, temperature);
});




recipeContainer.addEventListener("click", async (event) => {
  if (event.target.id === "somethingElseBtn") {
    const city = cityInput.value;
    if (city === "") {
      alert("Please enter a city first");
    } else {
      const weatherData = await fetchWeatherData(city);
      const temperature = weatherData.main.temp;
      const recipes = await fetchRecipes();
      displayRecipe(recipes, temperature);
    }
  }
});


// Javascript references + attributions:
// https://www.youtube.com/@WebDevSimplified
// https://www.youtube.com/watch?v=FOD408a0EzU&t=444s&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=tgbRY96q-KM&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=XF1_MlZ5l6M&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=cuEtnrL9-H0&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=QMwyNnjAils&t=1631s&ab_channel=codewithsadee
// https://www.youtube.com/watch?v=OE7kml0pigw&t=2267s&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=OE7kml0pigw&t=2267s&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=MIYQR-Ybrn4&t=2248s&ab_channel=EasyTutorials
// Explanation throughout the process + debugging help + moral support by one of my close friends, Yash G, a software developer.