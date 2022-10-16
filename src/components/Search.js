import React, { Component} from "react";
import Title from './Title';
import '../css/Search.css';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

class Search extends Component{
    constructor(props) {
        super(props)
        this.state = {
            term: "",
            list: Array(),
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.search = this.search.bind(this);
        this.movieResult = this.movieResult.bind(this);
        this.add = this.add.bind(this);
    }

    handleChange(e) {
        this.setState({
            term: e.target.value
        });
    }

    handleKeypress(e) {
        if (e.keyCode === 13) {
            this.search(e);
        }
    }

    search(e) { 
        e.preventDefault();

        this.setState({
            loading: true
        });

        fetch( '/search', {
            method:'POST',
            body: JSON.stringify({ 
                type: "search", 
                title: this.state.term 
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                list: data.data.Search,
                loading: false
            });
        }); 
    }

    add(e) {
        e.preventDefault();
        let idx = e.target.id.substring(3);

        fetch( '/edit', {
            method:'POST',
            body: JSON.stringify({
                type: "add", 
                entry: this.state.list[idx]
            }),
            headers: {
                "Content-Type": "application/json"
            } 
        })
        .then(response => response.status)
        .then(data => {
            if (data === 200) {
                this.props.refreshList();
            }
        }); 
    }

    movieResult(idx, img, title, year, imdb) {
        return(
            <div className="title-card" key={idx} style={{ display: "inline-block", position: "relative", width: "fit-content"}}>
                <Fab className="addbtn" id={`add${idx}`} color="primary" onClick={this.add} 
                    style={{position: "absolute", bottom: "20%", right: "15%"}}>
                    <AddIcon id={`add${idx}`}/>
                </Fab>
                <Title img={img} title={title} year={year} imdb={imdb}/>
            </div>
        );
    }

    render(){
        let resultList = undefined;

        if (this.state.list) {
            resultList = this.state.list.map((e, i) => 
                this.movieResult(i, e['Poster'], e['Title'], e['Year'], e['URL'])
            );
        }

        return(
            <div className="Search" style={{display: this.props.visible ? "" : "none"}}>
                <h3>Use the search box find movies and add them to your watch list.</h3>
                <div id="search-bar-wrapper">
                    <TextField fullWidth variant="standard" id="search-bar"
                        sx={{
                            input: {
                                fontSize: "2em",
                                color: "#ffffff"
                            }
                        }}
                        onChange={this.handleChange} onKeyDown={this.handleKeypress}/>
                </div>
                <div id="search-button-wrapper">
                    <Button variant="contained" id="search" size="large" endIcon={<SearchIcon/>} 
                        onClick={this.search}>Search</Button>
                </div>
                <div id="search-results">
                    {resultList ? resultList : "No movies found :("}
                </div>
            </div>
        );
    }
}
  
export default Search;