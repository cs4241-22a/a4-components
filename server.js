const express  = require( 'express' ),
// cookie = require('cookie-session'),
session = require('express-session'),
cookieParser = require('cookie-parser'),
cors  = require('cors')
      app      = express()

const todos = [
  { name:'buy groceries', completed:false }
]

app.use( express.json() )

app.use( express.static( 'build' ) ) // this will most likely be 'build' or 'public'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
// app.use(cookie({
//     name: 'session',
//     keys: ['keysplease', 'speediskey'],
//     secure:false
//   }))

  app.use(cookieParser());
  app.use(session({
    secret: 'supersecretstring12345!',
    saveUninitialized: true,
    resave: true,
    // store: new MongoStore({ mongooseConnection: db 
    // })
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


let _username = ""

// app.use((req, res, next) => {
//   req.session.username = id;
//     req.session.save();
// })

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
  console.log(`INside register: fullname: ${req.body.username} user: ${req.body.username} pass: ${req.body.password}`)
    collection
      .find({ username: req.body.username })
      .toArray()
      .then(result => {
        if (result.length >= 1) {
          console.log(`FAILED to register user, likely alreadt exists`);
          res.json({ login: false });
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
          _username = req.body.username
          req.session.save();
          console.log(`REGISTER: body username:  ${req.body.username}          session username ${  req.session.username }`);

          req.session.login = true;
          res.json({ login: true, username: req.body.username, });
        }
      });
  });
  
  
  
  
  
  
  app.get('/tasks', (req, res) => { //gets all todoes
    if (collection !== null) {
      // get array and pass to res.json
     
      console.log(" /TASKS: Sesssion  username: " + req.session.username)
      
      console.log("_username: " + _username)
      collection.find({username: _username, password: {$exists:false}} ).toArray().then(result => res.json(result))
    }
  })
  
  app.post("/logout", express.json(), (req, res) => {
    if (req.session.login == true) {
      req.session.username = "";
      req.session.login = false;
      _username = ""
      res.json({ logout: true });
    } else {
      res.json({ logout: false })
    }
  });
  
  
  
  app.post("/login", express.json(), (req, res) => {
   
    collection
      .find({ username: req.body.username, password: req.body.password })
      .toArray()
      .then(result => {
        if (result.length >= 1) {
  
          req.session.username = req.body.username;
          
          req.session.login = true;
          req.session.save();
          _username = req.body.username
          console.log(` /LOGIN: body username:  ${req.body.username}          session username ${  req.session.username }`);
        
          res.json({ login: true });
  
        } else {
  
          console.log(`invalid login for: ${req.body.username, req.body.password}` )
          res.json({ login: false });
        }
      });
  });
  
  
  app.post("/addTask", express.json(), (req, res) => {
  
    console.log("Due date: " + req.body.dueDate)
  
      req.body.daysLeft = getDaysLeft (req.body.dueDate )
  
      req.body.username = _username
      collection.insertOne(req.body).then(result => collection.findOne(result.insertedId)).then( findResult => res.json( findResult))
      console.log("ADD TASK")
     
  });
  

  
  app.post("/clearAll", express.json(), (req, res) => {
   
    console.log("Clear All: " + req.session.username)
    
     collection
     .deleteMany({ username: _username, password:{$exists:false}}) //dont delete username password combos , password:{$exists:false}
     .then( result => res.json( result ) )
      
  });
  
  app.post("/deleteTask", express.json(), (req, res) => {
   
    console.log("Delete Task Id;" +  req.body.id )
    console.log(req.body)
      collection
          .deleteOne({ _id:mongodb.ObjectId( req.body.id ) })
          .then( result => res.json( result ) )
   
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


app.listen( 8081 )