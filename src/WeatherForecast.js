import React, { useState } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherIcon from "./WeatherIcon"; // Importando o WeatherIcon

export default function WeatherForecast(props) {
  const [forecastData, setForecastData] = useState(null);

  function handleResponse(response) {
    setForecastData(response.data.daily);
  }

  // Fazendo a requisição à API
  let apiKey = "f0308t4943329c9be1off0f74f2fa59a";
  let longitude = props.coordinates.longitude;
  let latitude = props.coordinates.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(handleResponse);

  if (forecastData) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {/* Exemplo de como lidar com o forecast do primeiro dia */}
          <div className="col">
            <div className="WeatherForecast-day">Thu</div>
            <div className="WeatherForecast-icon">
              {/* Usando o WeatherIcon com o ícone do forecast */}
              <WeatherIcon icon={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastData[0].condition.icon}.png`} alt={forecastData[0].condition.description} />
            </div>
            <div className="WeatherForecast-temperatures">
              <span className="WeatherForecast-temperature-max">
                {Math.round(forecastData[0].temperature.maximum)}º
              </span>
              <span className="WeatherForecast-temperature-min">
                {Math.round(forecastData[0].temperature.minimum)}º
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}