# Warm-Up Exercise
This code sample is written in JavaScript and JSX. Read through the code and determine the output for this function.

```javascript
import React, { Component } from 'react';

const React, { Component }  = require('react');


// Destructuring
React = {
  Component: 'Something here'
}

const  { Component } = React;
// As seen in ejs 
const {title, isbn} =
{
  title: 'Harry Potter',
  isbn: 1333434
}


console.log(title);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "Susan Sample",
      age: 27,
      pets: ["Fido", "Mr Whiskers"]
    };
  }

  hadBirthday = () => {
    this.setState({age: this.state.age+1});
  };

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <h3 onClick={this.hadBirthday}>Current Age: {this.state.age}</h3>
        <h4>Pets</h4>
        <ul>
          { 
            this.state.pets.map( (pet) => <li>{pet}</li> )
          }
        </ul>
      </div>
    );
  }
}
// is to create and object
function App() {
 // App will extend Component

this.state = {
      name: "Susan Sample",
      age: 27,
      pets: ["Fido", "Mr Whiskers"]
    };
}

App.prototype.hadBirthday = function () {
    this.setState({age: this.state.age+1});
  };

App.prototype.render = function () {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <h3 onClick={this.hadBirthday}>Current Age: {this.state.age}</h3>
        <h4>Pets</h4>
        <ul>
          { 
            this.state.pets.map( (pet) => <li>{pet}</li> )
          }
        </ul>
      </div>
    );
  }

  function Component() {
    // defined stuff
  }

export default App;
```
