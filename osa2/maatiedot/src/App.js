import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [findCountry, setFindCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [openCountry, setOpenCountry] = useState("");
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: 10,
    img: ["MOCK"],
    windSpeed: 10,
    windDirection: "N",
  });

  const onFindCountryChange = (e) => {
    setFindCountry(e.target.value);
  };

  const getCountryData = () => {
    if (countries.length === 0) {
      console.log("getting country data");
      axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        setCountries(response.data);
      });
    }
  };
  useEffect(getCountryData, [countries]);

  const OpenCountry = (e) => {
    setOpenCountry(e.target.value);
  };

  const CloseCountry = () => {
    setOpenCountry("");
  };

  const ShowCountry = () => {
    if (openCountry === "") {
      return null;
    } else {
      var country = undefined;
      countries.forEach((item) => {
        if (item.name === openCountry) {
          country = item;
          const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital,
          };
          if (weatherData.city !== country.capital) {
            axios
              .get("http://api.weatherstack.com/current", { params })
              .then((response) => {
                setWeatherData({
                  city: response.data.location.name,
                  temp: response.data.current.temperature,
                  img: response.data.current.weather_icons,
                  windSpeed: response.data.current.wind_speed,
                  windDirection: response.data.current.wind_dir,
                });
                console.log(weatherData);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      });

      return (
        <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h3>Languages</h3>
          <ul>
            {country.languages.map((language) => (
              <li>{language.name}</li>
            ))}
          </ul>
          <p>
            <img src={country.flag} alt="Flag" height="10%" width="10%"></img>
          </p>
          <h3>Weather in {country.capital}</h3>
          <p>
            <b>temperature: </b>
            {weatherData.temp} Celcius
          </p>
          <p>
            <img
              src={weatherData.img[0]}
              alt="Weather icon"
              height="5%"
              width="5%"
            ></img>
          </p>
          <p>
            <b>wind: </b>
            {weatherData.windSpeed} km/h, direction {weatherData.windDirection}
          </p>
          <button onClick={CloseCountry}>close</button>
        </div>
      );
    }
  };

  const Countries = ({ countries, filter }) => {
    const showlist = [];
    countries.forEach((country) => {
      if (country.name.toLowerCase().includes(filter.toLowerCase())) {
        showlist.push(
          <div key={country.name}>
            {country.name}
            <button value={country.name} onClick={OpenCountry}>
              show
            </button>
          </div>
        );
      }
    });
    if (showlist.length > 10 || showlist.length === 0) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      if (openCountry === "") {
        return showlist;
      } else {
        return null;
      }
    }
  };

  return (
    <div>
      <p>Find countries</p>
      <input
        key="findCountry"
        value={findCountry}
        onChange={onFindCountryChange}
      />
      <ShowCountry />
      <Countries countries={countries} filter={findCountry} />
    </div>
  );
};

export default App;
