const express = require("express");
const path = require("path");
const app = express();

let taskCounter = 2;

let task = [
  {
    primary_key: 0,
    title: "CS4241 Assignment 4",
    description: "This is an example description",
    creation_date: "2022-09-28",
    deadline_date: "2022-01-28",
    priority: "High",
    type: "Academic",
  },
  {
    primary_key: 1,
    title: "Ultimate Tic Tac Toe AI",
    description: "This is an example description but a little bit more",
    creation_date: "2022-09-28",
    deadline_date: "2022-10-11",
    priority: "Medium",
    type: "Other",
  },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("build"));

app.use("/data", (req, res) => {
  res.end(JSON.stringify(task));
});

app.post("/add", express.json(), (req, res) => {
  const newTask = req.body;

  newTask.creation_date = new Date().toISOString().substring(0, 10);
  newTask.primary_key = taskCounter++;
  task.push(newTask);

  res.end(JSON.stringify(task));
});

app.delete("/delete", express.json(), (req, res) => {
  const id = parseInt(req.body.id);
  task = task.filter((task) => id !== task.primary_key);
  res.end(JSON.stringify(task));
});

app.listen(3000 || process.env.PORT, () => {
  console.log("Connected!");
});
