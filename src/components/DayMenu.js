import React from 'react';
import Menu from "./Menu";
import { displayDate } from "../utils/helpers";

class DayMenu extends React.Component {
	deleteFood = (food, menuType) => {
		this.props.deleteFood(food, menuType, this.props.menuOfTheDay.date);
	};

	addFood = (food, menuType) => {
		this.props.addFood(food, menuType, this.props.menuOfTheDay.date);
	};

	render(){
		let menuOfTheDay = this.props.menuOfTheDay; // each day has 1 container
		let menus = menuOfTheDay.menu.map(menuType => 
			<Menu foodList={menuType.foodList} 
			menuType={menuType.menuType} 
			key={menuType.menuType} 
			deleteFood={this.deleteFood} 
			addFood={this.addFood}/>
			);

	return (
		<div className="menu-container card">
			<h2 className="menu-date">{displayDate(menuOfTheDay.date)}</h2>
			<hr/>
			{menus}
		</div>
	  )
	}
}

export default DayMenu;
