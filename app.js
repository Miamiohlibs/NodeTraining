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

    var temps = Temperatures(report.data);
    var chSubtitle = Anglicize(params, en);
    var chAvg = temps.tavg;
    var chMin = temps.tmin;
    var chMax = temps.tmax;

    // res.render('index', 
    //     { title: 'NodeTraining',
    //     chSubtitle,
    //     chAvg, chMin, chMax
    // })
    res.render('index',
        { title: "NodeTraining", chSubtitle, chAvg, chMin, chMax }
    )
});

// app.get('/indexchart', (req, res) => {
//     res.render('indexchart',
//     { chSubtitle, chAvg, chMin, chMax })
// });

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
 * @returns supplied first and last dates as English string
 */
function Anglicize(args, en) {
    return dayjs(args.start).format('LL') + " to " + dayjs(args.end).format('LL') + ' at ' + en;
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