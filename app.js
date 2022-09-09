const express = require('express');
const app = express();
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index',
        { title: 'NodeTraining' } 
    );
});

app.post('/output', (req, res) => {
    const { location, sdate, edate } = req.body;
    res.render('index', {
        title: 'NodeTraining',
        location, sdate, edate}
    );
});

app.listen(3000);
