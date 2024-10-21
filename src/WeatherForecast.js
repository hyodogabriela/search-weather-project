import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [forecastData, setForecastData] = useState(null);
  const apiKey = "f0308t4943329c9be1off0f74f2fa59a";

  useEffect(() => {
    const longitude = props.coordinates.longitude;
    const latitude = props.coordinates.latitude;
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      setForecastData(response.data.daily);
    });
  }, [props.coordinates]);

  if (!forecastData) {
    return null;
  }

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecastData.slice(0, 5).map((dayData, index) => (
          <div className="col" key={index}>
            <WeatherForecastDay
              day={new Intl.DateTimeFormat("en-US", {
                weekday: "long",
              }).format(new Date(dayData.time * 1000))}
              max={dayData.temperature.maximum}
              min={dayData.temperature.minimum}
              icon={dayData.condition.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}