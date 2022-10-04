import React from 'react';
import logo from './logo.svg';
import './App.css';

class Todo extends React.Component{
    render(){
        return (<tr>
                    <th>{this.props.task}</th>
                    <th>{this.props.dueDate}</th>
                    <th>{this.props.priority}</th>
                    <th>{this.props.mostUrgent}</th>
               </tr>)
    }
}

class App extends React.Component {
    
    constructor(newTask) {
         super(newTask)
         this.state = { todos:[] }
         this.load()
    }

    update(newItem){
      console.log("update")
      const task = document.getElementById("listItem").value
      const due = document.getElementById("dueDate").value
      const priority = document.getElementById("priority").value
      console.log(task)
      let json = { todos:[{task:task, dueDate:due, priority:priority, mostUrgent:0}]}
      fetch( '/submit', { 
          method:'POST',
          body: JSON.stringify(json),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(async function (response){
           console.log("the function response")
           let newData = await response.json() //wait until response
           //update(newData)
           console.log(newData)
        })
        //then( response => response.json() )
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
        fetch( '/read', { method:'get', 'no-cors':true })
            /*.then(async function (response){
               console.log("the function response")
               let newData = await response.json() //wait until response
               //update(newData)
               console.log(newData)
            })*/
          .then( response => response.json() )
          .then( json => {
            console.log(json)
            //this.update({todos:json})
            this.setState({ todos:json }) 
          })
    }

    taskMap(task, dueDate, priority, mostUrgent){
        return(
            <tr>
                    <th>task</th>
                    <th>dueDate</th>
                    <th>priority</th>
                    <th>mostUrgent</th>
            </tr>
        )
    }

    /*remove(){

    let listItem = document.querySelector( '#listItem' )
    let dueDate  = document.querySelector( '#dueDate' )
    let priority = document.querySelector( '#priority' )
    let del = document.querySelector('#delButton')
    let json = { listItem: listItem.value,
                 dueDate: dueDate.value,
                 priority: priority.value,
                 feedback: "",
                 del: true
                }
    body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then(async function (response){
       console.log("the function response")
       console.log(response)
       let newData = await response.json() //wait until response
       update(newData)
       console.log(newData)
    })
    return false
  }*/

    render() {
      return (
        <div className="App">
            <form id="inputItem" className="formItems">
                <input type="text" id="listItem" placeholder="Add todo here"/>
                <input type="text" id="dueDate" placeholder="Enter a 4 digit number e.g. 0908" />
                <input type="text" id="priority" placeholder="High, medium or low" />
                <button onClick={ e => this.update( e )}>Submit</button>
            </form>
            <button id="delButton">Remove</button>
            <table id="todoList" className="todoTable">
                <tbody>
                <tr>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Most Urgent</th>
                </tr>
                     { this.state.todos.map( (todo,i) => <Todo task={todo.task} dueDate={todo.dueDate} priority={todo.priority} mostUrgent={todo.mostUrgent} />)}
                </tbody>
            </table>
        </div>
      );
    }
}

export default App;
