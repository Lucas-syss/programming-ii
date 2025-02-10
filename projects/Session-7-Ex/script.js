async function fetchWeather(city) {
    try {
        const API_KEY = "c6a0f8c32b91a290a4d4a60cb773bab6";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
        );
        if (!response.ok) throw new Error("Failed to fetch");

        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

async function fetchAllWeather() {  
    const cities = ['Osaka', 'London', 'Paris']; 
    const promises = cities.map(city => fetchWeather(city)); 
    const weatherData = await Promise.all(promises);  
  
    const list = new Map();
    weatherData.forEach(weatherData => {
        if (weatherData) {
            list.set(weatherData.name, {
                temp: weatherData.main.temp,
                humidity: weatherData.main.humidity
            });
        }
    });
    

    const fs = require("node:fs");
  
    await fs.writeFile("cities.json", list, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Data written to file');
        }
    });
}  
fetchAllWeather();