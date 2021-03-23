'use strict';

// Identify the mustache template.
// Why? The actual JS shouldn't have any 'knowledge' or 'insight' into the page structure at all.
// We call this "separation of concerns"
let templateId = '#neighborhood-template';

let neighborhoods = [];

// REVIEW: This is another way to use a constructor to duplicate an array of raw data objects
function Neighborhood(rawDataObject) {
  // this.name = rawDataObject.name
  // this.city = rawDataObject.city
  // this.population = rawDataObject.population
  // this.founded = rawDataObject.founded
  // this.body = rawDataObject.body

  for (let potato in rawDataObject) {
    this[potato] = rawDataObject[potato];
  }
}

// Demo Mustache
Neighborhood.prototype.toHtml = function () {
  // 1. Get the template from the HTML document
  let template = $(templateId).html();
  // 2. Use Mustache to "render" new html by merging the template with the data
  let html = Mustache.render(template, this);
  // 3. Do not forget to return the HTML from this method
  console.log(html);
  return html
};

neighborhoodDataSet.forEach(neighborhoodObject => {
  neighborhoods.push(new Neighborhood(neighborhoodObject));
});

neighborhoods.forEach(ourNewNeighborhoodObject => {
  $('#neighborhoods').append(ourNewNeighborhoodObject.toHtml());
});
 