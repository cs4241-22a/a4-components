import React from 'react';
import logo from './logo.svg';
import './App.css';

class Todo extends React.Component{
    render(){
        return <tr>
                    <th>{this.props.task}</th>
                    <th>{this.props.dueDate}</th>
                    <th>{this.props.priority}</th>
                    <th>{this.props.mostUrgent}</th>
               </tr>
    }
}

class App extends React.Component{
    constructor(newTask){
         super(newTask);
         this.state = { todos:[] }
         this.load()
    }

    update(newItem){
      console.log("update")
      const task = document.getElementById("listItem")
      const due = document.getElementById("dueDate")
      const priority = document.getElementById("priority")
      fetch( '/submit', { 
          method:'POST',
          body: JSON.stringify({ task:task, dueDate:due, priority:priority, mostUrgent:0}),
          headers: { 'Content-Type': 'application/json' }
        })
        .then( response => response.json() )
        .then( json => {
           // changing state triggers reactive behaviors
           console.log({todos:json})
           this.setState({ todos:json }) 
        })

      /*const entry = document.getElementById("todoList")
      entry.innerHTML = "<tr><th>" + "Task" + "</th><th>" 
      + "Due Date" + "</th><th>"
      + "Priority" + "</th><th>" 
      + "Most Urgent" + "</th></tr>"

      let id = 0

      console.log("newItem")
      console.log(newItem)
      newItem.forEach((element, index) => {

        let newEntry = document.createElement("tr")
        newEntry.setAttribute("id", id)
        newEntry.setAttribute("value", false)

        let newEntryItem = document.createElement("td")
        newEntryItem.innerHTML = element.listItem

        let newEntryDate = document.createElement("td")
        newEntryDate.innerHTML = element.dueDate

        let newEntryPriority = document.createElement("td")
        newEntryPriority.innerHTML = element.priority

        let newEntryUrgent = document.createElement("td")
        newEntryUrgent.innerHTML = element.urgent
       
        newEntry.appendChild(newEntryItem)
        newEntry.appendChild(newEntryDate)
        newEntry.appendChild(newEntryPriority)
        newEntry.appendChild(newEntryUrgent)

        console.log(newEntry)
        //entry.appendChild(newEntry)
        Todo.render(newEntry)

        id += 1
      })
     
      
      console.log(entry.innerHTML)*/
    }

    load(){
        fetch( '/read', { method:'post', 'no-cors':true })
          .then( response => response.json() )
          .then( json => {
            //console.log({todos:json})
            //this.update({todos:json})
            this.setState({ todos:json }) 
          })
    }

    render() {
      return (
        <div className="Todo">
          <header className="Todo-header">
            <title>CS4241 Assignment 2</title>
          </header>
            <h1>
                Todo List
            </h1>
            <form id="inputItem" class="formItems">
                <input type="text" id="listItem" placeholder="Add todo here"/>
                <input type="text" id="dueDate" placeholder="Enter a 4 digit number e.g. 0908" />
                <input type="text" id="priority" placeholder="High, medium or low" />
                <button onClick={ e => this.update( e )}>Submit</button>
            </form>
            <button id="delButton">Remove</button>
            <table id="todoList" class="todoTable">
                <tr>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Most Urgent</th>
                </tr>
                <tr>
                    this.state.todos.map( (todo,i) => <Todo task={todo.task} dueDate={todo.dueDate} priority={todo.priority} mostUrgent={todo.mostUrgent} />)
                </tr>
            </table>
        </div>
      );
    }
}

export default App;
