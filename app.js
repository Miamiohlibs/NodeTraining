const express = require('express'); // use the express module
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();              // instantiate an express instance called "app"

// statuc folder = public
app.use(express.static(path.join(__dirname, 'public')));

// thinking
// var data = JSON.parse(lite.json)
// search fields name -> en, country
// briefly included lite.json; don't necessarily need it; can be called but may be easier to not do that

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// https://dev.meteostat.net/api/stations/hourly.html#parameters
// https://dev.meteostat.net/api/stations/nearby.html#example
// GET https://meteostat.p.rapidapi.com/stations/nearby
// https://dev.meteostat.net/bulk/#quick-start

// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://meteostat.p.rapidapi.com/stations/monthly',
//   params: {station: '10637', start: '2020-01-01', end: '2020-12-31'},
//   headers: {
//     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//     'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });