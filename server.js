const express  = require( 'express' ),
      app      = express()
      const port = process.env.PORT || 8080;
      app.use( express.json() )
      app.use( express.static( 'public' ) )     


// Render view
// app.get('/',(req, res, next) => {
//     res.svelte('./src/App', {});
// });


const todos = [
  { name:'John', address: '16 Hawthorne Ln', number:'(123) 456-7890', completed:false}, 
  { name:'Bill', address: '17 Hawthorne Ln', number:'(321) 559-7770', completed:false}, 
  { name:'Ted', address: '18 Hawthorne Ln', number:'(321) 566-2346', completed:false}
]




app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  // todos[ idx ].completed = req.body.completed
  todos.splice(idx, 1)
  console.log(todos)
  res.json( todos )
  // res.sendStatus( 200 )
})

app.listen( port )