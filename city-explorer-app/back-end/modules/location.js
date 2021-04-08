'use strict';

const superagent = require('superagent');
const client = require('./client.js');

const location = {};

location.getLocationData = function (city) {

  let SQL = 'SELECT * FROM locations WHERE search_query = $1';
  let values = [city];

  return client.query(SQL, values)
    .then(results => {
      if (results.rowCount) { return results.rows[0]; }
      else {

        let queryParams = {
          key: process.env.GEOCODE_API_KEY,
          city: city,
          format:'json',
          limit: 1,
        };

        const url = `https://us1.locationiq.com/v1/search.php`;
        return superagent.get(url)
          .query(queryParams)
          .then(data => cacheLocation(city, data.body));
      }
    });

};

function cacheLocation(city, data) {
  const location = new Location(data[0]);
  let SQL = 'INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *';
  let values = [city, location.formatted_query, location.latitude, location.longitude];
  return client.query(SQL, values)
    .then(results => {
      const savedLocation = results.rows[0];
      return savedLocation;
    });
}

/*
SAMPLE RETURN DATA
[
  {
    "place_id": "222943963",
    "licence": "https://locationiq.com/attribution",
    "osm_type": "relation",
    "osm_id": "237662",
    "boundingbox": [
      "47.802219",
      "47.853569",
      "-122.34211",
      "-122.261618"
    ],
    "lat": "47.8278656",
    "lon": "-122.3053932",
    "display_name": "Lynnwood, Snohomish County, Washington, USA",
    "class": "place",
    "type": "city",
    "importance": 0.61729106268039,
    "icon": "https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png"
  }
]
*/
function Location(data) {
  this.formatted_query = data.display_name;
  this.latitude = data.lat;
  this.longitude = data.lon;
}

module.exports = location;
