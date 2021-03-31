### Single Responsibility Principle

We want a function to focus on doing one job and doing it well. THe simple the job of a function the more reusable it is.

### Route Handler Function is responsible for

Accepting INPUT from the client REQUEST
Do some PROCESSING and or STORAGE; this maybe 1 or 2 or 20 steps
RESPONSE some OUTPUT to client

### Name by responsibility

Request

```
/location?city_name=amman
```

Response

```
 {
     "name": "Amman",
     "lat": 12.345,
     "lon": 12.345,
 }
```

The route is responsible for:

input => city_name
processing => Loading from file OR
Loading from api OR
Loading from a database if it is present in the database but if it wasn't we loaded it from the api
output => locationData object
good name => getLocationData

Bad approach
/doesEverything?weather=true
/doesEverything?location=true
/doesEverything?parks=true
Too much logic in one function is it responsible for location or weather or parks???

### Model View Controller or MVC

Model is our data
View is the final presentation (usually HTML)
Controller is the logic for getting the data and doing any processing (our handler functions)
