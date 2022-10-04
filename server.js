const express = require( 'express' ),
      app = express()

const items = []

app.use( express.static('build') )
app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( items ) )

app.post( '/add', ( req,res ) => {
    console.log( req.body )  
    items.push( req.body )
    res.json( items )
})

app.post( '/remove', ( req,res ) => {
    // console.log( req.body.name )  
    // items.push( req.body )
    // res.json( items )
    const filterEntries = function( entry ) {
        // console.log(entry.name);
        // console.log(req.body.name);
        if (req.body.name == entry.name) {
            // console.log("deleting the thing")
            entry.name = ""
            entry.qty = ""
            entry.units = ""
            entry.brand = ""
        }
    }
    items.forEach(filterEntries);
    // req.body.name = ""
    // console.log(items);
    // items.push(entry);
    res.json(items);
})

app.listen( 3000 )