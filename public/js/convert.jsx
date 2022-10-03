'use strict';

const e = React.createElement;

let total = <p id="totalInsert">$</p>
let tempTotal = <p id="tempTotalInsert">$</p>

class converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { click: false };
  }

  render() {
    if (this.state.click) {
      return e(
        'button',
        { onClick: () => this.setState({ click: false })},
        'Convert to USD',
        <p hidden id="totalInsert">$</p>,
        <p id="tempTotalInsert">€</p>
      );
    }
    else {
      return e(
        'button',
        { onClick: () => this.setState({ click: true })},
        'Convert to Euro',
        <p id="totalInsert">$</p>,
        <p hidden id="tempTotalInsert">€</p>
      );
    }
  }
}

const domContainer = document.getElementById('convert_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(converter));
