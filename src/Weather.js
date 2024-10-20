import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

import WeatherInfo from "./WeatherInfo";

export default function Weather(props){
    const [weatherData, setWeatherData] = useState({ready: false});
    const [city,setCity] = useState(props.defaultCity);
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

    function search() {
        const apiKey = "f0308t4943329c9be1off0f74f2fa59a";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleSubmit(event){
        event.preventDefault();
        search();

    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    if (weatherData.ready) {
        return (
            <div className="Weather">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-9">
                    <input type="search"
                    placeholder="Enter a city..." 
                    className="form-control"
                    autoFocus="on"
                    onChange={handleCityChange}
                    />
                    </div>
                    <div className="col-3">
                    <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary w-100"/>
                    </div>
                    </div>
                </form>
                <WeatherInfo data={weatherData}/>
                </div>
            );

    }

    else {
        search();
        return "Loading..."
    }

    
   
}