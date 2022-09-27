const express = require('express');
const app = express();
app.use(express.json());

const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

const config = require('./config.js');

const WeatherAPI = require('./weather');
const weather = new WeatherAPI();

app.get('/', (req, res) => {
    res.render('index',
        { title: 'NodeTraining' } 
    );
});

app.post('/output', async (req, res) => {
    let  { en, start, end } = req.body;
    let params = { station: '00FAY', start, end };
    let report = await weather.GetDailyWeather(params);

    res.render('index', {
        title: 'NodeTraining',
        report }
    );
});

function CreateDailyParams(en) {
    // find and parse file
    let data = fs.readFileSync('active.json');
    let stations = JSON.parse(data);
    let sID;
    // except actually npm install fuzzyset.js to handle typos
    stations.forEach(s => {
        if (en.en === s.name.en) {
            sID = s.id;
        }
    });
    return sID;
}

app.listen(3000);
module.exports = app;
