import { useState } from "react";

function Weather(){

    const[weatherData,setWeatherData]=useState(null);
    const[city,setCity]=useState('Pune');
    const[unit,setUnit]=useState('metric');

    return(
        <>
        <div>
            <input type="text"
            value={city}
            placeholder="Enter City"
            />
            <select>
                <option value="metric">Celsius</option>
                <option value="imperial">Fahrenheit</option>
            </select>
        </div>
        </>
    );
}
export default Weather;