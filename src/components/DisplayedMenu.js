import React from "react"
import Jumbotron from "react-bootstrap/Jumbotron"
import Header from "./Header"
import {getCurrentWeek} from "../utils/helpers"
import uuid from "uuid"
import DayMenu from './DayMenu'
import axios from "axios";

class DisplayedMenu extends React.Component {
	constructor(props) {
		super(props);
		let {startDate, endDate} = getCurrentWeek();
		this.state = {
		startDate: startDate,
    endDate: endDate,
		overallMenu: []
    }
  }
  
  componentDidMount() {
    axios.get("http://localhost:5000/api")
    .then(res => {
      let data = res.data;
      data.forEach(date => {
        date.date = new Date(date.date);
      })
      this.setState({
        overallMenu: data
      });
    }).catch(err => {
      console.log("ERROROER", err);
    });
  }

	changeStartDate = (time) => {
    this.setState({
    	startDate: new Date(time)
		});
	}

	changeEndDate = (time) => {
	this.setState({
		endDate: new Date(time)
		});
	}

	deleteFood = (food, menuType, mealType, date, key) => {
    let overallMenuCopy = [...this.state.overallMenu];
    overallMenuCopy.forEach(day => {
      if (day.date === date) {
        day.menu.forEach(meal => {
          if (meal.mealType === mealType) {
            meal.menuList.forEach( subMenu => {
              if (subMenu.subMenuType === menuType) {
                subMenu.menuList = subMenu.menuList.filter(item => {
                  return item !== food
                });
              }
            });
          };
          return meal;
        });
      }
      return day;
    });

    console.log(key);

    // this.setState({
    //   overallMenu: overallMenuCopy
    // });
  };

  addFood = (food, menuType, mealType, date) => {
    if (food) { // only add if not empty

      let overallMenuCopy = [...this.state.overallMenu];
      overallMenuCopy.forEach(day => {
        if (day.date === date) {
          day.menu.forEach(meal => {
            if (meal.mealType === mealType) {
              meal.menuList.forEach( subMenu => {
                if (subMenu.subMenuType === menuType) {
                  subMenu.menuList.push(food);
                }
              });
            };
            return meal;
          });
        }
        return day;
      });

      this.setState({
        overallMenu: overallMenuCopy
      });
    }
  };

  deleteMenu = (menuType, mealType, date) => {
    let overallMenuCopy = [...this.state.overallMenu];
      overallMenuCopy.forEach(day => {
        if (day.date === date) {
          day.menu.forEach(meal => {
            if (meal.mealType === mealType) {
              meal.menuList = meal.menuList.filter(subMenu => subMenu.subMenuType !== menuType);
            };
            return meal;
          });
        }
        return day;
      });

      this.setState({
        overallMenu: overallMenuCopy
      });
  }

  addMeal = (meal, date) => {
    let found = false;
    let overallMenuCopy = [...this.state.overallMenu];
    overallMenuCopy.forEach(day => { // Append the menu to the day if it exists
        if (day.date === date) {
          found = true;
          day.menu.push({
            mealType: meal,
            menuList: [],
          });
        }
        return day
      });

    if (!found) {
      overallMenuCopy.push({
        date: date,
        id: uuid.v4(),
        menu: [{
          mealType: meal,
          menuList: []
        }]
      });
    };

    this.setState({
      overallMenu: overallMenuCopy,
    });
  }

 addMenu = (menuToAdd, mealType, date) => {
  console.log(menuToAdd, mealType, date);
  if (menuToAdd.length > 0){
    let overallMenuCopy = [...this.state.overallMenu];
    overallMenuCopy.forEach(day => { // Append the menu to the day if it exists
        if (day.date === date) {
          day.menu.forEach(menu => {
            if (menu.mealType === mealType) {
              menu.menuList.push({
                "subMenuType": menuToAdd,
                "menuList": []
              });
            }
            return menu;
          })
        }
        return day;
      });

    this.setState({
      overallMenu: overallMenuCopy,
    });
  }
    
  }

  deleteMeal = (mealType, date) => {
    let overallMenuCopy = [...this.state.overallMenu];
      overallMenuCopy.forEach(day => {
        if (day.date === date) {
          day.menu = day.menu.filter(item => item.mealType !== mealType);
        }
        return day;
      });

      this.setState({
        overallMenu: overallMenuCopy
      });
  }



  render(){
    let { startDate, endDate, overallMenu } = this.state;

    // let overallMenus = this.state.overallMenu
    // .filter(menu => menu.date >= startDate && menu.date <= endDate)
    // .map(day => (<DayMenu menuOfTheDay={day} key={day.id} deleteFood={this.deleteFood} addFood={this.addFood}/>));

    let displayedMenus = [];
    let dateRange = [];

    for (let d = new Date(startDate); d<=endDate; d.setDate(d.getDate() + 1)) { // PASS BY REFERENCE, CREATE A NEW COPY FIRST
      dateRange.push(new Date(d));
    }

    for (let i=0;i< dateRange.length; i++) {
      let found = false;
      for (let j=0; j<overallMenu.length; j++) {
        const currentMenuDate = new Date(overallMenu[j].date);
        if (currentMenuDate.getTime() === dateRange[i].getTime()) {
          displayedMenus.push(overallMenu[j]);
          found = true;
          break;
        } 
      }

      if (!found) {
        displayedMenus.push({"date": new Date(dateRange[i]), "id": uuid.v4(), "menu":[]});
      }
    }

    displayedMenus = displayedMenus.map(day => (
      <DayMenu 
      date={day.date}
      menuOfTheDay={day.menu} 
      key={day._id} 
      deleteFood={this.deleteFood} 
      addFood={this.addFood} 
      deleteMenu={this.deleteMenu}
      addMenu={this.addMenu}
      addMeal={this.addMeal}
      deleteMeal={this.deleteMeal}/>
    ));

    return (
    	<div>
    	<Header startDate={this.state.startDate} endDate={this.state.endDate} changeStartDate={this.changeStartDate} changeEndDate={this.changeEndDate}/>
        <Jumbotron className="weekMenu-container">
          {displayedMenus}
        </Jumbotron>
        </div>
      )
  }
}

export default DisplayedMenu