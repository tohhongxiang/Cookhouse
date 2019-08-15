import React from "react"
import Jumbotron from "react-bootstrap/Jumbotron"

export default function About() {
	const aStyle = {color: "#000000"};
	return (
		<Jumbotron className="about-container">
			<h1> About </h1>
			<p> Small project using MongoDB, Express, React and Node. Done by <strong><a style={aStyle} href="https://github.com/tohhongxiang123">tohhongxiang123</a></strong> </p>
			<p> Raise any issues on the <strong><a style={aStyle} href="https://github.com/tohhongxiang123/Cookhouse">GitHub repository</a></strong> </p>
		</Jumbotron>
		)
}