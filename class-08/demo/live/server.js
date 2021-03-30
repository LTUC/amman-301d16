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
const pg = require('pg');

const options = NODE_ENV === 'production' ? { connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } } : { connectionString: DATABASE_URL};
const client = new pg.Client(options);
client.on('error', err => { throw err; });

// app setup
const app = express();
app.use(cors());

app.get('/location', handle);

// This will only start out webserver if we can successfully connect to the database
client.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    })
});

// /location?city=Amman
function handle(req, res) {
    const city = req.query.city;
    const select = "SELECT * FROM locations WHERE city = $1";

    client.query(select, [city]).then((data) => {
        if (data.rowCount === 0) {
            const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&city=${city}&format=json`;
            superagent.get(url).then(data => {
                // TODO use constructor to format this data
                const locationData = data.body[0];
                const newLocation = new Location(city, locationData.display_name);
                // Save it to a table in our database
                const sql = 'INSERT INTO locations (city, display_name) VALUES ($1, $2) RETURNING *';
                const cleanValues = [newLocation.city, newLocation.display_name];
                //respond to client
                client.query(sql, cleanValues).then((data) => {
                    res.json(data.rows[0]);
                })
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