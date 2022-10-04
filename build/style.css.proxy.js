// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "/*Style your own assignment! This is fun! */\n\nbody{\n  font-family: 'Happy Monkey', cursive;\n  display: grid;\n  grid-template-rows:  5em 5em 7em 1fr;\n  grid-template-columns: 20% 60% 20%;\n  background-color: #b3ffb3\n}\n\nh1{\n  grid-area: 1 / 2/ span 1 / span 3;\n}\n\n.text{\n  grid-area: 2 / 2/ 2 / 2\n}\n\nform{\n  grid-area: 3/ 2 / span 1 / span 1\n}\n\nbutton{\n  font-family: 'Happy Monkey', cursive;\n  border-radius: 4px;\n  background-color: navy;\n  color: #EEEEEE;\n  border-color: #EEEEEE\n}\n\nbutton:hover {\n  background-color: #1e85ae;\n  \n}\n\ntable{\n/*   align-items: center; */\n}\n\n#heldData{\n  background-color: #66c1e5;\n  border-radius: 4px;\n  grid-area: 4/ 2/ span 1 / span 1\n}\n\n.inputs{\n  color: navy;  \n}\n\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}