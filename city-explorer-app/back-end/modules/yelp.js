'use strict';

const superagent = require('superagent');

module.exports = getYelp;

function getYelp(location,page=1) {

  console.log(page);
  const numPerPage = 4;
  const start = ((page - 1) * numPerPage + 1);

  const queryParams = {
    location:location,
    limit: numPerPage,
    offset: start,
  };

  console.log(queryParams);

  const url = 'https://api.yelp.com/v3/businesses/search';
  return superagent.get(url)
    .query(queryParams)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then( data => parseYelpData(data.body) );
}

function parseYelpData(data) {
  try {
    const yelpSummaries = data.businesses.map(business => {
      return new Yelp(business);
    });
    return Promise.resolve(yelpSummaries);
  } catch(e) {
    return Promise.reject(e);
  }
}

function Yelp(business) {
  this.tableName = 'yelps';
  this.name = business.name;
  this.image_url = business.image_url;
  this.price = business.price;
  this.rating = business.rating;
  this.url = business.url;
  this.created_at = Date.now();
}
