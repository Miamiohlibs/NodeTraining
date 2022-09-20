const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const config = require('./config.js');
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

// await async this
const headers = { 'X-RapidAPI-Key': config.key, 'X-RapidAPI-Host': config.host }

// stores response.data from axios request
let resp = {};

app.get('/', (req, res) => {
    res.render('index',
        { title: 'NodeTraining' } 
    );
});

app.post('/output', (req, res) => {
    let  { en, start, end } = req.body;
    let search = { en, start, end };
    let params = { station: parseId(search), start, end };

    const options = {
        method: 'GET',
        url: config.url,
        params: params,
        headers: headers
    };
    console.log(options);
    // async await this
    axios.request(options).then(function (response) {
        console.log(response.data);
        // filter response.data, mind
        resp = response.data;
    }).catch(error => {
        console.error(error);
    });
    
    res.render('index', {
        title: 'NodeTraining',
        search}
    );
});

function parseId(search) {
    // find and parse file
    let data = fs.readFileSync('active.json');
    let stations = JSON.parse(data);
    let sID;
    // except actually npm install fuzzyset.js to handle typos
    stations.forEach(s => {
        if (search.en === s.name.en) {
            sID = s.id;
        }
    });
    return sID;
}

app.listen(3000);
