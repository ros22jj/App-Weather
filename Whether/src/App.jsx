import React, { useState } from 'react';
import './App.css';

const API_KEY = "92a9b17fe66a56645f6bdb74e5e0e433"

;


const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();
      const daily = forecastData.list.filter((_, i) => i % 8 === 0);
      setForecast(daily);
    } catch (err) {
      alert('City not found!');
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <h1>Weather Dashboard</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast">
          <h3>3-Day Forecast</h3>
          <div className="forecast-list">
            {forecast.map((day, i) => (
              <div key={i} className="forecast-item">
                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="icon"
                />
                <p>{day.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
