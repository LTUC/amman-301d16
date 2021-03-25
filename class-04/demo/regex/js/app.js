
const renderMatches = (keyword, text) => {
     // Create a regex object using from our search string
     const re = new RegExp(keyword, 'g');

     //Find matches
     const matches = text.match(re);

     // clone template
     const templateHTML = $('template').clone().html();
     
    if (re.test(text)) {
        // render matches
        matches.forEach(match => {
            $('.found').append(Mustache.render(templateHTML, { match }));
        })
    }
}

$(function () {
    $('#search').on('change',function() {
        // Get the search keyword from the input
        const keyword = $(this).val();
        
        //Get the text in our text area
        const text = $('#text').val();
        console.log(keyword, text);
        renderMatches(keyword, text);
    })

    $('#text').on('change',function() {
        // Get the search keyword from the input
        const keyword =  $('#search').val();
        
        //Get the text in our text area
        const text = $(this).val();
       
        renderMatches(keyword, text);
    })
})

//Create a new regular expression from a literal
const re = /a([b]+)c/;

const originalString = 'This has abbc in it';

//We can use the match method on a string with a regex search pattern
const matches = originalString.match(re);
console.log('First match:', matches[0]);

// We can use the replace method on a string with a regex as the search pattern
const newStr = originalString.replace(re, 'dogs');
console.log('New string:', newStr);

//We can use the test method on a regex to test a string is a valid match
console.log('Test string using regex: ', re.test(originalString));

const sentence = "Dario's phone number is 555-1535";

const phoneNumberRegex = /\d{3}-\d{4}/;

if(phoneNumberRegex.test(sentence)) {
  console.log("Found a phone number!")
} else {
  console.log('No phone numbers found');
}

// The power of regex comes form defining a short pattern that can match many different instances.
const str2 = "My email is dario@ltuc.com and your is steve27@gmail.com, steve_27@hotmail.com, a@b.it";
const emailRegex = /\w+@\w+\.[a-z]+/g;
const matches2 = str2.match(emailRegex);
console.log(matches2);