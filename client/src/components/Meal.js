import React from "react"
import Menu from "./Menu"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export default class Meal extends React.Component {
	constructor(props) {
		super(props);
		this.textRef = React.createRef();
		this.state = {
			menuValue: "",
		}
	}

	handleChange = (e) => {
		this.setState({
			menuValue: e.target.value,
		});
	}

	handleSubmit = (e) => {
		if (this.state.menuValue.replace(/\s/g, '').length > 0) {
			this.props.addMenu(this.state.menuValue, this.props.mealType);
			this.textRef.current.placeholder = "Add Menu";
			this.textRef.current.classList.remove("invalid");
		} else {
			this.textRef.current.placeholder = "No empty values";
			this.textRef.current.classList.add("invalid");
		}
		
		this.setState({
			menuValue: "",
		});
		e.preventDefault();
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 13) { // IF ENTER IS PRESSED, SUBMIT
			this.handleSubmit(e);
		}
	}

	deleteFood = (food, menuType) => {
		this.props.deleteFood(food, menuType, this.props.mealType);
	}

	addFood = (food, menuType) => {
		this.props.addFood(food, menuType, this.props.mealType);
	}

	deleteMenu = (menuType) => {
		this.props.deleteMenu(menuType, this.props.mealType);
	}

	deleteMeal = () => {
		this.props.deleteMeal(this.props.mealType);
	}

	render() {
		let displayedMenuList;
		if (this.props.menuList.length > 0) {
			displayedMenuList = this.props.menuList.map(item => 
				<Menu key={item._id} menuType={item.subMenuType} foodList={item.menuList} deleteFood={this.deleteFood} addFood={this.addFood} deleteMenu={this.deleteMenu}/>);
		} else {
			displayedMenuList = <h5><i> No menu set </i></h5>;
		}

		return (
			<div className="meal-container">
				<div className="meal-container-header">
					<h3> {this.props.mealType} </h3>
					<Button variant="link" size="lg" onClick={this.deleteMeal} className="deleteMeal"><span role="img" aria-label="Close">&#x274C;</span></Button>
				</div>
				{displayedMenuList}
				<Form className="add-menu-container form-group">
					<Form.Control 
					type="text" 
					list="menu-choices"
					ref={this.textRef} 
					className="add-menu" 
					placeholder="Add Menu" 
					onChange={this.handleChange} 
					value={this.state.menuValue} 
					onKeyDown={this.handleKeyDown} />
					<datalist id="menu-choices">
							<option value="Muslim" />
							<option value="Non-Muslim" />
							<option value="Vegetarian" />
						</datalist>
					<Button variant="primary" className="add-menu" onClick={this.handleSubmit}>+</Button>
				</Form>
			</div>
		)
	}
}
