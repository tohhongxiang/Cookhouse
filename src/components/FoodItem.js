import React from "react"


class FoodItem extends React.Component {
	deleteFood = (e) => {
		this.props.deleteFood(this.props.food);
	};

	render() {
		return (
				<React.Fragment>
					<p className="food-item">{this.props.food}</p>
					<button className="btn" onClick={this.deleteFood}> &#x274C; </button>
				</React.Fragment>
			)
	}
}

export default FoodItem