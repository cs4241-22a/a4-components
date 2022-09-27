'use strict';

const e = React.createElement;

let submitFunction = function submit(e) {
  // prevent default form action from being carried out
  e.preventDefault();
  let input = document.getElementById('shoppingitem'),
      input2 = document.getElementById('quantity'),
      input3 = document.getElementById('price'),
      input4 = document.getElementById('username'),
      json = {
    shoppingitem: input.value,
    quantity: input2.value,
    price: input3.value,
    username: input4.value
  },
      body = JSON.stringify(json);
  fetch('/submit', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    window.location.reload();
  });
  return false;
};

const submit = <form action="/submit" method="POST" id="testForm">
  <input type="text" id="shoppingitem" placeholder="Enter shopping item here..." maxLength={50} size={50} />
<input type="text" id="quantity" placeholder="Enter quantity here..." maxLength={50} size={50} />
<input type="text" id="price" placeholder="Enter price (per singular item) here..." maxLength={50} size={50} />
<input type="hidden" id="username" defaultValue="{{{username}}}" />
<input type="submit" />
</form>

class addForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { add: false };
  }

  render() {
    return e(
      'form',
      { onClick: () => this.setState({ add: true })},
      submit
    );
  }
}

const domContainer = document.getElementById('add_form');
const root = ReactDOM.createRoot(domContainer);
root.render(e(addForm));