import React from "react";

class Birthday extends React.Component {
	render() {
		return (
			<tr className="results" id={this.props.submitTime}>
				<td>{this.props.firstName}</td>
				<td>{this.props.lastName}</td>
				<td>{this.props.birthday}</td>
				<td>{this.props.daysUntil}</td>
				<td>{this.props.giftIdea}</td>
				<td>
					<button
						onClick={() => this.props.editBirthday(this.props.submitTime)}
					>
						Edit
					</button>
				</td>
				<td>
					<button
						onClick={() => this.props.deleteBirthday(this.props.submitTime)}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	}
}

//main component
class App extends React.Component {
	constructor(props) {
		super(props);
		// initialize our state
		this.state = { birthdays: [] };
		this.addBirthday = this.addBirthday.bind(this);
		this.deleteBirthday = this.deleteBirthday.bind(this);
		this.editBirthday = this.editBirthday.bind(this);
		this.load();
	}

	load() {
		fetch("/birthdays", { method: "get", "no-cors": true })
			.then((response) => response.json())
			.then((json) => {
				this.setState({ birthdays: json });
			});
	}

	render() {
		let content;
		if (JSON.stringify(this.state.birthdays) === "[]") {
			content = (
				<p>
					There are no saved birthdays. Add a new birthday using the form above!
				</p>
			);
		} else {
			content = (
				<table className="results">
					<tr className="results">
						<th>First Name</th>
						<th>Last Name</th>
						<th>Birthday</th>
						<th>Days Until Next Birthday</th>
						<th>Gift Idea</th>
						<th style={{ backgroundColor: "black" }}></th>
						<th style={{ backgroundColor: "black" }}></th>
					</tr>
					{this.state.birthdays.map((birthday, i) => (
						<Birthday
							firstName={birthday.firstName}
							lastName={birthday.lastName}
							birthday={birthday.birthday}
							daysUntil={birthday.daysUntil}
							giftIdea={birthday.giftIdea}
							submitTime={birthday.submitTime}
							deleteBirthday={this.deleteBirthday}
							editBirthday={this.editBirthday}
						/>
					))}
				</table>
			);
		}
		return (
			<main>
				<h1>Welcome to Birthday Tracker</h1>
				<form action="">
					<table>
						<tr>
							<td>
								<label for="firstName">First Name: </label>
							</td>
							<td>
								<input type="text" id="firstName" placeholder="First Name" />
							</td>
						</tr>
						<tr>
							<td>
								<label for="lastName">Last Name: </label>
							</td>
							<td>
								<input type="text" id="lastName" placeholder="Last Name" />
							</td>
						</tr>
						<tr>
							<td>
								<label for="birthday">Birthday: </label>
							</td>
							<td>
								<input type="date" id="birthday" />
							</td>
						</tr>
						<tr>
							<td>
								<label for="giftIdea">Gift Idea: </label>
							</td>
							<td>
								<input type="text" id="giftIdea" placeholder="Gift Idea" />
							</td>
						</tr>
					</table>
					<button id="submit" onClick={this.addBirthday}>
						Submit
					</button>
				</form>
				<h3>Instructions:</h3>
				<ul>
					<li>
						<strong>To add a birthday: </strong>Fill out the form and click the
						submit button.
					</li>
					<li>
						<strong>To delete a birthday: </strong>Click the delete button for
						the birthday you want to delete.
					</li>
					<li>
						<strong>To modify a birthday: </strong>Fill out the form including
						any edits, <em>but do not click the submit button.</em> Instead
						click the modify button for the birthday you wish to modify.
					</li>
				</ul>
				<h2>Your List of Saved Birthdays</h2>
				<div className="resultsContainer">{content}</div>
			</main>
		);
	}

	addBirthday(e) {
		e.preventDefault();
		let form = document.querySelector("form");
		if (checkFrmValid()) {
			let body = JSON.stringify(getForm());
			form.reset();
			fetch("/addBirthday", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body,
			})
				.then((response) => response.json())
				.then((json) => {
					this.setState({ birthdays: json });
					document.querySelector("table.results").scrollIntoView();
				});
		} else {
			alert(
				"All fields are required. Please fill out all fields before clicking submit."
			);
		}
	}

	deleteBirthday(UID) {
		let body = JSON.stringify({ submitTime: UID });
		fetch("/deleteBirthday", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		})
			.then((response) => response.json())
			.then((json) => {
				this.setState({ birthdays: json });
			});
	}

	editBirthday(UID) {
		let form = document.querySelector("form");
		if (checkFrmValid()) {
			let modification = getForm();
			form.reset();
			let oldUID = { oldUID: `${UID}` };
			let bodyObjects = [oldUID, modification];
			let body = JSON.stringify(bodyObjects);
			fetch("/editBirthday", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body,
			})
				.then((response) => response.json())
				.then((json) => {
					this.setState({ birthdays: json });
				});
		} else {
			alert(
				"All fields are required. Please fill out all fields before clicking submit."
			);
		}
	}
}

function convertToObj(a, b) {
	if (a.length != b.length || a.length == 0 || b.length == 0) {
		return null;
	}
	let obj = {};
	let json = a.forEach((k, i) => {
		obj[k] = b[i];
	});
	return obj;
}

function getForm() {
	let inputIDs = ["#firstName", "#lastName", "#birthday", "#giftIdea"]; //Element IDs for each input field
	let formLabels = [];
	let formInputs = [];

	for (let index = 0; index < inputIDs.length; index++) {
		let ID = inputIDs[index];
		let input = document.querySelector(`input${ID}`);
		let fieldName = ID.slice(1); //JSON object key
		formLabels.push(fieldName);
		formInputs.push(input.value);
	}
	let table = document.querySelector("table");
	table.focus();
	let json = convertToObj(formLabels, formInputs);
	return json;
}

function checkFrmValid() {
	let inputIDs = ["#firstName", "#lastName", "#birthday", "#giftIdea"]; //Element IDs for each input field
	let valid = [];
	for (let index = 0; index < inputIDs.length; index++) {
		let ID = inputIDs[index];
		let input = document.querySelector(ID);
		if (input.value === "") {
			valid.push(false);
		} else {
			valid.push(true);
		}
	}
	if (valid.every((value) => value === true)) {
		return true;
	} else {
		return false;
	}
}

export default App;
