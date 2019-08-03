import React from 'react';
import SubMenu from "./SubMenu"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { displayDate, displayDay, getTodayDate } from "../utils/helpers";

class DayMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mealValue: "",
		};
	}

	handleChange = (e) => {
		this.setState({
			mealValue: e.target.value,
		});
	}

	handleSubmit = (e) => {
		if (this.state.mealValue.length > 0){
			this.props.addMeal(this.state.mealValue, this.props.date);
			this.setState({
				mealValue: "",
			});
			}
		e.preventDefault();
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 13) { // IF ENTER IS PRESSED, SUBMIT
			this.handleSubmit(e);
		}
	}

	deleteFood = (food, menuType, mealType) => {
		this.props.deleteFood(food, menuType, mealType, this.props.date);
	};

	addFood = (food, menuType, mealType) => {
		this.props.addFood(food, menuType, mealType, this.props.date);
	};

	addMenu = (menu, mealType) => {
		this.props.addMenu(menu, mealType, this.props.date);
	}

	deleteMenu = (menuType, mealType) => {
		this.props.deleteMenu(menuType, mealType, this.props.date);
	}

	deleteMeal = (mealType) => {
		this.props.deleteMeal(mealType, this.props.date);
	}

	render(){
		let menusToDisplay = this.props.menuOfTheDay.map(menu => (
			<SubMenu mealType={menu.mealType} menuList={menu.menuList} deleteFood={this.deleteFood} addFood={this.addFood} deleteMenu={this.deleteMenu} addMeal={this.addMeal} deleteMeal={this.deleteMeal} addMenu={this.addMenu}/>
		));

		if (menusToDisplay.length <= 0) {
			menusToDisplay = (<h3 className="text-center"> No meal set </h3>);
		}

		let classNames = "dayMenu-container ";
		if (getTodayDate().getTime() === this.props.date.getTime()) {
			classNames += "active";
		}
		
		return (
			<div className={classNames}> 
				<div className="dayMenu-header text-center">
					<h2>{displayDate(this.props.date)}</h2>
					<h2>{displayDay(this.props.date)}</h2>
					<Form className="add-meal form-group">
						<Form.Control 
						type="text" 
						className="add-meal" 
						placeholder="Add Meal" 
						onChange={this.handleChange} 
						value={this.state.mealValue} 
						onKeyDown={this.handleKeyDown} />
						<Button variant="primary" onClick={this.handleSubmit}>+</Button>
					</Form>
				</div>
				<div className="meals-container">
				{menusToDisplay} 
				</div>
			</div>
			)
	}
}

export default DayMenu;
