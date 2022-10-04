const express  = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());

app.use(express.json({extended: false}));

const todos = [
    {
        message: "Finish A4",
        id: 1
    },
    {
        message: "Final Project",
        id: 2
    },
    {
        message: "Laundry",
        id: 3
    }
];

app.get("/", (req, res) => {
    res.status(200).json(todos);
});

app.post("/", (req, res) => {
    const newtodo = {
        message: req.body.message,
        id: uuidv4()
    };

    todos.push(newtodo);
    res.status(201).json(todos);
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log('Server up and running!');
});