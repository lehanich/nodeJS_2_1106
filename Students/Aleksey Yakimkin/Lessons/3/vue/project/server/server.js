const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const staticFile = express.static(path.join(__dirname + '.'));
app.use(bodyParser.json());
app.use(staticFile);

app.use(function (req, res, next) {
    var origins = [
        'http://localhost:8080',
        'http://127.0.0.1:8080'
    ];

    for(var i = 0; i < origins.length; i++){
        var origin = origins[i];

        if(req.headers.origin.indexOf(origin) > -1){
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
    }
    
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/log', (req, res) => {
    fs.readFile('./data/log.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post('/api/log', (req, res) => {
    fs.readFile('./data/log.json', 'utf-8', (err, data) => {
        const logArr = JSON.parse(data);
        const logItem = req.body;
        console.log(req.body);
        logArr.push(logItem);
        fs.writeFile('./data/log.json', JSON.stringify(logArr, null, ' '), (err) => {
            if (err) {
                res.status(500).send();
                return;
            }
            res.send({result:'ok'});
        });
    });
})


app.listen(3000, () => {
    console.log("server is running on port 3000");
});
