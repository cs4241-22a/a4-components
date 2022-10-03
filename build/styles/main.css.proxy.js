// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@import url(\"https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap\");\r\n\r\n* {\r\n  color: #ffffff;\r\n  font-family: \"Montserrat\", sans-serif;\r\n  font-weight: 400;\r\n  font-size: 1rem;\r\n}\r\n\r\n.hero {\r\n  object-fit: cover;\r\n  object-position: right;\r\n}\r\n\r\n.complete-st {\r\n  display: flex;\r\n  flex-direction: row;\r\n}\r\n\r\n.complete-st:before,\r\n.complete-st:after {\r\n  content: \"\";\r\n  flex: 1 1;\r\n  border-bottom: 1px solid rgb(255, 255, 255);\r\n  margin: auto;\r\n  margin: auto 10px;\r\n}\r\n\r\n.fg {\r\n  background-color: #343a40;\r\n}\r\n\r\n.card ~ input {\r\n  background-color: transparent;\r\n  border: none;\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}