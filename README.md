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


