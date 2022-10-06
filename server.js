const express  = require( 'express' )
const app = express()

let groceries = [
  {
    quantity: 1,
    itemName: "eggs",
    priority: "Need",
    completed: false
  }
]

app.use( express.json() )
app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => {
  // console.log(groceries)
  res.json( groceries ) 
})

app.post( '/add', ( req,res ) => {
  groceries.push( req.body )
  res.json( groceries )
})

app.post( '/removeCompleted', function( req,res ) {
  for (g of groceries) {
    let idx = groceries.indexOf(g)
    if (g.completed) {
      groceries.splice(idx, 1)
    }
  }
  res.status(200)
  res.json( groceries )
})

app.post( '/clearAll', function( req,res ) {
  groceries = []
  res.status(200)
  res.json( groceries )
})

app.post( '/change', function( req,res ) {
  groceries[ req.body.idx ].completed = req.body.isCompleted
  res.status(200)
})

app.listen( 8080 )