const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index',
        { title: 'NodeTraining' } 
    );
});

app.post('/output', (req, res) => {
    const { location, sdate, edate } = req.body;
    console.log(req.body);
    res.render('index', {
        title: 'NodeTraining',
        location }
    );
});

app.listen(3000);
