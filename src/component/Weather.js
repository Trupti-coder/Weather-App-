import { useEffect, useState } from "react";

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


   async function fetchWeatherDataByCity(city,unit){
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${d347edc9e69ce0d1a5fc4ff5f78413db}`)
    let data=await response.json();
    setWeatherData(data);

  }

  useEffect(()=>{
    fetchWeatherDataByCity(city,unit);
  },[city,unit]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude, unit);
        },
        () => setError('Geolocation is not supported by this browser.')
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
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