import React, { Component} from "react";
import "../css/Title.css";

class Title extends Component {
    render() {
        return ( 
            <div className="title">    
                <a className="title" href={this.props.imdb}>
                    <div style={{height: "100%"}}>       
                        <img className="poster" src={this.props.img}/>
                        <p className="title">{this.props.title} ({this.props.year})</p>
                    </div>
                </a>
            </div>
         );
    }
}

export default Title;