'use strict';


const e = React.createElement;
const textBox = <form action="/action_page.php">
<label htmlFor="review">Leave a review!</label>
<input type="text" size={50} style={{ height: 100 }} />
<br />
<br />
</form>;



class Review extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('A review was submitted: ' + this.state.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Write a review to display!
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }


}



const domContainer = document.getElementById('review');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Review));