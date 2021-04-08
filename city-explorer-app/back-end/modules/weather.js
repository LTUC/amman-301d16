'use strict';

const superagent = require('superagent');

module.exports = getWeather;

function getWeather(latitude, longitude) {
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
    key:process.env.WEATHER_API_KEY,
    lang:'en',
    lat:latitude,
    lon: longitude,
    days: 5,
  };
  return superagent.get(url)
    .query( queryParams )
    .then(response => parseWeather(response.body));
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

function Weather(day) {
  this.forecast = day.weather.description;
  this.time = day.datetime;
}
