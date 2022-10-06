
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groceryList: []
    }
    this.load()
  }

  // get data from server
  load() {
    fetch('/read', {
      method: 'GET',
      'no-cors': true
    })
    .then(res => res.json())
    .then(json => this.setState({groceryList: json}))
  }

  // when an Todo is toggled, send data to server
  toggleCheck( idx, isCompleted ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ 
        idx: idx,
        isCompleted: isCompleted
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
 
  // add a new todo list item
  add(e) {
    
    const quantity = document.getElementById('quantity').value
    const itemName = document.getElementById('itemName').value
    const priority = document.getElementById('priority').value

    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ 
        quantity:quantity, 
        itemName:itemName,
        priority:priority,
        completed:false
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => this.setState({ todos:json }))
    .then(() => this.load())
  }

  // remove completed items
  removeCompleted(e) {
    
    fetch('/removeCompleted', {
      method: 'POST'
    })
    .then( response => response.json() )
    .then( json => this.setState({ todos:json }))
    .then(() => window.location.reload())
  }

  // remove completed items
  clearAll(e) {
    
    fetch('/clearAll', {
      method: 'POST'
    })
    .then( response => response.json() )
    .then( json => this.setState({ todos:json }))
    .then(() => this.load())
  }

  render() {
    return (
      <>
        <h1>Grocery List</h1>
        <p>Keep track of your groceries by adding and completing items.</p>
        
        <form action=''>
          <label htmlFor='quantity'>Quantity: </label>
          <input type='number' id='quantity' min='1'/>
          <br />
          <label htmlFor='itemName'>Item Name: </label>
          <input type='text' id='itemName'></input>
          <br />
          <label htmlFor='priority'>Priority: </label>
          <select id='priority' placeholder=''>
            <option>Need</option>
            <option>Want</option>
            <option>Maybe buy</option>
          </select>
          <br />
        </form>

        <div id="buttons">
          <button onClick={e => this.add(e)}>
            Add Item
          </button>
          <br />
          <button onClick={e => this.removeCompleted(e)}>
            Clear Completed
          </button>
          <br />
          <button onClick={e => this.clearAll(e)}>
            Clear All
          </button>
        </div>

        <br /><br />
        <table id='dataTable'>
          <tbody>
            <tr>
              <th>Quantity</th>
              <th>Item Name</th>
              <th>Priority</th>
              <th>Completed</th>
            </tr>
            {this.state.groceryList.map((item, i) => 
              <tr key={i}>
                <td>{item.quantity}</td>
                <td>{item.itemName}</td>
                <td>{item.priority}</td>
                <td>
                  <input 
                    type='checkbox' 
                    defaultChecked={item.completed} 
                    onChange={(e) => 
                      this.toggleCheck(i, !item.completed)
                    }
                  />
                </td>
              </tr>
            )}
          
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
