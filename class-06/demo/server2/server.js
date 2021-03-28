// Load the express module into our script
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express(); // Creates a server application.
const PORT = process.env.PORT || 3000;

// Allow access to our api from another domain
app.use(cors());

/**
 * req  / request => All information about the request the server received
 * res / response => methods which can be called to create and send a response to the client
 */
const handleRequest = (request, response) => {
    console.log(request.query);
    response.send('ok');
};

const handleAbout = (request, response) => {
    const author = process.env.AUTHOR;
    console.log(author);
    response.send(`<h1 style="color: green">${author}</h1>`);
};

// Setup a route to handle
// handle the get request to the '/' path
// www.example.com => wwww.example.com/ => '/'
app.get('/', handleRequest);

// www.example.com/about =>  '/about'
app.get('/about', handleAbout);

app.get('/students', (req, res) => {
    const students = require("./data/students.json");
    // console.log(req);
    let foundStudent = null;
    // return the data for the student whose name matches the name from the query
    students.forEach(student => {
        if (student.name === req.query.name) {
            foundStudent = student;
        }
    });
    if (foundStudent) {
        res.status(200).json(foundStudent);
    } else {
        // Did not find out student
        res.status(404).send('Student Not Found');
    }
});
app.get('/all-students', (req, res) => {
    const students = require("./data/students.json");
    res.status(200).json(students);
});


// request are handled by callbacks
// express will pass paramter to the callbacks

// 16 bit 2^16
// 0 - 65535
// port below 1024 have special meanings and are use by particular programs
// 80 - http://www.example.com
// 443 - https://www.exmaple.com
// 21 - FTP
// 53 - DNS
// 25 - SMTP
// 22 - SSH
// 3000 default for express in node js
// 3001 default for express in node js

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

