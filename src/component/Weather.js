import { useEffect, useState } from "react";
import styles from "./Weather.module.css"; // Import CSS module

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Pune');
    const [unit, setUnit] = useState('metric');
    const [error, setError] = useState(null);

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

    async function fetchWeatherDataByCity(city, unit) {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
            let data = await response.json();

            if (response.ok) {
                setWeatherData(data);
            } else {
                setError(data.message || 'Error fetching weather data');
                setWeatherData(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch weather data.');
            setWeatherData(null);
        }
    }

    useEffect(() => {
        fetchWeatherDataByCity(city, unit);
    }, [city, unit]);

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

    async function fetchWeatherData(lat, lon, unit) {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        setError(null);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`);
        const data = await response.json();
        setWeatherData(data);
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={city}
                    placeholder="Enter City"
                    onChange={(event) => setCity(event.target.value)}
                />
                <select onChange={(event) => setUnit(event.target.value)} value={unit}>
                    <option value="metric">Celsius</option>
                    <option value="imperial">Fahrenheit</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <button onClick={() => fetchWeatherDataByCity(city, unit)}>Get Weather</button>
                <button onClick={getUserLocation}>Get Weather by Location</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && weatherData.main && (
                <div className={styles.weatherInfo}>
                    <h3>{weatherData.name}</h3>
                    <p>{Math.round(weatherData.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
                    <p>
                        {weatherIcons[weatherData.weather[0].description] || weatherData.weather[0].description}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Weather;
