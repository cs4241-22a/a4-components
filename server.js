const express = require('express'),
    app = express();

let appdata = [];

app.use(express.json());
app.use(express.static('build'));

app.get('/read', (req, res) => res.json(appdata));

app.post('/add', (req, res) => {
    const mins = req.body.seasons * req.body.eps * req.body.duration;
    let tempJson = {
        show: req.body.show,
        seasons: req.body.seasons,
        eps: req.body.eps,
        duration: req.body.duration,
        totalTime: parseInt(mins / 60),
        key: req.body.key,
    }
    appdata.push(tempJson);
    console.log(appdata);
    res.json(appdata).send();
});

app.post('/remove', async (req, res) => {
    let tempArr = [];
    console.log("Removing on server");
    for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].key !== req.body.key) {
            tempArr.push(appdata[i]);
        }
    }
    appdata = tempArr;
    res.json(appdata).send();
});


app.listen(8080);