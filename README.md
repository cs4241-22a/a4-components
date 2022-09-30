## Movie Ranker w/ Svelte

your hosting link e.g. https://a4-tjcoppola234.glitch.me

For this project I reimplemented my [Movie Ranker project](https://github.com/tjcoppola234/Movie-Ranker) (a2) using Svelte and Express. Transitioning to Express was simple and made my code much easier to read. Transitioning to Svelte was harder because I had to restructure my functions and make them not change html code themselves, but rather make requests or return promises. The benefits of reactive code are worthwhile, but certain data that was handled on the client side now had to be sent from the server so that the page would reload properly. It is helpful to view all html code changes within the body of the html rather having different document changes dispersed throughout myriad functions.
