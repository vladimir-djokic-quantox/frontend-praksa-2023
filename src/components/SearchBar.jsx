import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedCities, setSearchedCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const storedCities =
      JSON.parse(localStorage.getItem("searchedCities")) || [];
    setSearchedCities(storedCities);
  }, []);

  const saveToLocalStorage = (cities) => {
    localStorage.setItem("searchedCities", JSON.stringify(cities));
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const updatedSearches = [...searchedCities, searchTerm];
      setSearchedCities(updatedSearches);
      setSearchTerm("");
      setSelectedCity(searchTerm);
      saveToLocalStorage(updatedSearches);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleButtonClick = (city) => {
    setSelectedCity(city);
  };

  const handleRemoveButtonClick = (index) => {
    const updatedSearches = [...searchedCities];
    updatedSearches.splice(index, 1);
    setSearchedCities(updatedSearches);
    saveToLocalStorage(updatedSearches);
  };

  const handleClear = () => {
    setSearchedCities([]);
    localStorage.removeItem("searchedCities");
    setSelectedCity("");
  };

  return (
    <div className="flex items-start p-4">
      <div className="max-w-md bg-gray-100 rounded-md shadow-md p-4">
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleEnterKeyPress}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-blue-500 text-white p-1 px-6 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>

        <div className="mt-4">
          <p className="text-gray-600 mb-2">Recent Searches:</p>
          {searchedCities.length > 0 ? (
            searchedCities.map((city, index) => (
              <div key={city} className="flex items-center mb-2">
                <button
                  onClick={() => handleButtonClick(city)}
                  className="flex-shrink-0 text-left w-[120px] bg-gray-200 text-gray-800 p-2 rounded-md mr-2 hover:bg-gray-300 focus:outline-none"
                >
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </button>
                <button
                  onClick={() => handleRemoveButtonClick(index)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No recent searches.</p>
          )}
        </div>

        <button
          onClick={handleClear}
          className="mt-4 bg-red-500 text-white p-1 px-6    rounded-md hover:bg-red-600 focus:outline-none"
        >
          Clear
        </button>
      </div>

      {selectedCity && <WeatherInfo cityName={selectedCity} />}
    </div>
  );
};

export default SearchBar;
