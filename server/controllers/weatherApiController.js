import axios from 'axios';
import fetch from 'node-fetch';


export async function getWeather(req, res){
    try {
      // Key to access Open Weather API
      const API_KEY = '4f6739af1a34c954ffdd8969e47f3b67';
  
      // Required parameters 
      console.log(req)
      const { lat, lon } = req.params;

      // Check if latitude and longitude are valid
      if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        // return res.status(400).send({ error: "Invalid geographic coordinates" });
        throw new Error('Invalid geographic coordinates');
      }
  
      // Get current weather data 
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const currentResponse = await fetch(currentUrl);
      const currentData = await currentResponse.json();
      console.log('currentData:', currentData);
      
      // Get city name from response
      const cityName = currentData.name;
  
      // Get 5-day forecast data
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
  
      // Parse the data and return it to the client
      const weather = {
        current: {
          cityName: cityName,
          weather: currentData.weather[0].main,
          temperature: currentData.main.temp,
          temp_min: currentData.main.temp_min,
          temp_max: currentData.main.temp_max,
          feels_like: currentData.main.feels_like,
          humidity: currentData.main.humidity
        },
        // forecast for next 15 hours
        forecast: forecastData.list.slice(0, 5).map(item => ({
          cityName: cityName,
          datetime: item.dt_txt,
          weather: item.weather[0].main,
          temperature: item.main.temp,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          feels_like: item.main.feels_like,
          humidity: item.main.humidity
        }))
      };
      
      return res.json(weather);
    } catch (error) {
      console.error('Error:', error);
      return res.status(404).send({ error : "Cannot find weather data"});
    }
  }