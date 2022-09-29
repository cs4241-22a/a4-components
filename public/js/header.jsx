'use strict';

const e = React.createElement;

const colorButton = <button id="colButton">Change color of table text?</button>

class headerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { click: false };
  }

  render() {
    if (this.state.click) {
      return e(
        'table',
        { onClick: () => this.setState({ click: false })},
        colorButton,
        <table width="100%" id="tableShop" style={{
          border: "1px solid black",
          color: `red`
        }}>
          <thead>
            <tr>
              <td align="center"> Item </td>
              <td align="center"> Quantity </td>
              <td align="center"> Price (per singular item) </td>
            </tr>
          </thead>
          <tbody id="insertInfo"></tbody>
        </table>
      );
    }
    else {
      return e(
        'table',
        { onClick: () => this.setState({ click: true })},
        colorButton,
        <table width="100%" id="tableShop" style={{
          border: "1px solid black",
          color: `blue`
        }}>
        <thead>
            <tr>
              <td align="center"> Item </td>
              <td align="center"> Quantity </td>
              <td align="center"> Price (per singular item) </td>
            </tr>
          </thead>
          <tbody id="insertInfo"></tbody>
        </table>
      );
    }
  }
}

const domContainer = document.getElementById('header_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(headerTable));
