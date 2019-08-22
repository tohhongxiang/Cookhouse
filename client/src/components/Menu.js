import React from "react"
import FoodItem from "./FoodItem"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import uuid from "uuid"

class Menu extends React.Component{
	constructor(props){
		super(props);
		this.textRef = React.createRef();
		this.state = {
			food: ""
		};
	}

	handleChange = (e) => { // everytime user types into text input, update state to be current value
		this.setState({
			food: e.target.value,
		});
	};

	handleSubmit = (e) => { // passes the value of the text up all the way to main component, and resets state
		if (this.state.food.replace(/\s/g, '').length > 0) {
			this.props.addFood(this.state.food, this.props.menuType);
			this.textRef.current.placeholder = "Add Food";
			this.textRef.current.classList.remove("is-invalid");
		} else {
			this.textRef.current.placeholder = "No empty values";
			this.textRef.current.classList.add("is-invalid");
		}
		
		this.setState({
			food: ""
		});
		e.preventDefault();
	};

	deleteFood = (food) => { // deletes whatever entry corresponds to it
		this.props.deleteFood(food, this.props.menuType);
	};

	handleKeyDown = (e) => {
		if (e.keyCode === 13) { // IF ENTER IS PRESSED, SUBMIT
			this.handleSubmit(e);
		}
	}

	deleteMenu = (e) => {
		this.props.deleteMenu(this.props.menuType);
	}

	render() {
		let foodList;
		if (this.props.foodList.length > 0) {
			foodList = this.props.foodList.map(food => 
				<FoodItem food={food} key={uuid.v4()} deleteFood={this.deleteFood}/> // For each food item on the menu, render it
			);
		} else {
			foodList = <p><i>No food items set</i></p>;
		}
		
		let menuType = this.props.menuType;

		return (
				<div className="menu-container">
					<div className="menu-header">
						<h5> {menuType} </h5> 
						<Button variant="link" className="delete-menu" onClick={this.deleteMenu}><strong><span role="button"> &#x00D7; </span></strong></Button>
					</div>
						{foodList}
						<Form className="add-food home-form-group">
							<Form.Control type="text" ref={this.textRef} onChange={this.handleChange} value={this.state.food} onKeyDown={this.handleKeyDown} placeholder="Add Food"/>
							<Button type="submit" variant="outline-secondary" className="add-food" onClick={this.handleSubmit}><strong> + </strong></Button>
						</Form>
				</div>
			)
			
	}
}

export default Menu