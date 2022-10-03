const express  = require( 'express' ),
    app      = express()

const todos = [

]

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ) )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
    todos.push( req.body )
    res.json( todos )
})
app.post('/delete',function (req, res) {
    const inx = todos.findIndex(v=>v.Task === req.body.Task)
    todos.splice(inx,1)
    res.json(todos)
})
app.post( '/change', function( req,res ) {
    const idx = todos.findIndex( v => v.Task === req.body.Task )
    todos[idx].task = req.body.Task
    todos[idx].date =  req.body.Date
    todos[idx].priority = req.body.Priority

    res.json(todos)
})

app.listen( process.env.PORT || 8080 )
