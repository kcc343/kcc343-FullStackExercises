import './App.css';
import React, {useState, useEffect} from 'react'
import Search from './components/search'
import Country from './components/country'
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const App = (props) => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryName, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  let filterCountries = [];

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
    })
  }, []);

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`)
    .then(response => {
      setWeatherData(response);
    })
  }, [countryName]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCountry('');
  }

  const handleCountry = (countryname) => {
    setCountry(countryname);
    setSearch('');
  }

  if (countryName !== '') {
    filterCountries = countries.filter(country => country.name.toLowerCase().includes(countryName.toLowerCase()));
  }
  
  if (search !== '') {
    filterCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <div className="App">
      <h2>Find countries</h2>
      <Search handle={handleSearchChange}></Search>
      <Country 
        list={filterCountries}
        handleCountry={handleCountry}
        weatherData={weatherData}
      />
    </div>
  )
}

export default App;
