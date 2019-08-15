import React from 'react';
import Meal from "./Meal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { displayDate, displayDay, getTodayDate } from "../utils/helpers";

export default class DayMeal extends React.Component {
	constructor(props) {
		super(props);
		this.textRef = React.createRef();
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
		if (this.state.mealValue.replace(/\s/g, '').length > 0){
			this.props.addMeal(this.state.mealValue, this.props.date);
			this.textRef.current.placeholder = "Add Meal";
			this.textRef.current.classList.remove("invalid");
			} else {
				this.textRef.current.placeholder = "No empty values";
				this.textRef.current.classList.add("invalid");
			}
			// this.props.addMeal(this.state.mealValue, this.props.date);
		this.setState({
			mealValue: "",
		});
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
		let menusToDisplay;
		if (this.props.menuOfTheDay.length > 0) {
			menusToDisplay = this.props.menuOfTheDay.map(menu => 
			<Meal
			key={menu._id} 
			mealType={menu.mealType} 
			menuList={menu.menuList} 
			deleteFood={this.deleteFood} 
			addFood={this.addFood} 
			deleteMenu={this.deleteMenu} 
			addMeal={this.addMeal} 
			deleteMeal={this.deleteMeal} 
			addMenu={this.addMenu}/>
		);
		} else {
			menusToDisplay = <h4 className="text-center"><i> No meal set </i></h4>;
		}

		let classNames = "dayMeal-container ";
		if (getTodayDate().getTime() === this.props.date.getTime()) {
			classNames += "active";
		}
		
		return (
			<div className={classNames}> 
				<div className="dayMeal-header text-center">
					<h2>{displayDate(this.props.date)}</h2>
					<h2>{displayDay(this.props.date)}</h2>
					<Form className="add-meal form-group">
						<Form.Control 
						key={this.props.date}
						ref={this.textRef}
						type="text" 
						list="meal-choices"
						className="add-meal" 
						name="add-meal"
						id="add-meal"
						placeholder="Add Meal" 
						autoComplete="off"
						onChange={this.handleChange} 
						value={this.state.mealValue} 
						onKeyDown={this.handleKeyDown} />
						<datalist id="meal-choices">
							<option value="Breakfast" />
							<option value="Lunch" />
							<option value="Dinner" />
						</datalist>
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

