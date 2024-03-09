function getWeather() {
    var apiKey = 'fc4458bcb0bd0e35256e007b2f79adc8';
    var city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    var tempDivInfo = document.getElementById('temp-div');
    var weatherInfoDiv = document.getElementById('weather-info');
    var weatherIcon = document.getElementById('weather-icon');
    var hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        var cityName = data.name;
        var temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        var description = data.weather[0].description;
        var iconCode = data.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        var temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        var weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    var hourlyForecastDiv = document.getElementById('hourly-forecast');

    var next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        var dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        var hour = dateTime.getHours();
        var temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        var iconCode = item.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        var hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    var weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}