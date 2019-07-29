import React from 'react';
import Food from "./Food"

class FoodList extends React.Component {
	constructor(props){
    	super(props);
  	}

  render(){
  	let foods = this.props.foods; // each day got 1 container
    return (
          this.props.foods.map(food => (
          	<Food foodinfo={food}/>
          ))
      )
  }
}

export default FoodList;
