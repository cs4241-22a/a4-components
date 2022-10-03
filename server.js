const express = require('express'),
    app = express();

let appdata = [
    {
        show: "Merlin",
        seasons: 5,
        eps: 13,
        duration: 45,
        uuid: 'iAmAUniqueId',
    },
    {
        show: "Once Upon a Time",
        seasons: 57,
        eps: 24,
        duration: 60,
        uuid: 'iAmAnotherUniqueId',
    }];

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
    res.json(appdata).send();
});


app.post('/change', function (req, res) {
    console.log("changed");
    const idx = todos.findIndex(v => v.name === req.body.name);
    todos[idx].completed = req.body.completed;

    res.sendStatus(200);
});


app.post('/remove', async (req, res) => {
    let tempArr = [];
    for (let i = 0; i < appdata.length; i++) {
        if (appdata[i].key !== req.body.key) {
            tempArr.push(appdata[i]);
        }
    }
    appdata = tempArr;
    res.json(appdata).send();
});


app.listen(8080);