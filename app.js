const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send(`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <h1>Project</h1>
        <div class="container">
            <h2>Unit 1</h2>
            <form action="/" method="POST">
                <div class="form-group">
                    <label for="location">Location</label>
                    <!-- allow user to search lite.json by country, city ('en') -->
                    <!-- https://www.youtube.com/watch?v=mZOpvhywT_E -->
                    <input type="text" class="form-control" name="location" placeholder="search">
                    <ul class="list-group" id="station"></ul>
                    <div id="station"></div>
                    <script src="stations.js"></script>
                </div>
                <div class="form-group">
                    <label for="startD">Start Date</label><br>
                    <input type="date" class="form-control" name="startD" id="startD">
                </div>
                <div class="form-group">
                    <label for="endD">End Date</label><br>
                    <input type="date" class="form-control" name="endD" id="endD">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-danger">Submit</button>
                </div>
            </form>
        </div>`)
});

app.post('/',(req,res)=>{
    res.send(req.body);
});

app.listen(3000);
