import React from "react";

export default function CurrentInfo() {
  return (
    <div className="weather-card-container">
      <div
        className="card text-white"
        style={{
          borderRadius: "40px",
          width: "250px",
          position: "relative",
          backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-dark p-5"
          style={{
            backgroundColor: "rgba(190, 216, 232, .5)",
            borderRadius: "35px",
          }}
        >
          <h4 className="card-title mb-0">Juneau, Alaska, US</h4>
          <p className="display-4 my-3">1.28°C</p>
          <p className="mb-2">
            Feels Like: <strong>-1.08 °C</strong>
          </p>
          <h5 className="card-subtitle">Snowy</h5>
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { getWeather } from "../helper/helper";

// export default function CurrentInfo() {
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const data = await getWeather({ lat: LATITUDE, lon: LONGITUDE, date: DATE });
//       setWeatherData(data);
//     };
//     fetchWeatherData();
//   }, []);

//   return (
//     <div className="weather-card-container">
//       <div
//         className="card text-white"
//         style={{
//           borderRadius: "40px",
//           width: "250px",
//           position: "relative",
//           backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {
//           weatherData && weatherData.sys && (
//             <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-dark p-5"
//               style={{
//                 backgroundColor: "rgba(190, 216, 232, .5)",
//                 borderRadius: "35px",
//               }}>
//               <h4 className="card-title mb-0">{weatherData.name}, {weatherData.sys.country}</h4>
//               <p className="display-4 my-3">{weatherData.main.temp.toFixed(2)}°C</p>
//               <p className="mb-2">
//                 Feels Like: <strong>{weatherData.main.feels_like.toFixed(2)} °C</strong>
//               </p>
//               <h5 className="card-subtitle">{weatherData.weather[0].main}</h5>
//             </div>
//           )
//         }
//       </div>
//     </div>
//   );
// }
