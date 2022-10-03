Assignment 4 - Components
===

## To Do App
Molly Sunray
http://a4-molly-sunray.glitch.me

I chose to re-implement the client side portion of my to do list application from A2. The user enters the task, category (e.g., school, work, personal), and priority. When the user clicks the "Add" button, the information they inputted in the form is added as a row in the table. "Deadline" is a derived field that is based on the priority of the task. Each item in the table is also given a "Remove" button which removes the row when the user clicks on it. I used React to implement the client by making a Todo component that creates a table row with the todo item's data. I also created a component to hold the form and an App component that holds all parts of the application. I found that using React improved the development experience. React made my code more readable and allowed me to store the list of todo items in the state of the App component. This made it easy to interact with the data when creating the table, adding to the table, and deleting from the table. I also liked being able to use HTML within JavaScript.
