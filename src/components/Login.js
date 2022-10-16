import React, { Component} from "react";
import "../css/Login.css";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {  
            username: '',
            password: '',
            loginError: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleKeypress(e) {
        if (e.keyCode === 13) {
            this.submit(e);
        }
    }

    submit(e) {
        e.preventDefault();
        const register = e.target.id === "register";

        if (/^[\w_-]+$/.test(this.state.username) && /^[\w_-]+$/.test(this.state.password)) {
            fetch((register ? '/register' : '/login'), {
                method:'POST',
                body: JSON.stringify({ 
                    username: this.state.username, 
                    password: this.state.password 
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    this.props.success(data.username);

                } else {
                    if (login) {
                        this.setState({ loginError: "Incorrect credentials. Try again." });
                    } else {
                        this.setState({ loginError: "Account already exists, please log in with correct credentials." });
                    }
                }
            }); 
        } else {
            this.setState({ loginError: "Username and password must be alphanumeric without spaces." });
        }
    }

    render(){
        return(
            <div className="Login" style={{display: this.props.visible ? "" : "none"}}>
                <div className="login-field">
                    <TextField id="username" label="Username" value={this.state.username} onChange={this.handleChange} onKeyDown={this.handleKeypress}/>
                </div>
                <div className="login-field">
                    <TextField id="password" type="password" label="Password" value={this.state.password} onChange={this.handleChange} onKeyDown={this.handleKeypress}/>
                </div>
                <div className="login-field">
                    <ButtonGroup>
                        <Button className="pure-button" id="login" onClick={this.submit}>Login</Button>
                        <Button className="pure-button" id="register" onClick={this.submit}>Create Account</Button>
                    </ButtonGroup>
                </div>
                <div className="login-field">
                    <p id="login-error">{this.state.loginError}</p>
                </div>
            </div>
        );
    }
}
  
export default Login;