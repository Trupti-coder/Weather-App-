import { useState } from "react";

function Weather(){

    const[weatherData,setWeatherData]=useState(null);
    const[city,setCity]=useState('Pune');
    const[unit,setUnit]=useState('metric');


  const weatherIcons = {
    "clear sky": "🌞",
    "few clouds": "🌤",
    "scattered clouds": "🌥",
    "broken clouds": "☁️",
    "shower rain": "🌦",
    "rain": "🌧",
    "thunderstorm": "⛈",
    "snow": "🌨",
    "mist": "🌫"
  };

    

    return(
        <>
        <div>
            <input type="text"
            value={city}
            placeholder="Enter City"
            onChange={(event)=>setCity(event.target.value)}
            />
            <select onChange={(event)=>setUnit(event.target.value)} value={unit}>
                <option value="metric">Celsius</option>
                <option value="imperial">Fahrenheit</option>
            </select>
        </div>
        </>
    );
}
export default Weather;