const express  = require( 'express' ),
      bodyParser = require('body-parser'),
      app      = express()

//data
//first line is hacky, but functional
const todos = [
  { taskname:'Task name', date:'Due date', timeleft:'Days left' }
]

//middleware
app.use( express.json() )
// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )
app.use(express.json() )

//requests
app.get( '/read', ( req, res ) => 
        {console.log("read received")
        res.json( todos )} )

app.post( '/add',  ( req,res ) => {
  console.log(req.body.taskname)
  let timeleft = calculateTimeLeft(req.body.date)
  todos.push(
    {
      taskname : req.body.taskname,
      date : req.body.date,
      timeleft : timeleft,
    }
  )
  res.json(todos)
})

app.post( '/remove', ( req, res ) => {
  //iterate through the data to find what to remove
  let i=0
  while (i < todos.length)
  {
    if((todos[i].taskname === req.body.taskname)
      && (todos[i].taskname !== 'Task name'))
    {
      todos.splice(i, 1);
    }
    else
    {
      i++;
    }
  }
  res.json(todos)
})

/*
app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})
*/

const calculateTimeLeft = function(date)
{
  let taskDate = Date.parse(date)
  let today = new Date()
  let time = ((taskDate - today) / 86400000).toPrecision(3)
  if(time <= 0)
  {
    time = 0
  }
  return time;
}

// listen for requests :)
// all our post and get requests here
const listener = app.listen(8080)