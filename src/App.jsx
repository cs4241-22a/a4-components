
import React from "react";

class CalendarRow extends React.Component{
	render(){
		
		let label = "";
		if (this.props.time === 0)
			label = "12 AM";
		else if(this.props.time <= 12)
			label = "" + this.props.time + " AM";
		else
			label = "" + (this.props.time - 12) + " PM";
		
		let bgcolor = this.props.bgcolor;
		let color = this.props.color;
		let text = this.props.text;
		
		return(
			<tr>
				<th>{label}</th>
				<td bgcolor={bgcolor[0]} color={color[0]}>{text[0]}</td>
				<td bgcolor={bgcolor[1]} color={color[1]}>{text[1]}</td>
				<td bgcolor={bgcolor[2]} color={color[2]}>{text[2]}</td>
				<td bgcolor={bgcolor[3]} color={color[3]}>{text[3]}</td>
				<td bgcolor={bgcolor[4]} color={color[4]}>{text[4]}</td>
				<td bgcolor={bgcolor[5]} color={color[5]}>{text[5]}</td>
				<td bgcolor={bgcolor[6]} color={color[6]}>{text[6]}</td>
			</tr>
		);
	}
}

class Calendar extends React.Component{
	
	render(){
		
		let appdata = this.props.appdata;
		let textmatrix = [[]];
		let textcolormatrix = [[]];
		let bgcolormatrix = [[]];
		
		for(let i = 0; i < 24; i++){
			textmatrix.push([]);
			textcolormatrix.push([]);
			bgcolormatrix.push([]);
			for(let j = 0; j < 7; j++){
				textmatrix[i].push("")
				textcolormatrix[i].push("")
				bgcolormatrix[i].push("")
						
				for(let z = 0; z < appdata.length; z++){
					const event = Object.values(appdata[z])
				
					if(event.length < 3){
						console.log(event)
						continue
					}
					
					const name = event[0]
					const days = event[2]
					const start = event[3]
					const end = event[4]
					const color = event[6]
					const _days = "mtwrfsu"
					
					if(days.includes(_days.charAt(j)))
					{
						if(i < end && i >= start){
							textmatrix[i][j] = name
							textcolormatrix[i][j] = "white"
							bgcolormatrix[i][j] = color
						}
					}
				}
			}
		}
		
		const rows = [];
		for (let i = 0; i < 24; i++) {
			
			rows.push(<CalendarRow key={i} time={i} text={textmatrix[i]} color={textcolormatrix[i]} bgcolor={bgcolormatrix[i]}/>);
		}
		console.log(rows[1])
		
		
		return <tbody>{rows}</tbody>;
	}
}

class TableRow extends React.Component{
	render(){
		return(
			<tr>
				<td>{this.props.eventname}</td>
				<td>{this.props.location}</td>
				<td>{this.props.day}</td>
				<td>{this.props.time}</td>
				<td>{this.props.timeend}</td>
				<td>{this.props.duration}</td>
				<td>{this.props.color}</td>
				<td>{this.props.details}</td>
			</tr>
		);
	}
}

class App extends React.Component {
	
