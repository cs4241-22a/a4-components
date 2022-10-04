const express  = require( 'express' ),
      app      = express()

let total = 0, numbers = [], allData = [total,numbers]

app.use( express.json() )

// this will most likely be 'build' or 'public'
app.use( express.static( 'build' ))

app.get( '/', ( req, res ) => {
  let url = "." + req.url
  if( req.url === '/' ) {
    res.redirect("dist/index.html")
  }else{
    res.redirect(url)
  }
})
        
app.post('/remove', (req,res) => {
  let indexToRemove = Number(req.body.indexToRemove)
  console.log(req.body)
  console.log(indexToRemove)
  let numToRemove = numbers[indexToRemove]
  total -= numToRemove
  numbers.splice(indexToRemove,1)
  allData = [total,numbers]
  res.json(allData)
})

app.post( '/add', ( req,res ) => {
  let json = req.body //json = {numToAdd: '5'}
    //console.log(json.numToAdd)
    
    if(!isNaN(json.numToAdd)){
      total += Number(json.numToAdd)
      //let now = new Date()
      //times.push(now.toLocaleTimeString('en-US'))
      //console.log(now.toLocaleTimeString('en-US'))
      allData = ["Total: " + total, numbers]
      numbers.push(Number(json.numToAdd))
    }else{
      console.log("Incorrect Format: Number not submitted")
    }
    
    //console.log(numbers)
    //console.log(total)

    res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.end(JSON.stringify(allData))
})

app.listen( process.env.PORT || 8080 )
