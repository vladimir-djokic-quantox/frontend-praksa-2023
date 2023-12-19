import React, { useState, useEffect } from "react";
import TodaysWeather from "./TodaysWeather";
import { fetchCurrentWeatherData } from "../utils/api";
import WindType from "./WindType";

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
    const updateCurrentTime = () => {
      setWeatherData((prevData) => ({
        ...prevData,
        dt: Date.now() / 1000, 
      }));
    };
  
    if (cityName) {
      fetchData();

      const intervalId = setInterval(updateCurrentTime, 60000);
  
      return () => clearInterval(intervalId); 
    }
  }, [cityName]);

  const getLocalTime = (timestamp, offset) => {
    const localTime = new Date(timestamp * 1000 + offset * 1000);
    return localTime.toLocaleTimeString(undefined, { timeZone: 'UTC', hour: 'numeric', minute: 'numeric' });
  };
  
  const getLocalDay = (timestamp, offset) => {
    const localDay = new Date(timestamp * 1000 + offset * 1000);
    return localDay.toLocaleDateString(undefined, { weekday: 'long', timeZone: 'UTC' });
  };

  return (
    <div className=" ml-5 w-[100%]">
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
          <div className="flex gap-5">
            <div className="flex flex-col w-[70%] ">
              <div className="flex items-center p-5 bg-white rounded-3xl">
                <div className="flex justify-between items-center w-[55%]">
                  <div>
                    <div className="flex flex-row items-center">
                      <img
                        className="mr-1 w-5 "
                        src="/src/images/location.png"
                        alt=""
                      />
                      <span className="mb-2  font-bold text-xl text-blue-500">
                        {weatherData.name}, {weatherData.sys.country}
                      </span>
                    </div>
                    <p className="text-blue-500">
                      Longitude: {weatherData.coord.lon}
                    </p>
                    <p className="text-blue-500">
                      Latitude: {weatherData.coord.lat}
                    </p>
                  </div>
                  <img
                    className="w-[300px] opacity-40"
                    src="/src/images/world-map.png"
                    alt=""
                  />
                </div>
                <div className="text-2xl font-bold text-blue-500 flex flex-col items-center w-[45%]">
                  <p>{getLocalTime(weatherData.dt, weatherData.timezone)}</p>
                  <p> {getLocalDay(weatherData.dt, weatherData.timezone)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-5 text-blue-500 mt-5">
                  <div className="flex flex-col items-center gap-3 bg-white opacity-90 p-6 rounded-3xl font-bold">
                    <img
                      className="w-14"
                      src="/src/images/humidity.png"
                      alt=""
                    />
                    <p>Humidity: {weatherData.main.humidity}%</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 bg-white opacity-90 p-6 rounded-3xl font-bold">
                    <img
                      className="w-14"
                      src="/src/images/pressure.png"
                      alt=""
                    />
                    <p>
                      Pressure:
                      {weatherData.main.pressure > 1013 ? (
                        <span> High</span>
                      ) : (
                        <span> Low</span>
                      )}
                    </p>

                    <p className="font-normal">
                      {weatherData.main.pressure} hPa
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3 bg-white opacity-90 p-6 rounded-3xl font-bold">
                    <img className="w-14" src="/src/images/wind.png" alt="" />
                    <p>
                      Wind : <WindType speed={weatherData.wind.speed} />
                    </p>
                    <p className="font-normal">{weatherData.wind.speed} m/s</p>
                  </div>
                  <div className="flex flex-col items-center gap-3 bg-white opacity-90 p-6 rounded-3xl font-bold">
                    <img
                      className="w-20"
                      src="/src/images/cloudiness.png"
                      alt=""
                    />
                    <p>Cloudiness: {weatherData.clouds.all} %</p>
                  </div>
                </div>
                {cityName && (
                  <div className="flex flex-col gap-4 mx-auto text-blue-500 font-bold text-center">
                    <a
                      href={`/${cityName}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3 transition duration-300 ease-in-out transform focus:outline-none focus:shadow-outline"
                    >
                      Five Day Forecast
                    </a>
                    <a
                      href={`/pollution/${cityName}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3 transition duration-300 ease-in-out transform focus:outline-none focus:shadow-outline"
                    >
                      Air Pollution
                    </a>
                  </div>
                )}
              </div>
              <div>
                <TodaysWeather cityName={cityName} />
              </div>
            </div>

            <div className="flex flex-col p-5 gap-3 items-center mb-2 w-[30%] bg-gradient-to-b from-white to-sky-200 rounded-3xl text-blue-500 font-bold">
              <img
                src={`/src/icons/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
                className="mr-2 mb-5 w-40 h-40"
              />
              <p className="font-bold text-3xl">
                {Math.round(weatherData.main.temp - 273.15)} °C
              </p>
              <p className="mb-10 text-xl">
                {weatherData.weather[0].description.charAt(0).toUpperCase() +
                  weatherData.weather[0].description.slice(1)}
              </p>

              <div className="flex items-center w-[100%] rounded-3xl bg-white p-1 pl-4 pr-4 ">
                <img
                  className="w-[20px] "
                  src={`/src/icons/${weatherData.weather[0].icon}.png`}
                  alt=""
                />
                <span className="flex-grow text-center">
                  Real Feel: {Math.round(weatherData.main.feels_like - 273.15)}{" "}
                  °C
                </span>
              </div>
              <div className="flex items-center w-[100%] rounded-3xl bg-white p-1 pl-4 pr-4 ">
                <img
                  className="w-[20px] "
                  src="/src/images/max-temp.png"
                  alt=""
                />
                <span className="flex-grow text-center">
                  Max: {Math.round(weatherData.main.temp_max - 273.15)} °C
                </span>
              </div>
              <div className="flex items-center w-[100%] rounded-3xl bg-white p-1 pl-4 pr-4 ">
                <img
                  className="w-[20px] "
                  src="/src/images/min-temp.png"
                  alt=""
                />
                <span className="flex-grow text-center">
                  Min: {Math.round(weatherData.main.temp_min - 273.15)} °C
                </span>
              </div>
              <div className="flex items-center w-[100%] rounded-3xl bg-white p-1 pl-4 pr-4 ">
                <img
                  className="w-[20px] "
                  src="/src/images/sunrise.png"
                  alt=""
                />
                <span className="flex-grow text-center">
                  Sunrise:{" "}
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}
                </span>
              </div>

              <div className="flex items-center w-[100%] rounded-3xl bg-white p-1 pl-4 pr-4 ">
                <img
                  className="w-[20px] "
                  src="/src/images/sunrise.png"
                  alt=""
                />
                <span className="flex-grow text-center">
                  Sunset:{" "}
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default WeatherInfo;
