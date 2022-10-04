const express  = require( 'express' ),
      app      = express()

const names = []

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( names ) )

app.post( '/add', (req,res ) => {
  names.push( req.body )
  res.json( names )
})

app.post( '/change', function( req,res ) {
  const idx = names.findIndex( v => v.name === req.body.name )
  names[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

app.listen( 8080 )