'use strict';

const superagent = require('superagent');

module.exports = getParks;

function getParks(location) {

  const url = `https://developer.nps.gov/api/v1/parks`;

  const queryParams = {
    q: location,
    api_key: process.env.PARKS_API_KEY,
  };

  return superagent.get(url)
    .query(queryParams)
    .then(data => parseParksData(data.body));
}

function parseParksData(data) {
  // console.log('data in parks', data, data.data)
  try {
    const parks = data.data.map(park => {
      return new Park(park);
    });
    return Promise.resolve(parks);
  } catch (e) {
    return Promise.reject(e);
  }
}

function Park(park) {
  this.tableName = 'parks';
  this.name = park.fullName;
  this.address = `${park.addresses[0].line1} ${park.addresses[0].city} ${park.addresses[0].stateCode} ${park.addresses[0].postalCode}`;
  this.fee = park.entranceFees[0].cost;
  this.description = park.description;
  this.url = park.url;
}
