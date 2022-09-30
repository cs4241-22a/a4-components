## Simple Hike Planner (With React)

a4-patrick-salisbury.glitch.me

For this project, I reworked a2 to implement react. This involved rewriting the a2 server into an express server, 
changing the html to display the react app, and writing the react app itself to show the data currently on the server
and support the add, update, and clear routes. 

Overall, I found react very helpful, and it definitely simplified the client-server communication by saving me from 
having to manually send requests to the server to update the hike table. One of the most helpful things it did was allow
for an abstraction of the data stored on the server. Instead of manually pinging for new data, I thought of react as 
essentially allowing you to access the data directly like it was stored locally instead of somewhere else. This helps
make the application feel more unified as well instead of feeling like you have two components communicating through a 
link.

