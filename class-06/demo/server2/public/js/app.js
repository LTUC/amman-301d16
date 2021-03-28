$(function () {
    // Make an ajax call to students endpoint
    $.ajax('http://localhost:3001/all-students', {
        method: 'get',
        dataType: 'json'
    }).then(studentData => {
        // use mustache to create markup from template and data
        console.log(studentData);
        studentData.forEach(student => {
            const template = $('#profile-template').html();
            const markup = Mustache.render(template, student);

            // use jquery to write to DOM
            $('#students').append(markup);
        });
    });


})