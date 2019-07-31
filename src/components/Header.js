import React from "react"
import { dayToString, zeroPad } from "../utils/helpers.js"

function Header(props) {
	let {day, date, month, year} = props.date;
	return (
		<div className="header">
			<h1> Welcome to the cookhouse </h1>
			<p>{dayToString(day)} {zeroPad(date)}/{zeroPad(month)}/{year}</p>
		</div>
		)
}


export default Header;