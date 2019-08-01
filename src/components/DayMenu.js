import React from 'react';
import Menu from "./Menu";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { displayDate, displayDay, getTodayDate } from "../utils/helpers";

class DayMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addMenuValue: "",
		};
	}

	deleteFood = (food, menuType) => {
		this.props.deleteFood(food, menuType, this.props.menuOfTheDay.date);
	};

	addFood = (food, menuType) => {
		this.props.addFood(food, menuType, this.props.menuOfTheDay.date);
	};

	deleteMenu = (menuType) => {
		this.props.deleteMenu(menuType, this.props.menuOfTheDay.date);
	}

	handleChange = (e) => {
		this.setState({
			addMenuValue: e.target.value,
		});
	}

	handleSubmit = (e) => { // passes the value of the text up all the way to main component, and resets state
		if (this.state.addMenuValue.length > 0) {
			this.props.addMenu(this.state.addMenuValue, this.props.menuOfTheDay.date);
		}
		
		this.setState({
			addMenuValue: ""
		});
		e.preventDefault();
	};

	handleKeyDown = (e) => {
		if (e.keyCode === 13) { // IF ENTER IS PRESSED, SUBMIT
			this.handleSubmit(e);
		}
	}

	render(){
		let menuOfTheDay = this.props.menuOfTheDay; // each day has 1 container
		let menus = menuOfTheDay.menu.map(menuType => 
			<Menu foodList={menuType.foodList} 
			menuType={menuType.menuType} 
			key={menuType.menuType} 
			deleteFood={this.deleteFood} 
			addFood={this.addFood}
			deleteMenu={this.deleteMenu}/>
			);

		if (menus.length <= 0) {
			menus = <p className="text-center empty-menu-message"> No menu set </p>;
		}

		let classNames = "menu-container ";
		if (menuOfTheDay.date.getTime() === getTodayDate().getTime()) {
			classNames += "active";
		}

	return (
		<Card className={classNames}>
			<h2 className="menu-day">{displayDate(menuOfTheDay.date)}</h2>
			<h2 className="menu-date">{displayDay(menuOfTheDay.date)}</h2>
			<hr/>
			{menus}
			<hr/>
			<div className="add-menu">
				<Form.Control type="text" onChange={this.handleChange} value={this.state.addMenuValue} onKeyDown={this.handleKeyDown} placeholder="Add menu"/>
				<Button variant="primary" onClick={this.handleSubmit}> + </Button>
			</div>
			
		</Card>
	  )
	}
}

export default DayMenu;
