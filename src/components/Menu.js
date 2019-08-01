import React from "react"
import FoodItem from "./FoodItem"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import uuid from "uuid"

class Menu extends React.Component{
	constructor(props){
		super(props);
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
		this.props.addFood(this.state.food, this.props.menuType);
		this.setState({
			food: ""
		});
		e.preventDefault();
	};

	deleteFood = (food) => { // deletes whatever entry corresponds to it
		this.props.deleteFood(food, this.props.menuType)
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
		let foodList = this.props.foodList.map(food => 
			<FoodItem food={food} key={uuid.v4()} deleteFood={this.deleteFood}/> // For each food item on the menu, render it
		);
		let menuType = this.props.menuType;

		return (
				<div className="menu-type-container">
					<div className="menu-type-header">
						<h5 className="menu-header"> {menuType} </h5> 
						<Button variant="link" className="delete-menu" onClick={this.deleteMenu}> &#x274C; </Button>
					</div>
						{foodList}
						<Form.Control type="text" onChange={this.handleChange} value={this.state.food} onKeyDown={this.handleKeyDown}/>
						<Button type="submit" variant="outline-secondary" className="add-food" onClick={this.handleSubmit}><strong> + </strong></Button>
				</div>
			)
			
	}
}

export default Menu