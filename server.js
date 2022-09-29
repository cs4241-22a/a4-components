console.log("Server started")

const express  = require( 'express' ),
      app      = express()

const workouts = [
  { exercise: 'Dumbbell Chest Press', sets: '3', reps: '6', weight: '50' },
  { exercise: 'Fly', sets: '3', reps: '6', weight: '35' }
]

// For avoiding Heroku $PORT error
app.set('port', (process.env.PORT || 8080));

app.use( express.json() )

app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( workouts ) )

app.post( '/add', ( req,res ) => {
  workouts.push( req.body )
  res.json( workouts )
})

app.post( '/remove', ( req,res ) => {
  debugger
  const idx = workouts.findIndex( v => v.exercise === req.body.exercise )
  if(idx >= 0) {
    workouts.splice(idx, 1)
    res.json( workouts )
  }
})

app.post( '/update', function( req,res ) {
  const body = ({exercise: req.body.exercise, sets: req.body.sets, reps: req.body.reps, weight: req.body.weight})
  workouts[ req.body.index ] = body
  
  res.sendStatus( 200 )
})

app.listen( 8080 )
