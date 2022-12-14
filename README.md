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

**Task**

Based on what you learn about Express, build an Express app that serves up a web form that gets:
* a City Name from a `<select>` list (e.g.: Luxembourg City, New York, Oxford -- use whatever cities you want)
* a start date
* an end date

Pass those values to a view template of some kind.

Bonus: make the form a little pretty using Bootstrap.

### Unit 2: Asyncronous JavaScript
**Video Tutorial**: [Async Crash Course](https://www.youtube.com/watch?v=PoRJizFvM7s)

Some JavaScript operations happen asyncronously, meaning that the script may send a request but then keeps doing other business while it waits for a response to the request. Maybe you need to request 3 separate pieces of information from 3 different websites -- you can make all three requests asyncronously. You don't care what order you get the information in, but you need all three pieces of information to proceed -- so you fire off all three requests, and then proceed once all three reply (rather than doing a sequestial: request/wait #1, request/wait #2, request/wait #3....) 

Understanding asyncronous operations is important to working with APIs. 

In the tutorial, pay special attention to Promises and to the Async/Await way of organizing code. 

### Unit 3: Object Oriented Javascript
**Video Tutorial** [JavaScript OOP Crash Course](https://www.youtube.com/watch?v=vDJpGenyHaA)

We're going to want to build some classes for managing our data. Go through this tutorial to familiarize yourself with how classes work in JavaScript.

**Task**

Do the tutorial! We'll write some classes we care about in Unit 4.


**Task**

1. Just do the tutorial and follow the examples

### Unit 4: Axios & APIs

**Video Tutorial**: [Axios Crash Course](https://www.youtube.com/watch?v=6LyagkoRWYA)

Axios is a Node module for handling HTTP requests, including GET, POST, PUT, DELETE and other methods. For the purposes of our project, GET requests are probably all you'll need. 

The main target of your Axios requests will be the Meteostats API (hosted by RapidApi) that returns weather data for a particular place and time. To find the a particular weather station's ID, use the [nearby weather stations](https://dev.meteostat.net/api/stations/nearby.html#endpoint) endpoint to request station IDs for a particular latitiude and longitude. You'll only need to do this once per location.

Your app will use Axios to make calls to the [Daily weather data](https://dev.meteostat.net/api/stations/daily.html#endpoint) endpoint. 

The free version of the API will give you 500 calls per month. You'll use up some of those calls while you're figuring out how to make the requests. Once you do that, you'll want to use a cached copy of the request data rather than making a live API call for every page load while you're building other parts of the app. (You'll use the live API calls again once you're ready to put your app into action.) 

**Tasks** 

1. Use the As you work on the tutorial linked above, try converting the requests to the Async/Await structure you learned about in Unit 2.
2. Find the lat/long values for the cities you selected in unit 1 (Wikipedia is an easy source.) 
3. Get the decimal values for the lat/long using [this converter](https://fcc.gov/media/radio/dms-decimal) -- for example, Wikipedia tells me that Laurel MD is at: 39??5???45???N 76??51???35???W. The Converter tells me that the decimal values are: 39.095833, 76.859722. **Important Note**: The converter won't tell you this, but West and South values should get a negative sign, so Laurel should really be at: 39.095833, **-76.859722**
4. Use the nearby weather stations endpoint to get the weather station ID for the cities you selected in Unit 1.
5. Write a WeatherAPI class that includes methods for:
  * constructor
    * instantiates object, pulling the apiKey, apiHost, and relevant endpoint urls from a config file  
  * GetDailyWeather(stationId, startDate, endDate)
    * calls CreateDailyParams to format the query parameters
    * calls PerformGetQuery with the URL and parameters
    * returns the results of PerformGetQuery    
  * CreateDailyParams(stationId, startDate, endDate)
  * GetNearbyStations(lat,lon)
    * calls GetDecimalCoords to conver coordinates to decimal notation if needed
    * passes formated params to PerformGetQuery along with the nearby stations url 
  * GetDecimalCoords(lat,lon)
    * uses the geo-coordinates-parser module to convert textual coords to decimals if necessary
    * returns decimal coordinates formatted to send as params  
  * PerformGetRequest(url, params)
    * executes an axios GET request 
    * wrap in a try/catch block to log errors
    * return successful query results to calling function   

### Unit 5: Unit Testing with Jest
**Video Tutorial**: [Jest Crash Course](https://www.youtube.com/watch?v=7r4xVDI2vho)

Unit testing allows us to write code to test our code - does each one of our functions or class methods give the desired output? If we write an `Add(a,b)` function, does it correctly return `5` given `a=3,b=2`? What if `a=3,b=undefined`? Do we want it to return `3` or throw and error? Either could be correct, but we should know which response we want it to give and we should ensure that the code behaves as expected.

**Tasks** 

Write unit tests for the WeatherAPI methods in Unit 4.  

### Unit 6: Processing data
**Video Tutorial**: [Higher Order Functions & Arrays](https://www.youtube.com/watch?v=rRgD1yVwIvE)

Now that we're retrieving API data, we need to wrangling the big pile of data down to just what we care about. Here's some [sample JSON you can parse](https://gist.github.com/kenirwin/6c95680adcd9333e1c2fc4b49ca2f2e2#file-sample-weather-data)

Use [Day.js](https://day.js.org/en/) to parse and format dates/times/timestamps.

**Task**

Using what you've learned, write a class that takes in this data and can do a few things:
* limit the data down to just data from a particular date range
* returns an array of just the average, high, or low data for a specified period
* returns the first and last dates as a string such as "January 1, 2020 - January 31, 2020"
* returns the first date as an object with year (as a four-digit number), month (0-11), day (1-31)

## Additional Resources Used

1. lite.json
https://github.com/meteostat/dev/blob/ae385a9f89b51b7574d8aa754f6bf3bfdc12f339/src/bulk/stations.md
(Open) file containing all active weather stations which have reported data to Meteostat. Can be downloaded here:
https://bulk.meteostat.net/v2/stations/lite.json.gz