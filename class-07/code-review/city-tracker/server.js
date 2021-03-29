'use strict'; // Runs javascript in strict mode

/**
 * req => all the info about the request the server received
 * res => methods which can be called to create and send a response to server
 */
const superagent = require('superagent');

const dotenv = require('dotenv'); // dotenv allows us to load environment variables form a .env file
dotenv.config();
const PORT = process.env.PORT || 3000; // get the port from the environment

const express = require('express'); // Load the express module, which is used to create a web server
let app = express(); // Create an express application which we will use as our web server

const cors = require('cors'); // load the cors library, this allows our server to accept apis calls from other domains

app.use(cors()); // Middleware

// Request -> cors -> handleLocation -> * ..... -> responses
app.get('/location', handleLocation); // handle GET calls to the  /location path using the handleLocation route handler

app.get('/search', (req, res) => {
    superagent.get('https://us1.locationiq.com/v1/search.php?key=pk.ca9cd79ef8be7589da68d85b3dc75812&q=Amman').then((data) => {
        console.dir(data);
    });
    res.send('');
});

// Request -> cors -> handleWeather -> * ..... -> responses
app.get('/weather', handleWeather); // handle GET calls to the  /weather path using the handleWeather route handler

app.get('*', handleErrors); // handle any other route using the handleErrors route handler

app.listen(PORT, () => {
    // Opens the port to accept connections so we can handle requests
    console.log(`the app is listening to ${PORT}`); // output to the terminal when the server starts
});

/**
 * Handle the /location request with city query string and responds with json object with location data
 *
 * @param {*} req
 * @param {*} res
 *
 */
function handleLocation(req, res) {
    try {
        let srchQ = req.query.city; // assign the value found in the 'city' query parameter to srchQ
        let locationObj = getLocationData(srchQ); // create a variable called locationObj and we assign it the return value of getLocationData when invoked with the city argument
        res.status(200).json(locationObj);
    } catch (error) {
        res.status(500).send(`Ooops, something went wrong ${error}`);
    }
}

function handleWeather(req, res) {
    let searchQuery = req.query.city;
    let wthrObj = getWeatherData(searchQuery);
    try {
        res.status(200).send(wthrObj);
    } catch (error) {
        res.status(500).send(`Oopsy, something went wrong ${error}`);
    }
}
function handleErrors(req, res) {
    res
        .status(404)
        .send({ status: 404, responseText: 'Sorry, this page does not exist' });
}

function CityLocation(srchQ, dsplyNam, lat, long) {
    this.search_query = srchQ;
    this.formatted_query = dsplyNam;
    this.latitude = lat;
    this.longitude = long;
}

function CityWeather(srchQ, wthrDesc, time) {
    this.search_query = srchQ;
    this.forecast = wthrDesc;
    this.time = time;
}
/**
 * Generates a CityLocation object given a city name
 *
 * @param {*} searchQuery The city name
 * @returns City Location Object
 */
function getLocationData(searchQuery) {
    // Create a variable called locationData and load the contents of the location.json file found in the data folder on the filesystem
    let locationData = require('./data/location.json');
    // Declare temporary variable to hold the data from the first item in the locationData array
    let displayName = locationData[0].display_name;
    let latitude = locationData[0].lat;
    let longitude = locationData[0].lon;
    // Declare a variable called resObj and we assign to it a new CityLocation instance by invoking the CityLocation constructor with parameters.
    let resObj = new CityLocation(searchQuery, displayName, latitude, longitude);
    // return the object
    return resObj;
}
function getWeatherData(searchQuery) {
    let wthrData = require('./data/weather.json');
    let wthrArry = [];
    for (let i = 0; i < wthrData.data.length; i++) {
        let weatherDesc = wthrData.data[i].weather['description'];
        let time = wthrData.data[i].datetime;
        time = time.replace('-', '/');
        let date = new Date(time);
        let dateStr = date.toString();
        let newDate = dateStr.slice(' ', 16);
        let resObj = new CityWeather(searchQuery, weatherDesc, newDate);
        wthrArry.push(resObj);
    }
    return wthrArry;
}
