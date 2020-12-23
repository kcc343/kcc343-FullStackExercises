import './App.css';
import React, {useState, useEffect} from 'react'
import Search from './components/search'
import Country from './components/country'
import axios from 'axios';

const App = (props) => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryName, setCountry] = useState('');
  let filterCountries = [];

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
    })
  }, []);

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
      />
    </div>
  )
}

export default App;
