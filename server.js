const express  = require( 'express' ),
      app      = express()

const logs = []

app.use( express.json() )

app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( logs ) )

app.post( '/add', ( req,res ) => {
  logs.push( req.body )
  res.json( logs )
})

app.post('/delete', function( req, res ) {
  const i = logs.findIndex( x => x.date === req.body.date)
  logs.splice(i, 1)
  res.json( logs )
})

app.listen( 8080 )