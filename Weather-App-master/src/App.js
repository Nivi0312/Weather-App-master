import React, { useEffect, useState } from 'react';

function App() {
  const [search, setSearch] = useState("chennai");
  const [city, setCity] = useState(null);
  const publicKey = "3dbbfca50d3674cc4510970916791fb0";

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${publicKey}&units=metric`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setCity(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeatherData();
  }, [search, publicKey]);

  return (
    <div className="App">
      <div className="weather-card">
        <div className="search">
          <input
            type="search"
            placeholder="Enter city name"
            spellCheck="false"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {city ? (
          <div className="weather">
            <img
              className="weather-icon"
              src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png"
              alt="Weather Icon"
            />
            <h1 className="temp">{city.main.temp}°C</h1>
            <h2 className="city">{city.name}</h2>
            <div className="details">
              <div className="col">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/136/136712.png"
                  alt="Wind Speed Icon"
                />
                <div className="info">
                  <p className="wind">{city.wind.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;
