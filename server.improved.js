const express  = require( 'express' ),
      app      = express()

const assignments = [
  { title:'Webware #4 Components', subject: 'Computer Science', deadline: '2022-10-03', priority: 'High'}
]

const isCS = function (subject, assignment) {
  if (subject === "CS" || subject === "cs" || subject === "Computer Science ")
    if (assignment === "MQP")
      return 'High'
    else
      return 'Medium'
  else
    return 'Low'
}

app.use( express.json() )

app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( assignments ) )

app.post( '/add', ( req,res ) => {
  req.body.priority = isCS(req.body.subject, req.body.title)
  assignments.push(req.body)
  res.json( assignments )
})

app.post('/delete', function(req, res){
  let index = -1;
  for (let i = 0; i < assignments.length; i++) {
    if (JSON.stringify(assignments[i]) === JSON.stringify(req.body)) {
      index = i;
    }
  }
  assignments.splice(index, 1);
  res.json(assignments)

})

app.listen( process.env.PORT || 8080)