	constructor(props) {
        super(props);
        this.state = {appdata: []};
		this.updatedata.bind(this);
		
        window.appState = this;
		//update = function(){ updatedata(); };
		this.updatedata();
    }
	
	
	updatedata(){
		let outerthis = this;
		fetch('/getsch', {
			method: 'GET'
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			outerthis.setState({appdata: data});	
			console.log(outerthis.state);
		});
	}
	
	
	render() {
		return (
		<>
		 <div className = "wrapper">
			<div className="top">
				<h1>Weekly Schedule App</h1>
				
				<details open className="top">
					<summary>Calendar</summary>
					<table id="calendarTable">
						<tr>
							<th>Time</th>
							<th>Monday</th>
							<th>Tuesday</th>
							<th>Wednesday</th>
							<th>Thursday</th>
							<th>Friday</th>
							<th>Starurday</th>
							<th>Sunday</th>
						</tr>
						
						<Calendar appdata = {this.state.appdata}/>
						
					</table>
				</details>
				<br></br>
			</div>
			
			<details className="mid">
				<summary>Table View</summary>
			
				<table id="tableViewTable">
					<tr>
						<th>Event Name</th>
						<th>Location</th>
						<th>Day(s)</th>
						<th>Start Time (Military)</th>
						<th>End Time (Military)</th>
						<th>Duration (Hours)</th>
						<th>Color</th>
						<th>Details</th>
					</tr>
					
					{this.state.appdata.map((event) => (
							<TableRow
								eventname = {event.eventname}
								location = {event.location}
								day = {event.day}
								time = {event.time}
								timeend = {event.timeend}
								duration = {event.duration}
								color = {event.color}
								details = {event.details}
							/>
						))		
					}
				</table>
			</details>
			
			<details id="neweventdetails"  className="botleft">
				<summary>Add New Event...</summary>
				<form id="EditForm" action="none">
				
					<label for="ename">Event Name:</label>
					<input type="text" id="ename" name="ename" required onChange={this.handleValueChangeName}></input>
					<br></br>
					
					<label for="eloc">Location:</label>
					<input type="text" id="eloc" name="eloc" onChange={this.handleValueChangeLoc}></input>
					
					<br></br>

					<label for="m">M:</label>
					<input type="checkbox" id="m" name="m" onChange={this.handleValueChangeM}></input>
					
					<label for="t">T:</label>
					<input type="checkbox" id="t" name="t" onChange={this.handleValueChangeT}></input>
					
					<label for="w">W:</label>
					<input type="checkbox" id="w" name="w" onChange={this.handleValueChangeW}></input>
					
					<label for="r">R:</label>
					<input type="checkbox" id="r" name="r" onChange={this.handleValueChangeR}></input>
					
					<label for="f">F:</label>
					<input type="checkbox" id="f" name="f" onChange={this.handleValueChangeF}></input>
					
					<label for="s">S:</label>
					<input type="checkbox" id="s" name="s" onChange={this.handleValueChangeS}></input>
					
					<label for="u">U:</label>
					<input type="checkbox" id="u" name="u" onChange={this.handleValueChangeU}></input>
					
					<br></br>
					
					<label for="etimestart">Event Start Time (0 - 23):</label>
					<input type="number" id="etimestart" name="etimestart" onChange={this.handleValueChangeTime} required min="0" max="23"></input>
					<br></br>
					<label for="etimeend">Event End Time (0 - 23):</label>
					<input type="number" id="etimeend" name="etimeend" onChange={this.handleValueChangeTimeEnd} required min="0" max="23"></input>
					<br></br>
					<label>Duration: </label><label id="eduration">0</label><label> hours</label>
					
					<br></br>
					
					<label for="ecolor">Color:</label>
					<input type="color" id="ecolor" name="ecolor" onChange={this.handleValueChangeColor}></input>
					
					<br></br>
					
					<label for="edetails">Details:</label>
					<input type="text" id="edetails" name="edetails" onChange={this.handleValueChangeDuration}></input>
					
					<br></br>
					
					<button id="ecancel" onClick={(e) => this.cancel(e)}>Cancel</button>
					<button id="ereset" onClick={(e) => this.clear(e)}>Clear</button>
					<button id="esubmit" onClick={(e) => this.add(e)}>Submit</button>
					
				</form>
			</details>
			
			<details id="deleventdetails" className="botcent">
				<summary>Delete an Event...</summary>
				<button id="removeEvent" display="block" onClick={(e) => this.remove(e)}> Delete Event: </button> <input type="text" id="delname" name="delname" onChange={this.handleValueChangeDel}></input>
			</details>
			
			<details id="clreventdetails" className="botrigt">
				<summary>Delete all Events...</summary>
				<button id="clearEvents" display="block" onClick={(e) => this.removeall(e)}>Delete all events</button>
			</details>
		
		</div>
		</>
		);
	}
	
	
	add(e){
		
		let outerthis = this;
		e.preventDefault();
		let Form = document.getElementById('EditForm');
		if (Form.checkValidity() == false) {
			let list = Form.querySelectorAll(':invalid');
			for (let item of list) {
				window.alert("Please enter valid value");
				item.focus();
				break;
			}
		}
		
		else{

			const input1 = this.state.name;
			let input2 = this.state.loc;
			if(!input2)
				input2 = ""
			
			let input3 = ""
			const days = "mtwrfsu"
			const states = [this.state.m, this.state.t, this.state.w, this.state.r, this.state.f, this.state.s, this.state.u];
			
			for (var i = 0; i < days.length; i++) {
				if(states[i]==="on")
					input3 += days.charAt(i)
			}
			
			const input4 = this.state.time;
			const input5 = this.state.timeend;
			let input6 = this.state.color;
			if(!input6)
				input6 = ""
			const input7 = this.state.details;
			
			const json = { eventname: input1, location: input2, day: input3, time: input4, timeend: input5, duration: input5 - input4, color: input6, details: input7}
			const body = JSON.stringify( json )

			fetch( '/new', {
			  method:'POST',
			  body 
			})
			.then( function( response ) {
			  // do something with the reponse 
				outerthis.updatedata();
				document.getElementById("EditForm").reset();
				
				outerthis.setState({m: "off"})
				outerthis.setState({t: "off"})
				outerthis.setState({w: "off"})
				outerthis.setState({r: "off"})
				outerthis.setState({f: "off"})
				outerthis.setState({s: "off"})
				outerthis.setState({u: "off"})
					
			})
		}
		return false;
	}
	
