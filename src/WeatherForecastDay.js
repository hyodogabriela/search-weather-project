import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  return (
    <div className="WeatherForecastDay">
      <div className="WeatherForecast-day">{props.day}</div>
      <WeatherIcon code={props.icon} size={36} />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">
          {Math.round(props.max)}º
        </span>
        <span className="WeatherForecast-temperature-min">
          {Math.round(props.min)}º
        </span>
      </div>
    </div>
  );
}