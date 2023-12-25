import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import cities from "cities.json";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedCities, setSearchedCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [cityExists, setCityExists] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);

  useEffect(() => {
    const storedCities =
      JSON.parse(localStorage.getItem("searchedCities")) || [];
    setSearchedCities(storedCities);
  
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setAutoCompleteSuggestions([]);
      }
    };
  
    const handleOutsideClick = (e) => {
      if (
        e.target.closest(".autocomplete-container") === null &&
        e.target.closest(".search-bar-input") === null
      ) {
        setAutoCompleteSuggestions([]);
      }
    };
  
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleOutsideClick);
  
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const saveToLocalStorage = (cities) => {
    localStorage.setItem("searchedCities", JSON.stringify(cities));
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      if (
        !searchedCities
          .map((city) => city.toLowerCase())
          .includes(normalizedSearchTerm)
      ) {
        const updatedSearches = [...searchedCities, searchTerm];
        setSearchedCities(updatedSearches);
        setSearchTerm("");
        setSelectedCity(searchTerm);
        saveToLocalStorage(updatedSearches);
        setCityExists(false);
      } else {
        setCityExists(true);
      }
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      if (autoCompleteSuggestions.length > 0 && focusedSuggestion !== -1) {
        handleAutoCompleteSelection(autoCompleteSuggestions[focusedSuggestion]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setAutoCompleteSuggestions([]);
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

  const autoComplete = () => {
    const matches = cities.filter((data) => {
      const regex = new RegExp(`^${searchTerm}`, "gi");
      return data.name.match(regex);
    });

    const limitedMatches = matches.slice(0, 10);
    setAutoCompleteSuggestions(limitedMatches);

    if (searchTerm === "") {
      setAutoCompleteSuggestions([]);
    }
  };

  const handleArrowNavigation = (e) => {
    if (autoCompleteSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        setFocusedSuggestion((prev) =>
          prev < autoCompleteSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        setFocusedSuggestion((prev) => (prev > 0 ? prev - 1 : prev));
      }
    }
  };

  const handleAutoCompleteSelection = (selectedCity) => {
    const fullName = `${selectedCity.name}, ${selectedCity.country}`;
    setSearchTerm(fullName);
    setAutoCompleteSuggestions([]);
    setFocusedSuggestion(-1);
  };

  return (
    <div className="flex items-start p-4">
      <div className="bg-gradient-to-b from-white to-sky-200 rounded-3xl text-blue-500  p-4 w-96">
        <input
          type="text"
          placeholder="Search for city."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setAutoCompleteSuggestions([]);
            setFocusedSuggestion(-1);
            autoComplete();
            setCityExists(false); 
          }}
          onKeyPress={handleEnterKeyPress}
          onKeyDown={handleArrowNavigation}
          className="w-full p-2 border rounded-3xl focus:outline-none focus:border-blue-500"
        />
        {cityExists && (
          <p className="text-red-500 mt-2">
            City already exists in recent searches.
          </p>
        )}
        {autoCompleteSuggestions.length > 0 && (
          <div className="w-[350px] bg-white absolute rounder-3xl left-8 right-0">
            {autoCompleteSuggestions.map((match, index) => (
              <div
                key={match.geonameid}
                className={`p-2 cursor-pointer hover:bg-blue-200 ${
                  focusedSuggestion === index ? "bg-blue-200" : ""
                }`}
                onClick={() => handleAutoCompleteSelection(match)}
              >
                {match.name}, {match.country}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleSearch}
          className="mt-2 bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 focus:outline-none w-[120px]"
        >
          Search
        </button>

        <div className="mt-4">
          <p className="text-blue-500 mb-2">Recent Searches:</p>
          {searchedCities.length > 0 ? (
            searchedCities.map((city, index) => (
              <div key={city} className="flex items-center mb-2">
                <button
                  onClick={() => handleButtonClick(city)}
                  className="flex-shrink-0 font-semibold w-[180px] bg-white text-blue-500 p-2 rounded-3xl mr-2 hover:bg-blue-200 focus:outline-none"
                >
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </button>
                <button
                  onClick={() => handleRemoveButtonClick(index)}
                  className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p>No recent searches.</p>
          )}
        </div>

        <button
          onClick={handleClear}
          className="mt-4 w-[120px] bg-red-500 text-white p-2 rounded-3xl hover:bg-red-600 focus:outline-none"
        >
          Clear
        </button>
      </div>

      {selectedCity && <WeatherInfo cityName={selectedCity} />}
    </div>
  );
};

export default SearchBar;
