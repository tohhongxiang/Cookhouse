import React from "react"
import Menu from "./Menu"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

class Meal extends React.Component {
	constructor(props) {
		super(props);
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
		this.props.addMenu(this.state.menuValue, this.props.mealType);
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
		console.log(this.props.mealType);
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
					<Button variant="link" size="lg" onClick={this.deleteMeal} className="deleteMeal">&#x274C;</Button>
				</div>
				{displayedMenuList}
				<Form className="add-menu-container form-group">
					<Form.Control type="text" className="add-menu" placeholder="Add Menu" onChange={this.handleChange} value={this.state.menuValue} onKeyDown={this.handleKeyDown} />
					<Button variant="primary" className="add-menu" onClick={this.handleSubmit}>+</Button>
				</Form>
			</div>
		)
	}
}



export default Meal