'use strict';


const e = React.createElement;
const login_form = <form className="form1" action="/login" method="POST">
<input
  className="un "
  type="text"
  align="center"
  placeholder="Username"
  name="username"
/>
<input
  className="pass"
  type="password"
  align="center"
  placeholder="Password"
  name="password"
/>
<button type="submit" className="submit" align="center" />
</form>;



class LoggedIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {submitted: false}
  }

  render() {
    if(this.state.submitted){
      setTimeout('',3000);
      return login_form
    }

    return e(
      'button',
      {onClick: () => this.setState({submitted: true})},
      'Submit'
    );
  }
}


const domContainer = document.getElementById('login_form');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LoggedIn));