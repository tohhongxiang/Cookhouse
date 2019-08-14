import React from "react"
import Jumbotron from "react-bootstrap/Jumbotron"
import overallMenu from "../images/overallMenu.png"
import activeDay from "../images/activeDay.png"
import addMenu from "../images/addMenu.png"
import addFood from "../images/addFood.png"
import finishedMenu from "../images/finishedMenu.png"

export default function Help() {
	return (
			<Jumbotron className="helpContainer">
				<h1> Help section </h1>
				<p> Here are examples of sample data </p>
				<div className="helpImages">
					<Jumbotron className="helpItem" id="overallMenu">
						<img src={overallMenu} alt="Overall Finished Menu Example"/>
						<div className="helpText text-center">
							<h4>Overall Menu</h4>
							<p> Sample of how an entire day's menu looks like </p>
						</div>
					</Jumbotron>

					<Jumbotron className="helpItem">
						<img src={activeDay} alt="Active Day, Empty Menu Example"/>
						<div className="helpText">
							<h4>Add Meal</h4>
							<p> A thick black outline indicates this is today's menu <br/>
							Type into "Add meal" input to add a meal. Click the "+" button or press "Enter" to add.
							</p>
						</div>
					</Jumbotron>

					<Jumbotron className="helpItem">
						<img src={addMenu} alt="Adding Menu Example"/>
						<div className="helpText">
							<h4>Add Menu</h4>
							<p> 
							Click the "X" on the side of "Breakfast" to remove. <br />
							Type into "Add menu" input to add a menu. Click the "+" button next to "Add Menu" or press "Enter" to add.
							</p>
						</div>
					</Jumbotron>

					<Jumbotron className="helpItem">
						<img src={addFood} alt="Adding Food Item Example"/>
						<div className="helpText">
							<h4>Add Food</h4>
							<p> 
							Click the "X" on the side of "Non-muslim" to remove. <br />
							Type into "Add food" input to add a food item. Click the "+" button next to "Add Food" or press "Enter" to add.
							</p>
						</div>
					</Jumbotron>

					<Jumbotron className="helpItem">
						<img src={finishedMenu} alt="Finished Menu Example"/>
						<div className="helpText">
							<h4>Finish</h4>
							<p> 
							Add more items by typing into the appropriate inputs, or don't.
							</p>
						</div>
					</Jumbotron>
				</div>
			</Jumbotron>
		)
}