const express  = require( 'express' ),
      app      = express()

const names = [
  { name:'sean', numChars:4, timestamp: Date.now() }
]

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( names ) )

app.post( '/add', ( req,res ) => {
    var name = req.body.name;
    var length = name.length;
  names.push( {name:name, numChars:length, timestamp:Date.now()} )
  console.log(names);
  res.json( names )
})

app.listen( 8080 )