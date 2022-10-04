import React from "react"
import { useNavigate } from "react-router-dom";
import "./Login.css"
import "bootstrap/dist/css/bootstrap.min.css"
class Login extends React.Component {
    constructor(props) {
        super(props)
        // initialize our state

        this.state = {
            authMode: "signin"
        };
    }


    // render component HTML using JSX 
    render() {

        if (this.state.authMode === "signin") {

            return (
                <div className="Login-Container">
                    <form className="Login-form">
                        <div className="Login-form-content">
                            <h3 className="Login-form-title">Sign In</h3>
                            <div className="text-center">
                                Not registered yet?{" "}
                                <span className="link-primary" onClick={e => this.setState({ authMode: "signin" ? "signup" : "signin" })}>
                                    Sign Up
                                </span>
                            </div>
                            <div className="form-group mt-3">
                                <label>Username</label>
                                <input
                                    type="email"
                                    name="username"
                                    className="form-control mt-1"
                                    placeholder="Enter username"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button className="btn btn-primary" onClick={e => this.submitLogin(e)}>
                                    Submit
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            )
        }//end if ()=> this.state.authMode === "signin" ? "signup" : "signin"

        return (
            <div className="Login-Container">
                <form className="Login-form">
                    <div className="Login-form-content">
                        <h3 className="Login-form-title">Register</h3>
                        <div className="text-center">
                            Already registered?{" "}
                            <span className="link-primary" onClick={e => this.setState({ authMode: "signup" ? "signin" : "signup" })}>
                                Sign In
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input
                                type="email"
                                name="fullName"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="email"
                                name="username"
                                className="form-control mt-1"
                                placeholder="Username123"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control mt-1"
                                placeholder="Password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary" onClick={e => this.submitRegister(e)}>
                                Submit
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        )


    }//end render





    submitLogin(e) {
        e.preventDefault();
        let userForm = document.querySelector("form");

        console.log(`Submit Login: \n\tUsername: ${userForm.elements.username.value} \n\tPassword: ${userForm.elements.password.value}`)
      


        if(userForm.elements.username.value === "" || userForm.elements.password.value === ""){ //check for empty
            window.alert("Username or password is empty.")
            return
          }
        
          fetch("http://localhost:8081/login", { // api call
            method: "POST",
            body: JSON.stringify({
              username: userForm.elements.username.value,
              password: userForm.elements.password.value
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(json => {
              if (json.login) {
                let username = userForm.elements.username.value
                this.props.navigate("/mainPage", {username: username})
              } else {
                window.alert("Invalid login info.");
              }
            });
        
          // reset form
          userForm.reset();


    }

    submitRegister(e) {
        e.preventDefault();

       
        let userForm = document.querySelector("form");
        console.log(`Submit Register: \n\tFull Name: ${userForm.elements.fullName.value} \n\tUsername: ${userForm.elements.username.value} \n\tPassword: ${userForm.elements.password.value}` )
       

        if(userForm.elements.fullName.value === "" || userForm.elements.username.value === "" || userForm.elements.password.value === ""){ //check for empty
            window.alert("Username or password is empty.")
            return
          }
        
        
          const json = { 
                username: userForm.elements.username.value,
                password: userForm.elements.password.value,
                entries: []}
          const body = JSON.stringify(json);
        

          fetch("http://localhost:8081/register", {
            method: "POST",
            body,
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => response.json())
            .then(json => {
               
              if (json.login) {
                console.log("Succes sregister");
                let username = userForm.elements.username.value
                this.props.navigate("/mainPage", {username: username})
              } else {
                console.log("Fail register");
                window.alert(
                  "That user already exists! Maybe try another name?"
                );
              }
            });
        


    }

}


export function LoginRouter (props)
{
const navigate = useNavigate()
return (<Login navigate={navigate}></Login>)

}

export default Login;
