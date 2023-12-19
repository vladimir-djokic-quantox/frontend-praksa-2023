import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchDailyWeatherData } from "../utils/api";

const TodaysWeather = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDailyWeatherData(cityName);
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [cityName]);

  const kelvinToCelsius = (temp) => {
    return Math.round(temp - 273.15);
  };

  const filterNext24HoursForecasts = () => {
    if (!weatherData || !weatherData.list) return [];

    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    return weatherData.list.filter(
      (forecast) =>
        forecast.dt >= currentTimestamp &&
        forecast.dt <= currentTimestamp + 24 * 3600
    );
  };

  const next24HoursForecasts = filterNext24HoursForecasts();

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {error ? (
        <p className="text-red-500">Error fetching weather data: {error}</p>
      ) : next24HoursForecasts.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">24 Hours Weather</h2>
          <Slider {...sliderSettings} >
            {next24HoursForecasts.map((forecast) => (
              <div
                key={forecast.dt}
                className="bg-white p-4 shadow flex flex-col items-center text-center rounded-3xl"
              >
                <img
                  src={`/src/icons/${forecast.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="w-16 h-16 mx-auto mb-2"
                />
                <p className="text-blue-500 font-bold">
                  {kelvinToCelsius(forecast.main.temp)} °C
                </p>
                <p className="text-blue-500">
                  <span className="capitalize">
                    {forecast.weather[0].description}
                  </span>
                </p>

                <p className="text-blue-500">
                  {forecast.dt_txt.split(" ")[0]}
                  <br />
                  {forecast.dt_txt.split(" ")[1]}
                </p>
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <p className="text-blue-500">
          No forecasts available for the next 24 hours.
        </p>
      )}
    </div>
  );
};

export default TodaysWeather;
