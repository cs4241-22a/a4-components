const express  = require( 'express' ),
    app      = express()

let appdata = []
//derived fields
let totalDistance = 0
let totalElevation = 0

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )

app.get( '/update', ( req, res ) => res.json( appdata ) )

app.post( '/add', ( req,res ) => {
    const data = req.body
    //add derived fields
    totalDistance = parseFloat(totalDistance) + parseFloat(data.length)
    totalElevation = parseFloat(totalElevation) + parseFloat(data.elevation)
    data.totallength = totalDistance
    data.totalelevation = totalElevation
    appdata.push( data )

    res.json( appdata )
})

app.post( '/clear', function( req,res ) {
    //clear data
    appdata = []
    totalElevation = 0
    totalDistance = 0

    res.json( appdata )
})

app.listen( 8080 )