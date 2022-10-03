const express  = require( 'express' ),
cookie = require('cookie-session'),
      app      = express()

const todos = [
  { name:'buy groceries', completed:false }
]

app.use( express.json() )

app.use( express.static( 'build' ) ) // this will most likely be 'build' or 'public'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookie({
    name: 'session',
    keys: ['keysplease', 'speediskey']
  }))

//######################## Database ###########################

const mongodb= require('mongodb');
const uri = "mongodb+srv://shanestevenz:creeper101@cluster0.dsec9fr.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

let collection


client.connect()
  .then(() => {
    return client.db('a3_data').collection('a3_collection')
  })
  .then(__collection => {
    collection = __collection
    return collection.find({}).toArray()
  })
  .then(console.log)






//######################## Paths ###########################


app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})


  
// const loginScripts = [{ script: '/js/clientLogin.js' }];

// app.get('/', (req, res) => {
//     console.log("Get the home page!")
//     res.sendFile('src/public/login.html' , { root : __dirname});
// })

// app.get('/mainPage', (req, res) => {
//     res.sendFile('src/mainPage.js' , { root : __dirname});
// })


app.use((req, res, next) => {
  if (collection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})




app.post('/register', express.json(), (req, res) => {

    collection
      .find({ username: req.body.username })
      .toArray()
      .then(result => {
        if (result.length >= 1) {
          console.log(result)
          response.json({ login: false });
        } else {
          //user does not exist, create
          let newUser = {
            username: req.body.username,
            password: req.body.password,
            entries: []
          };
  
          console.log(`inserting ${newUser}`);
          collection.insertOne(newUser);
       
          req.session.username = req.body.username;
          req.session.login = true;
          res.json({ login: true, username: req.body.username, });
        }
      });
  });
  
  
  
  
  
  
  app.get('/tasks', (req, res) => { //gets all todoes
    if (collection !== null) {
      // get array and pass to res.json
      console.log("sesison username: " + req.session.username)
      collection.find({username: req.session.username}).toArray().then(result => res.json(result))
    }
  })
  
  app.post("/logout", express.json(), (request, response) => {
    if (request.session.login == true) {
      request.session.username = "";
      request.session.login = false;
  
      response.json({ logout: true });
    } else {
      response.json({ logout: false })
    }
  });
  
  
  
  app.post("/login", express.json(), (request, response) => {
   
    collection
      .find({ username: request.body.username, password: request.body.password })
      .toArray()
      .then(result => {
        if (result.length >= 1) {
  
          request.session.username = request.body.username;
          request.session.login = true;
          console.log("valid login");
          console.log(request.session.username);
          response.json({ login: true });
  
        } else {
  
          console.log(`invalid login for: ${request.body.username, request.body.password}` )
          response.json({ login: false });
        }
      });
  });
  
  
  app.post("/addTask", express.json(), (request, response) => {
  
    console.log("Due date: " + request.body.dueDate)
  
      request.body.daysLeft = getDaysLeft (request.body.dueDate )
  
      request.body.username = request.session.username
      collection.insertOne(request.body).then(result => collection.findOne(result.insertedId)).then( findResult => response.json( findResult))
      console.log("ADD TASK")
     
  });
  
  
  app.post("/clearAll", express.json(), (request, response) => {
   
    console.log("Clear All: " + request.session.username)
    
     collection
     .deleteMany({ username: request.session.username, password:{$exists:false}}) //dont delete username password combos , password:{$exists:false}
     .then( result => response.json( result ) )
      
  });
  
  app.post("/deleteTask", express.json(), (request, response) => {
   
    console.log("Delete Task Id;" +  request.body.id )
    console.log(request.body)
      collection
          .deleteOne({ _id:mongodb.ObjectId( request.body.id ) })
          .then( result => response.json( result ) )
   
  });
  
  function getDaysLeft(dateDue) {
    //initialize dates with Date object
  
    let currentDate = new Date ()
    const _dueDate = new Date(dateDue);
  
    // calculation for converting a day into milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
  
    // calculation for the time difference between start and last
    const diffTime = _dueDate.getTime() - currentDate.getTime();
  
    // calculation for the days between start and last
    const diffDays = Math.round(diffTime / oneDay);
    // return number of days
    return diffDays;
  }


app.listen( 8080 )