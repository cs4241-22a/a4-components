'use strict';

const e = React.createElement;

class infoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "username",
      win: 0,
      loss: 0
    };
    this.load()
  }


  // load in our data from the server
  load() {
    fetch( '/userInfo', { method:'get', 'no-cors':true })
      .then( response => response.json() )
      .then( json => {
        console.log(json[0])
        this.setState({ username:json[0].username}) 
        this.setState({ win:json[0].win}) 
        this.setState({ loss:json[0].loss}) 
      })
  }

  render() {

    // Display a "Like" <button>
    return (
      <table style={{width:"100%"}}>
        <tr>
            <th>Username</th>
            <th>Win</th>
            <th>Loss</th>
        </tr>
        <tr>
            <td>{this.state.username}</td>
            <td>{this.state.win}</td>
            <td>{this.state.loss}</td>
        </tr>
    </table>
    );
  }
}

const userInfo = document.querySelector('#user_information_container');
const root = ReactDOM.createRoot(userInfo);
root.render(e(infoTable));
