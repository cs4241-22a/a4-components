const express  = require( 'express' ),
      app      = express()

const todos = [
  { task:'the', dueDate:1004, priority:'high', mostUrgent:'0'}
]

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/submit', ( req,res ) => {
  console.log(req.body)
  todos.push( req.body )
  res.json( todos )
})
/*app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})*/

app.listen( 8080 )