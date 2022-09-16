const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const config = require('./config');
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

// await async this
let headers = { 'X-RapidAPI-Key': config.key, 'X-RapidAPI-Host': config.host }

// stores req.body from app.post for parseId()
let search = {};
// params is valid only post-parseId()
let params = {};
// stores response.data from axios request
let resp = {};

app.get('/', (req, res) => {
    res.render('index',
        { title: 'NodeTraining' } 
    );
});

app.post('/output', (req, res) => {
    const { en, start, end } = req.body;
    search = { en, start, end };
    params = { id: parseId(search), start, end };

    const options = {
        method: 'GET',
        url: config.url,
        params: params,
        headers: headers
    };
    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    //     // filter response.data, mind
    //     resp = response.data;
    // });
    
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
