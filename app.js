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
dayjs.extend(localizedFormat);

app.get('/', (req, res) => {
    res.render('index',
        { title: 'NodeTraining' } 
    );
});

app.post('/output', async (req, res) => {
    let  { en, start, end } = req.body;
    let params = { station: CreateDailyParams(en), start, end };
    let report = await weather.GetDailyWeather(params);

    var temperatures = Temperatures(report.data);
    var eng = Anglicize(params);
    var first = firstDateToObj(params);

    // add back temperatures after solving temperatures error
    var result = eng + "\nStarts on " + first + ".\n With the temperatures \n" + temperatures;

    res.render('index', {
        title: 'NodeTraining',
        result 
    });
});

/**
 * @param {*} args 
 * @returns first date as object
 */
 function firstDateToObj(args) {
    return dayjs(args.start).toDate();
}

/**
 * NO associated information included in return.
 * @param {*} report 
 * @returns supplied first and last dates as English stringå
 */
function Anglicize(args) {
    return dayjs(args.start).format('LL') + " to " + dayjs(args.end).format('LL');
}

/**
 * NO associated information included in return.
 * @param {*} report 
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