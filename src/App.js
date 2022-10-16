import React, { Component} from "react";
import { hot } from "react-hot-loader";
import "./App.css";

import Login from "./components/Login";
import List from "./components/List";
import Search from "./components/Search";

import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: undefined
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.checkSession = this.checkSession.bind(this);

        this.checkSession();

        document.body.style = 'background: #333333';
    }

    checkSession() {
        fetch( '/session', {
            method:'GET'
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                isLoggedIn: data.username ? true : false,
                username: data.username
            });
        }); 
    }

    login(username) {
        this.setState({
            isLoggedIn: true,
            username: username
        })
    }

    logout(e) {
        e.preventDefault();

        fetch( '/logout', {
            method:'POST'
        })
        .then(response => response.json())
        .then(isLogged => {
            this.setState({
                isLoggedIn: isLogged,
                username: undefined
            });
        }); 

    }

    render(){
        return(
            <div className="App">
                <header>
                    <h1 id="page-title">
                        Movie Watchlist v3
                    </h1>
                </header>
                <Login visible={!this.state.isLoggedIn} success={this.login}/>
                <Button id="logout" variant="contained" endIcon={<LogoutIcon/>} onClick={this.logout} style={{display: this.state.isLoggedIn ? "" : "none"}}>Logout</Button>
                <List visible={this.state.isLoggedIn} user={this.state.username} ref={instance => { this.list = instance; }}/>
                <Search visible={this.state.isLoggedIn} refreshList={() => this.list.getList() }/>
            </div>
        );
    }
}

export default hot(module)(App);