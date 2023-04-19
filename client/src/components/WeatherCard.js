import React, { useState, useEffect } from "react";
import { getWeather } from "../helper/helper";

export default function WeatherCard(isVisable) {
  const [weatherData, setWeatherData] = useState(null);
  console.log(isVisable.isVisible)



  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeather({ lat: '53.3498', lon: '-6.2603' });
      setWeatherData(data);
      // console.log(data);
    };
    fetchWeatherData();
  }, []);

  return (
    <div>
      {
        isVisable.isVisible &&
        (<div className="weather-card-container">
          <div
            className="card text-white"
            style={{
              borderRadius: "40px",
              width: "250px",
              position: "relative",
              backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw2.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {
              weatherData && weatherData.current && (
                <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-dark p-5"
                  style={{
                    backgroundColor: "rgba(190, 216, 232, .5)",
                    borderRadius: "35px",
                  }}>
                  <h4 className="card-title mb-0">{weatherData.current.cityName}</h4>
                  <p className="display-4 my-3">{(weatherData.current.temperature - 273.15).toFixed(2)}°C</p>
                  <p className="mb-2">
                    Feels Like: <strong>{(weatherData.current.feels_like - 273.15).toFixed(2)} °C</strong>
                  </p>
                  <h5 className="card-subtitle">{weatherData.current.weather}</h5>
                </div>
              )
            }
          </div>
        </div>)
      }
    </div>



  );
}