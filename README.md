# NodeTraining
Node training project

## Project Description
This project is designed to offer an opportunity to build up a developer's Node.js skills by combining several elements:
* Building a website using an Express front end
* Making API calls to retrieve fielded data
* Creating a web-form to allow for users to select API search criteria
* Developing custom JavaScript classes to call the API and process return data
* Create tests for class methods
* Displaying API data to the user in graphical form

## Tools
* [Node.js](https://nodejs.org) 
* [Meteostat API](https://rapidapi.com/meteostat/api/meteostat/) - weather data
* [Highcharts](https://www.highcharts.com/) - JavaScript graphing library
### Core Node dependencies
* [Express](https://www.npmjs.com/package/express) - Node-based web framework
* [EJS](https://www.npmjs.com/package/ejs) - Embedded JavaScript templates
* [Axios](https://www.npmjs.com/package/axios) - library for making http (API) calls
* [Jest](https://www.npmjs.com/package/jest) - unit testing

## Project Specs
### User-facing website
* Offer the user a web form through which they can select one of several cities, and enter a date range (beginning and end date)
* Return a page with a chart showing the high, low, and average temperatures for that city for each day in the date range 

### Back-end operations
* It should take in the city and it's Meteostat station code and submit a request for the weather stats for the given date range. 
* It should have a class method to make the appropriate API request from Meteostat
* It should pass the return data off to a class method that formats the data in a fashion suitable for handing off to the graphing software
* It should pass the processed data to an EJS template that generates both the user request form and the graphical/chart output for the request
* All class methods should have appropriate unit test suites

## Units 
### Unit 1: Express

**Video Tutorial**: [Express JS Crash Course](https://www.youtube.com/watch?v=L72fhGm1tfE)

Express is a Node-based framework for developing websites. A "Hello World" in Express might look like this:
```
const express = require('express'); // use the express module
const app = express();              // instantiate an express instance called "app"

app.get('/', function (req, res) {  // create a base route 
  res.send('Hello World');          // that outputs some text to the browser
})

app.listen(3000)                   // serve the website at localhost:3000
```

#### Some other features of Express:
* **multiple routes**
  * add a section like `app.get('/welcome', function(req,res) {...}` to create localhost:3000/welcome with different content than the main route/address    
* **ability to take in/apply user submitted data**
  * create a personalize Hello page based on data submitted
  * use a url like: `http://localhost:3000/welcome?name=Ken` to be interpreted by:
```
app.get('/welcome', function(req,res) { 
          res.send('Hello, ' + req.query.name) 
});
```
  
* **view templates**
  * rather than building the whole web page in the main application, send the relevant data to a view template that inserts relevant data into an HTML outline, e.g.
  * in the ejs template, write plain HTML but insert variables with tags like: `<%= name %>`
  * Note: there are multiple view engines like EJS; another is Handlebars. They work in similar fashions but use different syntax/punctuation
```
/* in the app.js file */ 
app.set('view engine', 'ejs');
app.get('/welcome', function(req,res) { 
    let length = req.query.name.length;
    // make name and length available to the "example" template
    res.render('example', {name: req.query.name, length: length}) 
});


/* in the views/example.ejs file */
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello, <%= name %></title>
</head>
<body>
    <h1>Hello, <%= name %></h1>
    <p>There are <%= length %> letters in your name.</p>
</body>
</html>
```
