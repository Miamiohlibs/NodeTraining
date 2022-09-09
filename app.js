import express from 'express';
const app = express();
const fetch = require("./fetch");
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

var callbacks = require('./callbacks');
var promises = require('./promises');

app.get('/', (req, res) => {
    res.render('index',
        { title: 'Express' } 
    );
});

app.listen(3000);
