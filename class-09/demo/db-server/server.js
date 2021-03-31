'use strict';

// Setup up environment

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV;

// Load other libraries
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// Loading the pg client library
const pg = require('pg');

// Setup our connection options based on environment
const options = NODE_ENV === 'production' ? { connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } } : { connectionString: DATABASE_URL };

// Creating a postgres database client with supplied options
const client = new pg.Client(options);
client.on('error', err => { console.log('Unable to connect to database'); });

// app setup
const app = express();
app.use(cors());

app.get('/location', handle);

// Connect to the database
client.connect()
    .then(() => {
        // This will only start out webserver if we connected successfully
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        })
    }).catch(error => {
        console.log('Unable to connect to database: ', error.message);
    });

// /location?city=Amman
function handle(req, res) {
    const city = req.query.city;
    const sql = "SELECT * FROM locations WHERE city = $1";
    const sqlArray = [city];

    client.query(sql, sqlArray)
        .then((data) => {
            if (data.rowCount === 0) {
                const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&city=${city}&format=json`;
                superagent.get(url).then(data => {
                    // TODO use constructor to format this data
                    const locationData = data.body[0];
                    const newLocation = new Location(city, locationData.display_name);
                    // Save it to a table in our database
                    const sql = 'INSERT INTO locations (city, display_name) VALUES ($1, $2) RETURNING *;';
                    const cleanValues = [newLocation.city, newLocation.display_name];
                    //respond to client
                    client.query(sql, cleanValues)
                        .then((data) => {
                            console.log(data);
                            res.json(data.rows[0]);
                        });
                })
            } else {
                res.json(data.rows[0]);
            }
        });
}

function Location(city, display_name) {
    this.city = city;
    this.display_name = display_name;
}