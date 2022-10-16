import React, { Component} from "react";
import Title from "./Title";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

class List extends Component{
    constructor(props) {
        super(props)
        this.state = {
            list: Array()
        };

        this.movieEntry = this.movieEntry.bind(this);
        this.getList = this.getList.bind(this);
        this.edit = this.edit.bind(this);
    }

    getList() {
        fetch('/list', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                list: JSON.parse(data.list)
            });
        });
    }

    edit(e) {
        e.preventDefault();

        let idx = e.target.id.substring(3);
        let cmd = "";

        switch (e.target.id.substring(0, 3)) {
            case "rmv":
                cmd = 'rmv';
                break;
            case "upp":
                cmd = 'movup';
                break;
            case "dwn":
                cmd = 'movdn';
                break;
            default:
                return;
        }

        fetch( '/edit', {
            method:'POST',
            body: JSON.stringify({ 
                type: cmd, 
                entry: this.state.list[idx] 
            }),
            headers: {
                "Content-Type": "application/json"
            }  
        })
        .then(response => response.status)
        .then(data => {
            if (data === 200) {
                this.getList();
            }
        }); 
    }

    movieEntry(idx, img, title, year, imdb) {
        return(
            <div className="title-card" key={idx}>
                <Title img={img} title={title} year={year} imdb={imdb}/>
                <ButtonGroup variant="text" color="inherit">
                    <Button className="rmvbtn" id={`rmv${idx}`} onClick={this.edit} style={{width: "7vw"}}><DeleteForeverIcon/></Button>
                    <Button className="btn" id={`upp${idx}`} onClick={this.edit} style={{width: "8vw"}}><ArrowDropUpIcon/></Button>
                    <Button className="btn" id={`dwn${idx}`} onClick={this.edit} style={{width: "7vw"}}><ArrowDropDownIcon/></Button>
                </ButtonGroup>
            </div>
        );
    }
    
    render() {
        this.getList();

        const header = this.state.list.length ? `${this.props.user}'s Watchlist:` : `${this.props.user}'s list is empty, click New Movie below and start watching!`;
        const titleList = this.state.list.map((e, i) => 
            this.movieEntry(i, e['Poster'], e['Title'], e['Year'], e['URL'])
        );

        return(
            <div className="List" style={{display: this.props.visible ? "" : "none"}}>
                <h2>{header}</h2>
                {titleList}
            </div>
        );
    }
  }
  
  export default List;