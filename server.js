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
app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
    todos.push( req.body )
    res.json( todos )
})

app.post( '/change', function( req,res ) {
    const idx = todos.findIndex( v => v.name === req.body.name )
    todos[ idx ].completed = req.body.completed

    res.sendStatus( 200 )
})

app.listen( 8080 )