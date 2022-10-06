const express = require('express');
const app = express();
app.use(express.json());

const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

const config = require('./config.js');
const WeatherAPI = require('./weather');
const weather = new WeatherAPI();

const dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');
const e = require('express');
dayjs.extend(localizedFormat);

    var options = [{
        option: "Nashville",
        value: "Nashville Airport"
    }, {
        option: "Tartu",
        value: "Tartu"
    }, {
        option: "Tallinn",
        value: "Tallin / Tallinn / Lennart Meri / Mõigu"
    }, {
        option: "Dayton",
        value: "Dayton"
    }, {
        option: "Camrose",
        value: "Holden Agdm"
    }, {
        option: "Luxembourg",
        value: "Luxembourg / Luxembourg"
    }, {
        option: "Strasbourg",
        value: "Strasbourg"
    }];

app.get('/', (req, res) => {
    res.render('index',
        { title: 'NodeTraining', options } 
    );
});

app.post('/output', async (req, res) => {
    let  { en, start, end } = req.body;
    let params = { station: CreateDailyParams(en), start, end };
    let report = await weather.GetDailyWeather(params);

    var chSubtitle = Anglicize(params);

    var temps = Temperatures(report.data);
    var chAvg = temps.tavg;
    var chMin = temps.tmin;
    var chMax = temps.tmax;

    var dates = getDates(report.data);
    res.render('index',
        { title: "NodeTraining", chSubtitle, en, chAvg, chMin, chMax, dates, options }
    )
});

/**
 * NO associated information included in return.
 * @param {*} report 
 * @returns supplied first and last dates as English string
 */
function Anglicize(args) {
    return dayjs(args.start).format('LL') + " to " + dayjs(args.end).format('LL') + ' at ';
}

/**
 * NO associated information included in return.
 * @param {*} args
 * @returns array of dates
 */
function getDates(args) {
    var res = args.filter(entry => entry.date != null).map(e => e.date);
    return res;
}

/**
 * NO associated information included in return.
 * @param {*} args
 * @returns array of average, high, and low.
 */
function Temperatures(args) {
    var tavg = args.filter(entry => entry.tavg != null).map(getTavg);
    var tmin = args.filter(entry => entry.tmin != null).map(getTmin);
    var tmax = args.filter(entry => entry.tmax != null).map(getTmax);

    function getTavg(e) {   return e.tavg;  };
    function getTmin(e) {   return e.tmin;  };
    function getTmax(e) {   return e.tmax;  };

    return { tmin: tmin, tavg: tavg, tmax: tmax };
}

/**
 * @param {*} args 
 * @returns station id of args.
 */
function CreateDailyParams(args) {
    let data = fs.readFileSync('active.json');
    let stations = JSON.parse(data);
    let sID;
    // except actually npm install fuzzyset.js to handle typos
    stations.forEach(s => {
        if (args === s.name.en) {
            sID = s.id;
        }
    });
    return sID;
}

app.listen(3000);