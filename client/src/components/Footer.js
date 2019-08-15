import React from "react";
import logo from '../images/github.png';

export default class Footer extends React.Component {
	render() {
		return (
			<footer>
			<a href="https://github.com/tohhongxiang123/Cookhouse"><img src={logo} alt="Github Logo"/></a>
			</footer>
			)
	}
}