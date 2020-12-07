import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

const promise = axios.get('https://restcountries.eu/rest/v2/all')

promise.then(response => {
  console.log(response)
})

ReactDOM.render(
  <App />, document.getElementById('root')
);
