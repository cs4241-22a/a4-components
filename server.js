const express  = require( 'express' ),
      app      = express(),
      mime = require( 'mime' )

const todos = [
  { dest:'buy groceries', completed:false, dist:'136',avr:'22',derive:'.77 hours' }
]

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )
app.use(express.static('view'))

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  
  const obj = req.body
  console.log(obj)
  const time = (Math.round((obj.dist/obj.avr) * 100) / 100).toString(10) + " hours"
  obj.derive = time
  todos.push( obj )
  res.json( todos )
})

app.post( '/delete', function( req,res ) {
    console.log(todos)
    console.log(req.body.dest + "        --- ")
  const idx = todos.findIndex( v => v.dest === req.body.dest && v.dist === req.body.dist && v.avr === req.body.avr && v.derive === req.body.derive )
  //todos[ idx ].completed = !todos[ idx ].completed
  if(idx > -1){
    todos.splice(idx,1)
  }
  console.log(todos)
  res.sendStatus( 200 )
})

app.post( '/change', function( req,res ) {
    console.log(todos)
    console.log(req.body.dest + "        --- ")
  const idx = todos.findIndex( v => v.dest === req.body.dest && v.dist === req.body.dist && v.avr === req.body.avr && v.derive === req.body.derive )
  //todos[ idx ].completed = !todos[ idx ].completed
  if(idx > -1){
    todos.splice(idx,1)
  }
  console.log("--------------------------------------")
  todos.push( req.body )
  console.log(todos)
  res.sendStatus( 200 )
})

app.listen( 8080 )