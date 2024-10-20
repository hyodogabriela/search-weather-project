import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

import WeatherInfo from "./WeatherInfo";

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
                <WeatherInfo data={weatherData}/>
              
        
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