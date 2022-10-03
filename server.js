const express = require( 'express' ),
      app     = express()

const todos = []

app.use( express.json() )

app.use( express.static( 'dist' ) )
app.use( express.static( 'src' ) )

app.get( '/', function( req, res ) { res.sendFile(__dirname + '/dist/index.html') } )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req, res ) => {
  let priority = req.body.priority
  if (priority === "Low") {
    req.body.deadline = "This week"
  } else if (priority === "Medium") {
    req.body.deadline = "In three days"
  } else if (priority === "High") {
    req.body.deadline = "Tomorrow"
  }

  todos.push( req.body )
  res.json( todos )
})

app.post( '/delete', ( req, res ) => {
  todos.splice(req.body.id, 1)
  res.json( todos )
})

app.listen( 8080 )