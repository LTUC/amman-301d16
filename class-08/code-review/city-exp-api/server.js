'use strict';

// Load environment variables
require('dotenv').config();

// Including application dependencies
const express = require('express');
const requestAgent = require('superagent');
const cors = require('cors');

// Setup the application
const app = express();

// Setup environment vairables
const PORT = process.env.PORT || 3001;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PARKS_API_KEY = process.env.PARKS_API_KEY;

// Setup Application Middlewares
app.use(cors());

// Route Middlewares
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/parks', getPark);
app.use('*', handleNotFoundError);

// Listen for request
app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});

function getLocation(request, response) {
    const url = 'https://us1.locationiq.com/v1/search.php?key=' + GEOCODE_API_KEY + '&q=' + request.query.city + '&format=json&limit=1';
    requestAgent.get(url).then(locationData => {
        console.log(locationData.body);
        const data = locationData.body[0];
        response.status(200).json(new Location(request.query.city, data.display_name, data.lat, data.lon));
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Something went wrong');
    })
}

async function getWeather(request, response) {
    try {
        const city = request.query.search_query;

        const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${WEATHER_API_KEY}`;
        const rawWeatherData = await requestAgent.get(url);
        const weatherData = JSON.parse(rawWeatherData.text).data;

        const forecasts = weatherData.map(item => {
            const description = item.weather.description;
            const time = item.datetime;
            return new Weather(description, time);
        });
        response.json(forecasts);
    } catch (error) {
        console.error(error);
        response.status(500).send('Something went wrong');
    }
}

function getPark(request, response) {
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${PARKS_API_KEY}`;
    requestAgent.get(url).then(parksData => {
        const parks = parksData.body.data.map(data => {
            const name = data.fullName;
            const address = data.addresses[0].line1 + data.addresses[0].city;
            const fee = data.entranceFees[0].cost;
            const description = data.description;
            const parkURL = data.url;
            return new Park(name, address, fee, description, parkURL)
        });
        response.status(200).json(parks);
    }).catch((error) => {
        console.error(error);
        response.status(500).send('Something went wrong');
    })
}

function handleNotFoundError(request, response) {
    response.status(404).send(`Resource Not Found: ${request.baseUrl}`);
}

function Weather(description, valid_date) {
    this.forecast = description;
    this.time = valid_date;
}

function Location(name, location, latitude, longitude) {
    this.search_query = name;
    this.formatted_query = location;
    this.latitude = latitude;
    this.longitude = longitude;
}

function Park(name, address, fee, description, url) {
    this.name = name;
    this.address = address;
    this.fee = fee;
    this.description = description;
    this.url = url;
}

// function ServerError() {
//     this.status = 500;
//     this.responseText = "Sorry, something went wrong";
// }
