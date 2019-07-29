import React from "react"

function Header(props) {
	let {day, date, month, year} = props.date;
	return (
		<div className="header">
			<h1> Welcome to the cookhouse </h1>
			<p>{dayToString(day)} {zeroPad(date)}/{zeroPad(month)}/{year}</p>
		</div>
		)
}

function dayToString(day) {
	// gets an integer (day) and return the string representation of the day
	const day_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return day_array[day];
}

function zeroPad(number){
	// if number is single digit, add a zero infront
	if (number < 10) {
		return "0"+ number.toString()
	} else {
		return number
	}
}

export default Header;