import React from 'react';
import './App.css';
import DayMenu from './components/DayMenu'
import Header from "./components/Header"
import uuid from "uuid"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      weekMenu: [ // overall array of menus of each day
      {
        "date": new Date(2019, 7, 5), // date object: new Date(year, month, day, hour, minutes, seconds)
        "id": uuid.v4(), // dont worry
        "menu": [ // array of objects
          {
            "menuType":"Muslim", // string
            "foodList": ["Muslim food 1", "Muslim food 2", "Muslim food 3"] // array of string
          }, 
          {
            "menuType":"Non-muslim",
            "foodList": ["Non-muslim food 1", "Non-muslim food 2", "Non-muslim food 3"]
          }, 
          {
            "menuType":"Vegetarian",
            "foodList": ["Vegetarian food 1", "Vegetarian food 2", "Vegetarian food 3"]
          }
        ]
      },
      {
        "date": new Date(2019, 7, 6), // year month day hour minutes seconds
        "id": uuid.v4(),
        "menu": [
          {
            "menuType":"Muslim",
            "foodList": ["Muslim food 1", "Muslim food 2", "Muslim food 3"]
          }, 
          {
            "menuType":"Non-muslim",
            "foodList": ["Non-muslim food 1", "Non-muslim food 2", "Non-muslim food 3"]
          }, 
          {
            "menuType":"Vegetarian",
            "foodList": ["Vegetarian food 1", "Vegetarian food 2", "Vegetarian food 3"]
          }
        ]
      },
      {
        "date": new Date(2019, 7, 7), // year month day hour minutes seconds
        "id": uuid.v4(),
        "menu": [
          {
            "menuType":"Muslim",
            "foodList": ["Muslim food 1", "Muslim food 2", "Muslim food 3"]
          }, 
          {
            "menuType":"Non-muslim",
            "foodList": ["Non-muslim food 1", "Non-muslim food 2", "Non-muslim food 3"]
          }, 
          {
            "menuType":"Vegetarian",
            "foodList": ["Vegetarian food 1", "Vegetarian food 2", "Vegetarian food 3"]
          }
        ]
      },
      {
        "date": new Date(2019, 7, 8), // year month day hour minutes seconds
        "id": uuid.v4(),
        "menu": [
          {
            "menuType":"Muslim",
            "foodList": ["Muslim food 1", "Muslim food 2", "Muslim food 3"]
          }, 
          {
            "menuType":"Non-muslim",
            "foodList": ["Non-muslim food 1", "Non-muslim food 2", "Non-muslim food 3"]
          }, 
          {
            "menuType":"Vegetarian",
            "foodList": ["Vegetarian food 1", "Vegetarian food 2", "Vegetarian food 3"]
          }
        ]
      },
      {
        "date": new Date(2019, 7, 9), // year month day hour minutes seconds
        "id": uuid.v4(),
        "menu": [
          {
            "menuType":"Muslim",
            "foodList": ["Muslim food 1", "Muslim food 2", "Muslim food 3"]
          }, 
          {
            "menuType":"Non-muslim",
            "foodList": ["Non-muslim food 1", "Non-muslim food 2", "Non-muslim food 3"]
          }, 
          {
            "menuType":"Vegetarian",
            "foodList": ["Vegetarian food 1", "Vegetarian food 2", "Vegetarian food 3"]
          }
        ]
      },

      ]
    }
  }

  deleteFood = (food, menuType, date) => {
    let weekMenuCopy = [...this.state.weekMenu];
    weekMenuCopy.forEach(day => {
      if (day.date === date) {
        day.menu.forEach(menu => {
          if (menu.menuType === menuType) {
            menu.foodList = menu.foodList.filter(item => {
              return item !== food;
            });
          };
          return menu;
        });
      }
      return day;
    });

    this.setState({
      weekMenu: weekMenuCopy
    });
  };

  addFood = (food, menuType, date) => {
    if (food) { // only add if not empty
      let weekMenuCopy = [...this.state.weekMenu];
      weekMenuCopy.forEach(day => {
        if (day.date === date) {
          day.menu.forEach(menu => {
            if (menu.menuType === menuType) {
              menu.foodList.push(food);
            };
            return menu;
          });
        }
        return day;
      });

      this.setState({
        weekMenu: weekMenuCopy
      });
    }
    
  };

  render(){
    let date = {
        day: new Date().getDay(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      }

    let weekMenus = this.state.weekMenu.map(day => (<DayMenu menuOfTheDay={day} key={day.id} deleteFood={this.deleteFood} addFood={this.addFood}/>));

    return (
      <React.Fragment>
        <Header date={date}/>
        <div className="jumbotron week-menu-container card-deck">
          {weekMenus}
        </div>
      </React.Fragment>
      )
  }
}




export default App;
