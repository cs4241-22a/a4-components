'use strict';

const e = React.createElement;
const rater = 
    <thead>
      <tr>
        <td align="center"> <button id="rate1">1</button> </td>
        <td align="center"> <button id="rate2">2</button> </td>
        <td align="center"> <button id="rate3">3</button> </td>
        <td align="center"> <button id="rate4">4</button> </td>
        <td align="center"> <button id="rate5">5</button> </td>
      </tr>
    </thead>

class rateMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = { click: false };
  }

  render() {
    if (this.state.click) {
      return "Thank you for rating my website";
    }
    else {
      return e(
        'table',
        { onClick: () => this.setState({ click: true })},
        rater
      );
    }
  }
}

const domContainer = document.getElementById('rate_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(rateMethod));
