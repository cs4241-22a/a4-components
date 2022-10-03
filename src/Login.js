import React from "react"

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
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control mt-1"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
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
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
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
        console.log("Submit Login: " + e)
        return false
    }

    submitRegister(e) {
        e.preventDefault();
        console.log("Submit Register: " + e)
        return false
    }

}

export default Login;
