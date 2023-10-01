/* eslint-disable no-undef */
import express from "express";
import ViteExpress from "vite-express";
import { MongoClient } from "mongodb";
import "dotenv/config";

const port = process.env.PORT;
const app = express();

// MongoDB Connection
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;
const client = new MongoClient(uri);

client.connect();
const db = client.db("whatToDo");
const usersCollection = db.collection("Users");
let collection = null;

// Middleware
app.use(express.json());

app.post("/login", async (req, res) => {
    const response = await usersCollection.findOne({
        username: req.body.username,
    });

    if (response !== null) {
        // Change cookie to say we're logged in
        // Change current collection in the server to the logged in user (might want to change this so it is clientside or write it to the cookie)
        if (response.password === req.body.password) {
            console.log("Login success")
            collection = db.collection(response.collection);
            res.status(200);
            res.end();  
        }
        else {
            console.log("Incorrect password")
            res.status(401);
        }
    }
    // Else say user not found and to create a new user. 

});

ViteExpress.listen(app, port, () =>
    console.log("Server is listening on", port)
);
