Assignment 4 - Components
===

Due: October 4th, by 11:59 AM.

For this assignment you will re-implement the client side portion of *either* A2 or A3 using either React or Svelte components. If you choose A3 you only need to use components for the data display / updating; you can leave your login UI as is.


## Activity Logger (React)

Hosting link: https://a4-nicholas-li.herokuapp.com/


- I changed A2 to include React components. 
- I did change the server to use Express instead of how it was for A2.
- I did also add the CSS framework because I liked how it looked from A3.
- I changed the client side code of my Activity Logger. The overall functionality is the same. The user would input an activity and when the submit button is pressed, it will add to the results. It allows the deletion of an activity.
- It still uses the derived field, duration that is calculated based on the starting time and ending time.
- It now uses React instead of normal HTML, CSS, and JavaScript. 
- I am using React App component to add and hold everything: the form and the table upon startup. I am also using a Log component which is returning a row in the table with the information. 

Overall, it took me a little bit to get used to and learning React. However, I feel like that using React make my code more compact and concise. 
There is not like hardcoding to add, delete, or edit HTML components, and it seems to include both the HTML and JS files together in a JSX file. 
I feel that it is alot more scalable where if I was doing a large project, it would be a lot easier than normal HTML, JS implemetation.



