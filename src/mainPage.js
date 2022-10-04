import React from "react"
import { useNavigate } from "react-router-dom";
import "./mainPage.css"
import "bootstrap/dist/css/bootstrap.min.css"


class MainPage extends React.Component {
    constructor(props) {
        super(props)
        // initialize our state
       
        this.state = {
            tasks: []
        };

        //  this.load() //load our tasks from database
        this.load = this.load.bind(this);
        this.addTask = this.addTask.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.logout = this.logout.bind(this);


    }
    componentDidMount() {
       
        this.load()

    }
    // load in our data from the server
    load() {
        console.log("Loading taskss")
        this.setState({ tasks: [] })
        fetch('http://localhost:8081/tasks', {})
            .then(response => response.json())
            .then(json => {
                console.log("Tasks: " + JSON.stringify(json) )
                this.setState({ tasks: json })
            })
    }

    // render component HTML using JSX 
    render() {
        return (
            <div className="MainPage-Container">

                <div>
                    <p>
                        Add/Remove Items below
                    </p>

                    <form action="">
                        <section id="TodoFields" className="flex">
                            <div className="group">
                                <label htmlFor="todoName">To Do Item:</label> <br />
                                <input type='text' id='todo' />

                            </div>

                            <div className="group">
                                <label htmlFor="todoDesc">Description:</label> <br />
                                <input type='text' id='desc' />

                            </div>

                            <div className="group">
                                <label htmlFor="todoDue">Due Date:</label> <br />
                                <input type='date' id='dueDate' />

                            </div>


                        </section>
                        <section id="Buttons" className="flex">
                            <button id="addBTN" onClick={e => this.addTask(e)}>
                                Add
                            </button>

                            <button id="clearBTN" onClick={e => this.clearAll(e)}>
                                Clear All
                            </button>
                            <button id="logoutBTN" onClick={e => this.logout(e)}>
                                Log Out
                            </button>
                        </section>

                    </form>

                </div>

                <div>
                    <table className="dataTable" id="resultTable">

                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Days left</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {this.state.tasks.map((task, i) => (
                                <tr key={i}>
                                    <td >{task.todo}</td>
                                    <td>{task.desc}</td>
                                    <td>{task.dueDate}</td>
                                    <td>{task.daysLeft}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>


                </div>
            </div>


        )//end return
    }//end render



    addTask(e) {

        //e.preventDefault()
        const todoForm = document.querySelector("form");

        if (todoForm.elements.todo.value === "" || todoForm.elements.desc.value === "") { //check for empty
            window.alert("Task Name or Description is empty.")
            return
        }

        let nameInput = todoForm.elements.todo,
            descInput = todoForm.elements.desc,
            dueDateInput = todoForm.elements.dueDate,
            json = {
                todo: nameInput.value,
                desc: descInput.value,
                dueDate: dueDateInput.value,
                daysLeft: "",
                username: ""
            },
            body = JSON.stringify(json)

        console.log("BODYY" + body)
        fetch('http://localhost:8081/addTask', {
            method: 'POST',
            body,

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                // do something with the reponse
                return response.json();
            })

            .then(json => {
                //this.setState({ todos:json }) 
             
                document.querySelector("form").reset();
                //UPDATE
              
            });



    }

    clearAll  (e) {
        // prevent default form action from being carried out
       // e.preventDefault()

        console.log("Clear all:")

        fetch('http://localhost:8081/clearAll', {
            method: 'POST',

        }).then(function (json) {

          //  this.setState ({todos: []})

            });

    }

    logout(e) {  e.preventDefault();

        fetch("http://localhost:8081/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });     //this.setState({ tasks: [] })
        this.props.navigate("/")
      }

}//end class


export function MainPageRouter (props)
{
const navigate = useNavigate()
return (<MainPage navigate={navigate}></MainPage>)

}

export default MainPage;
