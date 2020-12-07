import React from 'react';

const Country = ({list}) => {
  if (list.length > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  } else if (list.length === 1) {
    console.log(list);
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
        <img src={list[0].flag}></img>
      </>
    )
  }
  return (
    list.map(country => 
      <div key={country.name}>{country.name}</div>
    )
  )
}

export default Country