'use strict';

const e = React.createElement;

class clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { click: false };
  }

  render() {
    if (this.state.click) {
      return "I told you not to click this button...";
    }
    return e(
      'button',
      { onClick: () => this.setState({ click: true })},
      'Do not click this button'
    );
  }
}

const domContainer = document.getElementById('click_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(clicker));
