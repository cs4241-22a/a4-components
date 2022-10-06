const express = require('express'),
      app = express();

const appdata = [
  {'title': 'Office Space', 'year': 1999, 'rank': 5, 'date_watched': 'MAY 24 2008', 'years_between': 9},
  {'title': 'Casablanca', 'year': 1942, 'rank': 5, 'date_watched': 'OCT 09 1992', 'years_between': 50},
  {'title': 'Catch Me If You Can', 'year': 2002, 'rank': 4, 'date_watched': 'JAN 13 2010', 'years_between': 8},
  {'title': 'Sharknado', 'year': 2013, 'rank': 3, 'date_watched': 'MAR 02 2014', 'years_between': 1},
  {'title': 'The 36 Chambers of Shaolin', 'year': 1978, 'rank': 5, 'date_watched': 'DEC 16 1978', 'years_between': 0} 
]

app.use(express.json());
app.use(express.static('public'));

app.get('/appdata', (req, res) => res.json(appdata));

app.post('/deletemovie', (req, res) => {
    const movieToDelete = appdata.findIndex((entry) => entry.title === req.body.title);
    if(movieToDelete !== -1)
    {
      appdata.splice(movieToDelete, 1);
      res.send("");
    } else {
      res.send("This movie does not already exist!");
    }
});

app.post('/addmovie', (req, res) => {
    movieDeleteState = "";
    
    let receivedJSON = req.body;
    receivedJSON.year = parseInt(receivedJSON.year);
    receivedJSON.rank = parseInt(receivedJSON.rank);
    const currDate = new Date();
    //add date watched to data
    receivedJSON.date_watched = `${currDate.toString().substring(4,15)}`
    //calculate years between release date and watch date, and add to data
    receivedJSON.years_between = `${currDate.getFullYear() - receivedJSON.year}`
    console.log(receivedJSON);
    appdata.push(receivedJSON)
    res.sendStatus(200);
})

app.listen(8080);
