import React from "react";


export default function WeatherIcon(props) {
    return (
      <img src={props.icon} alt={props.alt} className="WeatherIcon" />
    );
  }