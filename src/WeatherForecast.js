import React from "react";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props){
    function handleResponse(response){
        console.log(response.data);

    }

console.log(props);
    let apiKey = "f0308t4943329c9be1off0f74f2fa59a";
    let longitude = props.coordinates.longitude;
    let latitude = props.coordinates.latitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric&units=metric`;
    
    axios.get(apiUrl).then(handleResponse);
    return (
      <div className="WeatherForecast">
        <div className="row">
            <div className="col">
              <div className="WeatherForecast-day">
               Thu
               </div>
               <div className="WeatherForecast-icon">
               icon   
               </div>  
               <div className="WeatherForecast-temperatures">      
               <span className="WeatherForecast-temperature-max">19º</span> 
               <span className="WeatherForecast-temperature-min">10º</span>
               </div>  
            </div>
        </div>
      </div>  
    );
}