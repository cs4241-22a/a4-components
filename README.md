gabriel camacho

## A4 - Secure Todo List w/ React!

heroku link: https://boiling-cliffs-41208.herokuapp.com/

Login and create a Todo list. Todo page is now written with react components, using stuff like the map function, props, useState & useEffect hooks. There are 3 main components, an addTodo form, editTodo form, and the ListTodo table that dynamically renders with react based on data from Mongo. Before, I was also doing client side rendering by manually typing a lot of html and adding/removing a css class with "display: none;" to get things to render and hide. React made rendering certain things much easier, especially with jsx. One downside is it did bring my performance score down from 100 to 97 in Lighthouse. I'm refreshing the page to get new data so that adds more time, page takes longer to load (.5 to .7 seconds) and there is some unused JS in react since I'm just using the minified bundle.
