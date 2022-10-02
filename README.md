Assignment 4 - Components
===

## Anarchy Schedule Maker MK2

your hosting link e.g. [http://a4-charlieroberts.glitch.me](https://a4-greg-klimov.glitch.me/)

Include a very brief summary of your project here and what you changed / added to assignment #3. Briefly (3–4 sentences) answer the following question: did the new technology improve or hinder the development experience?

This project is a schedule app with one schedule that anyone can change. I had to significantly modify the code behind the calendar view, the table view and the button/form functionality. 

React was very usefull in creating a simple table with all the events, but it made it a lot harder to maintain the add event form, which has a LOT of forms, and therefore change event handlers, as well as the calendar view, which needed custom coloring on certain cells on each line; this was much easier with adding rows and cells without react. Snowpack temporarily made development much faster because of the easy save/updating and improved error messages, but I didn't attempt to run my old server on it, so I had to use npm run build, npm run start if I wanted any access to the server. However, the fact that everything automatically updates and resets after a state change makes it so that I don't have to worry about clearing anything and is very handy.
