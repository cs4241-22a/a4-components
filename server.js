const express  = require( 'express' ),
    app      = express()

const todos =  [
    {
        activity: "Sleep",
        date: "2022-09-07",
        startTime: "19:15",
        endTime: "19:15",
        description: "test",
        duration: "0 Hour  0 Minutes",
    },
    {
        activity: "Food",
        date: "2022-09-07",
        startTime: "20:15",
        endTime: "21:15",
        description: "test",
        duration: "1 Hour  0 Minutes",
    },
    {
        activity: "Work",
        date: "2022-09-07",
        startTime: "07:00",
        endTime: "19:50",
        description: "test",
        duration: "12 Hour  50 Minutes",
    }
]

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build'))

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
    todos.push( req.body )
    console.log(todos);
    res.json( todos )
})

app.post('/delete', (req, res) => {

    let index = todos.findIndex(req.body);
    todos.splice(index, index + 1);
    console.log(todos);
    res.json(todos);

})

app.post( '/change', function( req,res ) {
    const index = todos.findIndex( v =>
        v.activity === req.body.activity && v.date === req.body.date && v.startTime === req.body.startTime && v.endTime === req.body.endTime && v.description === req.body.description && v.duration === req.body.duration)

    todos.splice(index, index + 1);
    console.log(todos);
    res.json(todos);
    // res.sendStatus( 200 )
})



app.listen( 8080 )