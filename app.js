// const { response } = require('express');
const express = require('express'); // use the express module
// const path = require('path');
// const { allowedNodeEnvironmentFlags } = require('process');
// instantiate an express instance called "app"
const app = express();
// register view engine
// app.set('views', './views');
// app.set('view engine', 'ejs');

// app.use(express.static('views'));
app.use(express.urlencoded({ extended: true}));

// https://www.youtube.com/watch?v=yXEesONd_54&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=7
app.get('/', (req, res) => {
    res.send(`
    <h1>Project</h1>
        <div class="container">
            <h2>Unit 1</h2>
            <form action="/" method="POST">
                <div class="form-group">
                    <label for="location">Location</label>
                    <!-- allow user to search lite.json by country, city ('en') -->
                    <!-- https://www.youtube.com/watch?v=mZOpvhywT_E -->
                    <input type="text" class="form-control" name="location" placeholder="search">
                    <ul class="list-group" id="station"></ul>
                    <div id="station"></div>
                    <script src="stations.js"></script>
                </div>
                <div class="form-group">
                    <label for="startD">Start Date</label><br>
                    <input type="date" class="form-control" name="startD" id="startD">
                </div>
                <div class="form-group">
                    <label for="endD">End Date</label><br>
                    <input type="date" class="form-control" name="endD" id="endD">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-danger">Submit</button>
                </div>
            </form>
        </div>`)
});

app.post('/',(req,res)=>{
    res.send(req.body);
});

app.listen(3000);

// static folder = public
// app.use(express.static(path.join(__dirname, 'public')));
// var stations = JSON.parse(lite.json);
// https://www.youtube.com/watch?v=1iysNUrI3lw
// allow user to search for stations on
// station.country
// station["name"].en
// to find correlating
// station.id

// https://dev.meteostat.net/api/stations/hourly.html#parameters
// https://dev.meteostat.net/api/stations/nearby.html#example
// GET https://meteostat.p.rapidapi.com/stations/nearby
// https://dev.meteostat.net/bulk/#quick-start

// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://meteostat.p.rapidapi.com/stations/monthly',
//   params: {station: '10637', start: document.getElementById('startD'), end: document.getElementById('endD')},
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