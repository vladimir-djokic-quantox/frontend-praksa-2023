const apiKey = "8f339c29069ad6ea5b87e8bb401d8a7b";

export const getGeocodingData = async (name) => {
  const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(name)}&limit=1&appid=${apiKey}`;

  const geocodingResponse = await fetch(geocodingUrl);
  return await geocodingResponse.json();
};

export const getPollutionData = async (lat, lon) => {
  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
  const weatherResponse = await fetch(weatherApiUrl);
  return await weatherResponse.json();
};

export const fetchWeatherData = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};

export const fetchCurrentWeatherData = async (cityName) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching current weather data: ${error.message}`);
  }
};


