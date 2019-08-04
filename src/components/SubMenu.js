import React from "react"
import Menu from "./Menu"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

class SubMenu extends React.Component {
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
		let menuList = this.props.menuList.map(item => {
			return <Menu menuType={item.subMenuType} foodList={item.menuList} deleteFood={this.deleteFood} addFood={this.addFood} deleteMenu={this.deleteMenu}/>;
		});
		return (
			<div className="meal-container">
				<div className="meal-container-header">
					<h3> {this.props.mealType} </h3>
					<Button variant="link" size="lg" onClick={this.deleteMeal} className="deleteMeal">&#x274C;</Button>
				</div>
				{menuList}
				<Form className="add-menu-container form-group">
					<Form.Control type="text" className="add-menu" placeholder="Add Menu" onChange={this.handleChange} value={this.state.menuValue} onKeyDown={this.handleKeyDown} />
					<Button variant="primary" className="add-menu" onClick={this.handleSubmit}>+</Button>
				</Form>
			</div>
		)
	}
}

export default SubMenu