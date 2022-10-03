// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\r\n  background-color: #AC2B37;\r\n}\r\n\r\ntable {\r\n  width: 100%;\r\n}\r\n\r\ntable, th, td {\r\n  border: solid #000;\r\n  border-width: 1px;\r\n}\r\n\r\ntd {\r\n  text-align: center;\r\n}\r\n\r\n.flex-container {\r\n    display: flex;\r\n    background-color: #A9B0B7;\r\n  }\r\n  \r\n.flex-container > div {\r\n  background-color:#f1f1f1;\r\n  margin: 10px;\r\n  padding: 20px;\r\n  font-size: 18px;\r\n}\r\n\r\n.Labels{\r\n  width:30%;\r\n  float:left;\r\n}\r\n\r\n.Inputs{\r\n  width: 60%;\r\n  float:right;\r\n}\r\n\r\nbutton {\r\n  margin-top: 20px;\r\n  margin-left: 25%;\r\n  margin-right: 25%;\r\n  width: 50%;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}