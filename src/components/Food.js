import React from "react"

class Food extends React.Component{
	render() {
		let foods = this.props.foodinfo.food;
		let day = this.props.foodinfo.day
		foods = foods.map(food => (<li className="food-item"><p>{food}</p> <button className="btn btn-danger delete-food"> &#x1F7A9; </button></li>));
		return (
				<div className="container-fluid single-day-food">
					<h3 className="day"> {day} </h3>
					<hr/>
					<ul>
					{foods}
					</ul>
					<button className="btn btn-primary float-right add-food"> + </button>
				</div>
			)
	}
}

export default Food