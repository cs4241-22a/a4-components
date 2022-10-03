'use strict';

const e = React.createElement;

const logForm = <div> <form action="/login" method="POST">
<input type="text" placeholder="Enter username" name="username" id="username"/>
<input type="password" placeholder="Enter password" name="password" id="password"/>
<input type="submit" />
</form> </div>

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false };
  }

  render() {
    return e(
      'form',
      { onClick: () => this.setState({ submitted: true })},
      logForm
    );
  }
}

const domContainer = document.getElementById('whoosh_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LoginForm));