	clear(e){
		e.preventDefault();
		document.getElementById("EditForm").reset();
	}
	
	cancel(e){
		e.preventDefault();
		document.getElementById("EditForm").reset();
		document.getElementById("neweventdetails").removeAttribute("open");
	}
	
	
	remove(e){
		e.preventDefault();
		let outerthis = this;
		let str = this.state.del

			if(str !== "" && str !== null){
				let j = {name : str}
				let body = JSON.stringify(j)
				fetch( '/del', {
				  method:'POST',
				  body
				})
				.then( function( response ) {
				  // do something with the reponse 
					outerthis.updatedata();
					document.getElementById("delname").value = "";
						
				})
			}
	}
	
	removeall(e){
		e.preventDefault();
		let outerthis = this;
				document.getElementById('clreventdetails').removeAttribute('open')
				let body = ""
				fetch( '/clr', {
				  method:'POST',
				  body
				})
				.then( function( response ) {
				  // do something with the reponse 
					outerthis.updatedata();
				})
			
	}
	
	handleValueChangeM = e => {
		this.setState({
            m : e.target.value
        });
    }
	
	handleValueChangeT = e => {
		this.setState({
            t : e.target.value
        });
    }
	
	handleValueChangeW = e => {
		this.setState({
            w : e.target.value
        });
    }
	
	handleValueChangeR = e => {
		this.setState({
            r : e.target.value
        });
    }
	
	handleValueChangeF = e => {
		this.setState({
            f : e.target.value
        });
    }
	
	handleValueChangeS = e => {
		this.setState({
            s : e.target.value
        });
    }
	
	handleValueChangeU = e => {
		this.setState({
            u : e.target.value
        });
    }
	
	handleValueChangeName = e => {
		this.setState({
            name : e.target.value
        });
    }
	
	handleValueChangeLoc = e => {
		this.setState({
            loc : e.target.value
        });
    }
	
	handleValueChangeTime = e => {
		this.setState({
            time : e.target.value
        });
    }
	
	handleValueChangeTimeEnd = e => {
		this.setState({
            timeend : e.target.value
        });
    }
	
	handleValueChangeColor = e => {
		this.setState({
            color : e.target.value
        });
    }
	
	handleValueChangeDetails = e => {
		this.setState({
            details : e.target.value
        });
    }
	
	handleValueChangeDel = e => {
		this.setState({
            del : e.target.value
        });
    }
}

export default App;
