'use strict';

const Person = function (name, age) {
  this.name = name;
  this.age = age;
};

Person.prototype.getName = function () { return this.name; };  // the 40th fibnacci number

const person = new Person('Fred', 51);

// bad code -- references the same thing over and over
function sayName(person) {
  const name = person.getName(); // Calling a function takes more resources than referencing a var
  return (person.age >= 50) ? name.toUpperCase() : name.toLowerCase();
}

console.log(sayName(person));

// better -- cache a reference to it, just once
// Seems small, but calling functions is harder on the server than a variable lookup.

function sayNameBetter(person) {
  let name = person.getName();
  return (person.age >= 50) ? name.toUpperCase() : name.toLowerCase();
  // bi - binary  means two 0, 1 true or false
  // binary operator acts on two values  + 
  // 1 + 2
  // (a == b ) && ( b == c)
  // unary operator un means 1
  // NOT => !true = false
  // ternary means 3 
  //  const something = (condition) ? console.log(true) : console.log(false)
}

console.log(sayNameBetter(person));

// even better -- use a ternary

function sayNameEvenBetter(person) {
  let name = person.getName();
  return person.age >= 50 ? name.toUpperCase() : name.toLowerCase();
}

console.log(sayNameEvenBetter(person));

// Promises - Ugly
// 3 states => 
// in progress / pending
// error => reject
// resolved / resolve


// Ugliest
function doSomethingAsync(person) {
  return new Promise((resolve, reject) => {
    resolve(person);
  });
}

//Uglier
function doSomethingAsync(person) {
  return Promise.resolve(person);
}

// Ugly
doSomethingAsync(person)
  .then(printUpper)
  .then(printLower);

function printLower(differentData) {
  differentData.name = differentData.name.toLowerCase();
  console.log('ugly lower', differentData.name);
}

function printUpper(data) {
  data.name = data.name.toUpperCase();
  console.log('ugly upper', data.name);
  return data;
}

// Promises Better
doSomethingAsync(person)
  .then(data => changeNameToUpper(data.name))
  .then(name => print(name))
  .then(name => changeNameToLower(name))
  .then(name => print(name));

function changeNameToUpper(name) {
  return name.toUpperCase();
}

function changeNameToLower(name) {
  return name.toLowerCase();
}

function print(words) {
  console.log('pretty', words);
  return words;
}

function makeHTML(str) {
  return `<h1>${str.toLowerCase()}</h1>`;
}

/**
 * Creates html header with city name from query
 * @param {*} req 
 * @param {*} res 
 */
function handleCityQuery(req, res) {
  const city = req.query.city;
  res.send(makeHTML(city));
}
/**
 * Creates html header with state name from query
 * @param {*} req 
 * @param {*} res 
 */
function handleStateQuery(req, res) {
  const state = req.query.state;
  res.send(makeHTML(state));
}
/**
 * Creates html header with country name from query
 * @param {*} req 
 * @param {*} res 
 */
function handleCountryQuery(req, res) {
  const country = req.query.country;
  const cleaned = country.toLowerCase();
  // convert to html
  const html = `<h1>${cleaned}</h1>`;
  res.send(html);
}

/**
 * Creates html header with city name from query
 * @param {*} req 
 * @param {*} res 
 */
function handler4(req, res) {
  const country = req.query.country;
  if (req.query.country) {
    res.send(makeHTML(country));
  } else if (req.query.state) {
    res.send(makeHTML(state));
  } else {
    res.send(makeHTML(city));
  }
}

/** WET Code
 * 
 * W - We
 * E - Enjoy
 * T - Typing
 * 
 * */

/**
 * D - Do not
 * R - Repeat
 * Y - Yourself
 */