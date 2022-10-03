// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "* {\n  font-family: 'DM Sans', sans-serif;\n}\n\nbody {\n  background-color: #CCD6D2;\n  padding: 0px 30px;\n  margin: 0 auto;\n}\n\ninput, select {\n  margin-bottom: 15px;\n}\n\nh1 {\n  text-align: center;\n}\n\np {\n  text-align: center;\n  margin-bottom: 2em;\n}\n\ndiv#buttons {\n  display: flex;\n}\n\nbutton {\n  padding: 5px;\n  margin-right: 10px;\n  color: white;\n  border-radius: 10px;\n  background-color: #65928E;\n}\n\nbutton:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n  opacity: 80%;\n}\n\ntable, th, td, tr {\n  border: 2px solid white;\n  border-collapse: collapse;\n}\n\ntable {\n  width: 100%;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}