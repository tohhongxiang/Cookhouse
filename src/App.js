import React from 'react';
import './App.css';
import FoodList from './components/FoodList'
import Food from "./components/Food"
import Header from "./components/Header"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      foods: [{
        "day": "01/09/2019",
        "id": 1,
        "food": ["delectus aut autem", "lorem ipsum", "double chocolate ice cream"]
      },{
        "day": "02/09/2019",
        "id": 1,
        "food": ["the second type of food", "more food description", "lol cookhouse food"]
      },
      {
        "day": "03/09/2019",
        "id": 1,
        "food": ["the second type of food", "more food description", "lol cookhouse food"]
      },
      {
        "day": "04/09/2019",
        "id": 1,
        "food": ["the second type of food", "more food description", "lol cookhouse food"]
      },
      {
        "day": "05/09/2019",
        "id": 1,
        "food": ["the second type of food", "more food description", "lol cookhouse food"]
      }
      ]
        
      }
    }

  render(){
    let date = {
        day: new Date().getDay(),
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      }
    return (
      <React.Fragment>
        <Header date={date}/>
        <div className="jumbotron food-container">
          <FoodList foods={this.state.foods}/>
        </div>
      </React.Fragment>
      )
  }
}

function getPreviousMonday()
{
    var date = new Date();
    var day = date.getDay();
    var prevMonday;
    if(date.getDay() == 0){
        prevMonday = new Date().setDate(date.getDate() - 7);
    }
    else{
        prevMonday = new Date().setDate(date.getDate() - day);
    }

    return prevMonday;
}

export default App;
