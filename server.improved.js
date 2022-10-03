
const express = require("express");
const app = express();

let studentData = []

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( studentData ) )

app.post( '/add', ( req,res ) => {
  studentData.push(req.body)
  res.end()
})

app.post( '/delete', function( req,res ) {
  studentData = []
  
  res.sendStatus( 200 )
})

app.use(express.static("build"))

app.listen(process.env.PORT || 3000);
