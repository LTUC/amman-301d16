'use strict';


//Before we add listeners we want to make sure the document is ready
$(function () {

    // render map data
    const showMap = (location) => {

        // Get the template from the html
        const template = $('#map-template').html();

        // Use Mustache to combine the data with a template
        const html = Mustache.render(template, location);

        // Render data to DOM
        $('#map').html(html);
    }

    const showTitle = (location) => {
        const template = $('#title-template').html();
        const html = Mustache.render(template, location);
        $('#title').html(html);
    }

    const showRestaurants = (location) => {
        // use data in location to search for restaurants
        const ajaxSettings = {
            method: 'get',
            dataType: 'json',
            data: location
        }
        // ajax call to restaurants
        $.ajax('fake-data/restaurants.json', ajaxSettings)
        .then(restaurants => {
            console.log(restaurants);
            $('#restaurants ul').empty();
            //then we want to loop over array in returned data
            restaurants.forEach(restaurant => {
                // render each item to the DOM
                // get the template
                const template = $('#restaurant-template').html()
                // combine with data
                const html = Mustache.render(template, restaurant);
                // append to ul in the view
                $('#restaurants ul').append(html);
            })
        });
    }

    // Add event listener to detect our button click
    $('#search-form').on('submit', (event) => {
        // Prevent the submission of the form since we will process it using javascript
        event.preventDefault();
        // event handler will do this
        // Get search term from the input field on the form
        const searchQuery = $('#search').val();

        const ajaxSettings = {
            method: 'get',
            dataType: 'json',
            data: { city: searchQuery }
        };

        // send an ajax call using the search term and store the result in a variable
        $.ajax('fake-data/location.json', ajaxSettings).then(location => {
            // Show Map
            showMap(location);
            // Show Title
            showTitle(location);
            // Show restaurants
            showRestaurants(location);

        }).catch(error => {
            console.log('It got an error', error.statusText);
        });
    })







    // render restaurants

    // Get the template from the html

    // Clone the template

    // Use Mustache to combine the data with a template
})


