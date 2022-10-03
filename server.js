const express  = require( 'express' ),
      app      = express()

const todos = [
  { id:0, name:'buy groceries', completed:false }
]

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  req.body.id = todos.length
  todos.push( req.body )
  res.json( todos )
})

app.post( '/change', function( req,res ) {
  console.log("Body: "+JSON.stringify(req.body))
  const idx = todos.findIndex( v => v.id === req.body.id )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

app.post( '/delete', function( req,res ) {
  const idx = todos.findIndex( v => v.id === req.body.id )
   todos.splice(idx, 1)
  res.sendStatus( 200 )
})

app.listen( 8080 )
