import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";

export default function Weather(props){
    const [weatherData, setWeatherData] = useState({ready: false});
    function handleResponse(response){
        console.log(response.data);
        setWeatherData({
            ready: true,
            temperature: (response.data.temperature.current),
            city: response.data.city,
            date: new Date(response.data.time*1000),
            humidity: response.data.temperature.humidity,
            wind: response.data.wind.speed,
            description: response.data.condition.description,
            iconUrl: "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png",
        });    
    }

    if (weatherData.ready) {
        return (
            <div className="Weather">
                <form>
                    <div className="row">
                        <div className="col-9">
                    <input type="search"
                    placeholder="Enter a city..." 
                    className="form-control"
                    autoFocus="on"/>
                    </div>
                    <div className="col-3">
                    <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary w-100"/>
                    </div>
                    </div>
                </form>
                <h1>{weatherData.city}</h1>
                <ul>
                    <li>
                        <FormattedDate date={weatherData.date} />
                    </li>
                    <li className="text-capitalize">{weatherData.description}</li>
                </ul>
                <div className="row">
                    <div className="col-6">
                        <div className="clearfix">
                       <div className="float-left">
                        <img src={weatherData.iconUrl} alt={weatherData.description} /></div>
                       <div className="float-left">
                       <span className="temperature">{Math.round(weatherData.temperature)}</span>
                       <span className="unit">ºC</span> </div>
                       </div>
                    </div>
                    <div className="col-6">
                        <ul>
                            <li>
                               Humidity: {weatherData.humidity}%
                            </li>
                            <li>
                               Wind: {weatherData.wind} km/h
                            </li>
                        </ul>
                    </div>
                </div>
        
                </div>
            );

    }

    else {
        const apiKey = "f0308t4943329c9be1off0f74f2fa59a";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);

        return "Loading..."
    }

    
   
}