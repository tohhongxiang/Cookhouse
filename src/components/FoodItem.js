import React from "react"
import Button from "react-bootstrap/Button"

class FoodItem extends React.Component {
	deleteFood = (e) => {
		this.props.deleteFood(this.props.food);
	};

	render() {
		return (
				<React.Fragment>
					<p className="food-item">{this.props.food}</p>
					<Button variant="link" className="delete-food" onClick={this.deleteFood}> &#x00D7; </Button>
				</React.Fragment>
			)
	}
}

export default FoodItem