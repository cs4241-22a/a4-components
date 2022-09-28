console.log("Server started")

const express  = require( 'express' ),
      app      = express()

const workouts = [
  { exercise: 'Dumbbell Chest Press', sets: '3', reps: '6', weight: '50' }
]

app.use( express.json() )

app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( workouts ) )

app.post( '/add', ( req,res ) => {
  workouts.push( req.body )
  res.json( workouts )
})

app.post( '/change', function( req,res ) {
  const idx = workouts.findIndex( v => v.name === req.body.name )
  workouts[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

app.listen( 8080 )