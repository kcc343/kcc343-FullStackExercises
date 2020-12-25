import React from 'react';

const Country = ({list, handleCountry, weatherData}) => {
  let temperature;
  let url;
  let windSpeed;
  let windDirection;
  console.log(weatherData);
  if (weatherData.length !== 0 && weatherData.data.current !== undefined) {
    temperature = weatherData.data.current.temperature;
    url = weatherData.data.current["weather_icons"][0];
    windSpeed = weatherData.data.current["wind_speed"];
    windDirection = weatherData.data.current["wind_dir"];
  }
  if (list.length === 1) {
    handleCountry(list[0].name);
    return(
      <>
        <h2>{list[0].name}</h2>
        <p>Capital: {list[0].capital}</p>
        <p>Population: {list[0].population}</p>
        <h3>Languages</h3>
        {list[0].languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
        <h3>Flag</h3>
        <img alt={list[0].name} src={list[0].flag}></img>
        <h3>Weather in {list[0].capital}</h3>
        <b>temperature:</b><p>{temperature} celsius</p> 
        <img alt={list[0].capital} src={url}></img>
        <div>
          <b>wind: </b>
          <p>{windSpeed} mph direction {windDirection}</p>
        </div>
      </>
    )
  }
  return (
    list.map(country => 
      <div key={country.name}>
        {country.name}
        <button onClick={() => handleCountry(country.name)}>show</button>
      </div>
    )
  )
}

export default Country