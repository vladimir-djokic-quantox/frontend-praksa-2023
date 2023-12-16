import React, { useState, useEffect } from "react";
import TodaysWeather from "./TodaysWeather";
import { fetchCurrentWeatherData } from "../utils/api";


const WeatherInfo = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCurrentWeatherData(cityName);
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (cityName) {
      fetchData();
    }
  }, [cityName]);

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Weather Information</h2>
          <p className="mb-2">City: {weatherData.name}</p>

          <p className="mb-2">
            Description:{" "}
            {weatherData.weather[0].description.charAt(0).toUpperCase() +
              weatherData.weather[0].description.slice(1)}
          </p>

          <div className="flex items-center mb-2">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mr-2"
            />
            <span className="font-bold text-xl">
              {Math.round(weatherData.main.temp - 273.15)} °C
            </span>
          </div>

          <div className="flex">
            <div className="mr-6">
              <p>
                Min Temperature:{" "}
                {Math.round(weatherData.main.temp_min - 273.15)} °C
              </p>
              <p>
                Max Temperature:{" "}
                {Math.round(weatherData.main.temp_max - 273.15)} °C
              </p>
            </div>
            <div>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </div>

          <div className="mt-4 mb-4">
            <p>Pressure: {weatherData.main.pressure} hPa</p>
            <p>
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
          {cityName && (
            <div className="flex justify-between">
              <a
                href={`/${cityName}`}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Five Day Forecast
              </a>
              <a
                href={`/pollution/${cityName}`}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Air Pollution
              </a>
            </div>
          )}
          <div>
            <TodaysWeather cityName={cityName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
