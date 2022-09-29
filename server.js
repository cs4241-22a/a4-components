const express = require("express"),
	app = express();

let appdata = [
	{
		firstName: "Test",
		lastName: "User",
		birthday: "2000-05-16",
		giftIdea: "Fancy Hat",
		submitTime: "1664468063250",
	},
	{
		firstName: "Test2",
		lastName: "User2Furious",
		birthday: "1980-06-15",
		giftIdea: "Fancier Hat",
		submitTime: "1664468063251",
	},
];

function reqLogger(req, res, next) {
	console.log(req.url);
	next();
}

app.use(reqLogger);
app.use(express.static("build"));
app.use(express.json());

app.get("/birthdays", (req, res) => {
	updateDaysUntil(appdata);
	res.json(appdata);
});

app.post("/addBirthday", (req, res) => {
	console.log(JSON.stringify(req.body));
	let submission = req.body;
	let newEntry = calcField(submission);
	appdata.push(newEntry);
	res.json(appdata);
});

app.post("/deleteBirthday", (req, res) => {
	let UID = req.body.submitTime;
	let index = appdata.findIndex((element) => {
		if (element.submitTime === UID) {
			return true;
		}
	});
	appdata.splice(index, 1);
	updateDaysUntil(appdata);
	res.json(appdata);
});

app.post("/editBirthday", (req, res) => {
	let modEntry = req.body;
	let oldUID = modEntry[0];
	let index = appdata.findIndex((element) => {
		if (element.submitTime === oldUID.oldUID) {
			return true;
		}
	});
	//Create new entry to replace deleted one
	let submission = modEntry[1];
	let newEntry = calcField(submission);
	appdata.splice(index, 1, newEntry);
	updateDaysUntil(appdata);
	res.json(appdata);
});

app.listen(3000);

//Function to calculate the number of days until next birthday
function daysUntilCalc(string) {
	let currentDay = new Date();
	let birthArray = string.split("-");
	let birthday = new Date(birthArray[0], birthArray[1] - 1, birthArray[2]); //Month is subtracted by 1 since JS counts months 0-11
	//Set current year or the next year if you already had birthday this year
	birthday.setFullYear(currentDay.getFullYear());
	if (currentDay > birthday) {
		birthday.setFullYear(currentDay.getFullYear() + 1);
	}
	//Calculate difference between days
	let daysUntil = Math.floor((birthday - currentDay) / (1000 * 60 * 60 * 24));
	return daysUntil;
}

//Function to take raw submission and convert it into newEntry (with calculated field) to be pushed into appdata
function calcField(submission) {
	let calcField = {
		daysUntil: `${daysUntilCalc(submission.birthday)}`,
		submitTime: `${Date.now()}`,
	};
	let newEntry = Object.assign(submission, calcField);
	return newEntry;
}

//Check if two dates have mathing year, month, and day of the month
function isSameDay(date1, date2) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

//Ensure the days until birthday number is accuarate on any day, not just day of submission
//Runs in GET request from renderTable function on client side (request.url === "/birthdays")
function updateDaysUntil(appdata) {
	for (let entries in appdata) {
		let today = new Date(Date.now());
		let subDate = new Date(Date.parse(appdata[entries].submitTime));

		if (isSameDay(today, subDate)) {
			continue;
		} else {
			appdata[entries].daysUntil = daysUntilCalc(appdata[entries].birthday);
		}
	}
}
