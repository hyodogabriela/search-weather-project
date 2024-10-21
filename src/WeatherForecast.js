import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [forecastData, setForecastData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.coordinates) {
      // Função para buscar a previsão do tempo
      function fetchForecast() {
        let apiKey = "f0308t4943329c9be1off0f74f2fa59a";
        let longitude = props.coordinates.longitude;
        let latitude = props.coordinates.latitude;
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;

        axios.get(apiUrl).then(handleResponse);
      }

      function handleResponse(response) {
        // Limita a previsão para 6 dias
        setForecastData(response.data.daily.slice(0, 6));
        setLoaded(true);
      }

      // Só busca a previsão se ainda não estiver carregado
      if (!loaded) {
        fetchForecast();
      }
    }
  }, [props.coordinates, loaded]);

  // Verifica se os dados foram carregados
  if (forecastData) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecastData.map(function (dailyForecast, index) {
            return (
              <div className="col" key={index}>
                <div className="WeatherForecast-day">
                  {new Date(dailyForecast.time * 1000).toLocaleDateString("en-US", {
                    weekday: "short"
                  })}
                </div>
                {/* WeatherIcon recebe o código do ícone e o tamanho */}
                <WeatherIcon code={dailyForecast.condition.icon} size={40} />
                <div className="WeatherForecast-temperatures">
                  <span className="WeatherForecast-temperature-max">
                    {Math.round(dailyForecast.temperature.maximum)}º
                  </span>
                  <span className="WeatherForecast-temperature-min">
                    {Math.round(dailyForecast.temperature.minimum)}º
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}