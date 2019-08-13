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
    this.fetchData();
  }

  fetchData = async () => {
    // THIS CANNOT BE PUT IN COMPONENTDIDUPDATE
    // if component updates, then fetch, then sets state again. 
    // setting state causes rerender infinite loop
    // very difficult in this case to put a shouldComponentUpdate
    // because sometimes only the object within the object changes
    // and deep copying the object hurts performance
  
    axios.get("/api", {
      params: {
        startDate: this.state.startDate.toISOString(),
        endDate: this.state.endDate.toISOString()
      } 
      // params for a get request is in the request.query
      // params for post request is in request.body
      // req.params is for the url variables
    })
    .then(res => {
      let data = res.data;
      data.forEach(date => {
        date.date = new Date(date.date);
      })
      this.setState({
        overallMenu: data
      });
    }).catch(err => {
      console.log("ERROR: ", err);
    });
  }

	changeStartDate = (time) => {
    this.setState({
    	startDate: new Date(time)
    }, () => {
      this.fetchData();
    });
    // either that or 
    // this.setState({...}).then(()=>{...}) 
    // since setState is an async function

    // if we fetch data outside (without .then or callback)
    // fetchdata will use the previous un-updated state
    // because the state has not updated yet
	}

	changeEndDate = (time) => {
    this.setState({
      endDate: new Date(time)
      }, () => {
        this.fetchData();
      });
  }
  
  addFood = (food, menuType, mealType, date) => {
    if (food) { // only add if not empty
      let currentUpdatedMenu = this.state.overallMenu.find(item => item.date === date);
      
      currentUpdatedMenu.menu.forEach(meal => {
        if (meal.mealType === mealType) {
          meal.menuList.forEach( subMenu => {
            if (subMenu.subMenuType === menuType) {
              subMenu.menuList.push(food);
            }
          });
        };
        return meal;
      });
        
      const isoDate_ = new Date(date).toISOString();
      axios.post('/api/' + isoDate_, currentUpdatedMenu)
      .then(res => {
        console.log(res.data);
        this.fetchData();
      });
    }
  };

	deleteFood = (food, menuType, mealType, date) => {
    let currentUpdatedMenu = this.state.overallMenu.find(item => item.date === date);
    currentUpdatedMenu.menu.forEach(meal => {
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

    const isoDate_ = new Date(date).toISOString();
    axios.post('/api/' + isoDate_, currentUpdatedMenu)
    .then(res => {
      console.log(res.data);
      this.fetchData();
    });
  };

  addMenu = (menuToAdd, mealType, date) => {
    console.log(menuToAdd, mealType, date);
    if (menuToAdd.length > 0) { // only add if not empty
      let currentUpdatedMenu = this.state.overallMenu.find(item => item.date === date);
      currentUpdatedMenu.menu.forEach(menu => {
        if (menu.mealType === mealType) {
          menu.menuList.push({
            subMenuType: menuToAdd,
            menuList: []
          });
        }
        return menu
      });  
  
      console.log(currentUpdatedMenu);
      const isoDate_ = new Date(date).toISOString();
      axios.post('/api/' + isoDate_, currentUpdatedMenu)
      .then(res => {
        console.log(res.data);
        this.fetchData();
      });
    }
    }

  deleteMenu = (menuToDelete, mealType, date) => {
    let currentUpdatedMenu = this.state.overallMenu.find(item => item.date === date);
    currentUpdatedMenu.menu.forEach(menu => {
      if (menu.mealType === mealType) {
        menu.menuList = menu.menuList.filter(menu => menu.subMenuType !== menuToDelete);
      }
      return menu
    });  

    const isoDate_ = new Date(date).toISOString();
    axios.post('/api/' + isoDate_, currentUpdatedMenu)
    .then(res => {
      console.log(res.data);
      this.fetchData();
    });
  
  }

  addMeal = (meal, date, elementToFocus) => {
    // If the entire day doesnt exist, we need to add an entire entry
    // If day exists, we need to modify the specific entry
    let currentUpdatedMenu = this.state.overallMenu.find(item => item.date === date);
    if (currentUpdatedMenu) {
      currentUpdatedMenu.menu.push({
        mealType: meal,
        menuList: []
      });
      const isoDate_ = new Date(date).toISOString();
      axios.post('/api/' + isoDate_, currentUpdatedMenu)
      .then(res => {
        console.log(res.data);
        this.fetchData();
      });
    } else {
      currentUpdatedMenu = {
        date,
        menu: [
          {
            mealType: meal,
            menuList: []
          }
        ]
      };
      axios.post('/api/', currentUpdatedMenu)
      .then(res => {
        console.log(res.data);
        this.fetchData().then(() => {
          elementToFocus.focus();
        });
      });
    }
  }

  deleteMeal = (mealType, date) => {
    let currentUpdatedMenu = this.state.overallMenu.find(item => item.date === date);
    currentUpdatedMenu.menu = currentUpdatedMenu.menu.filter(menu => menu.mealType !== mealType);

    const isoDate_ = new Date(date).toISOString();
    if (currentUpdatedMenu.menu.length > 0) {
      axios.post('/api/' + isoDate_, currentUpdatedMenu)
      .then(res => {
        console.log(res.data);
        this.fetchData();
      });
    } else {
      axios.delete('/api/' + isoDate_)
      .then(res => {
        console.log(res.data);
        this.fetchData();
      });
    }
      
  }

  render(){
    let { startDate, endDate, overallMenu } = this.state;
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
        displayedMenus.push({"date": new Date(dateRange[i]), "menu":[]});
      }
    }

    displayedMenus = displayedMenus.map(day => (
      <DayMenu 
      date={day.date}
      menuOfTheDay={day.menu} 
      key={day.date}
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