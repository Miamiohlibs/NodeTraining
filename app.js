const express = require('express'); // use the express module
const app = express();              // instantiate an express instance called "app"

app.get('/', function (req, res) {  // create a base route 
  res.send('Hello Rill and Ken');          // that outputs some text to the browser
})

app.listen(3000)                   // serve the website at localhost:3000