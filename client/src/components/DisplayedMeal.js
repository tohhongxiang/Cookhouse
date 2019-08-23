import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Header from "./Header";
import {getCurrentWeek} from "../utils/helpers";
import DayMeal from './DayMeal';
import axios from "axios";
import Alert from "react-bootstrap/Alert";

class DisplayedMeal extends React.Component {
	constructor(props) {
    super(props);
		let {startDate, endDate} = getCurrentWeek();
		this.state = {
      errors:null,
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
  
    axios.get("/api/menus", {
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
        overallMenu: data,
        errors: null
      });
    }).catch(err => {
      this.handleErrors(err);
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

  handleErrors = (err) => {
    const statusCode = err.response.status;
    let errorMessage;

    if (statusCode === 400 || statusCode === 401) {
      errorMessage = `Please login to continue. Status code: ${statusCode}`;
    } else {
      errorMessage = err.response.data.error;
    }

    this.setState({
      errors: errorMessage
    });
  }
  
  addFood = (food, menuType, mealType, date) => {
    if (this.props.deactivated) {
      return this.handleErrors({response: {status: 400, errorMessage: "Please log in to continue"}})
    } 

    const headers = {
      "auth-token": localStorage.getItem('jwt-token')
    }

    if (food) { // only add if not empty
      let currentUpdatedMenu = {...this.state.overallMenu.find(item => item.date === date)};
      
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
      axios.post('/api/menus/' + isoDate_, currentUpdatedMenu, {headers})
      .then(res => {
        console.log(res.data);
        this.setState({
          errors: null
        });
        this.fetchData();
      })
      .catch(err => this.handleErrors(err));
    }
  
    
  };

	deleteFood = (food, menuType, mealType, date) => {
    if (this.props.deactivated) {
      return this.handleErrors({response: {status: 400, errorMessage: "Please log in to continue"}})
    } 

    const headers = {
      "auth-token": localStorage.getItem('jwt-token')
    }

    let currentUpdatedMenu = {...this.state.overallMenu.find(item => item.date === date)};
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
    axios.post('/api/menus/' + isoDate_, currentUpdatedMenu, {headers})
    .then(res => {
      console.log(res.data);
      this.setState({
        errors: null
      });
      this.fetchData();
    }).catch(err => this.handleErrors(err));
    
    
  };

  addMenu = (menuToAdd, mealType, date) => {
    console.log(this.props.deactivated);
    if (this.props.deactivated) {
      return this.handleErrors({response: {status: 400, errorMessage: "Please log in to continue"}})
    } 

    const headers = {
      "auth-token": localStorage.getItem('jwt-token')
    }

    if (menuToAdd.length > 0) { // only add if not empty
      let currentUpdatedMenu = {...this.state.overallMenu.find(item => item.date === date)};
      currentUpdatedMenu.menu.forEach(menu => {
        if (menu.mealType === mealType) {
          menu.menuList.push({
            subMenuType: menuToAdd,
            menuList: []
          });
        }
        return menu
      });  
  
      const isoDate_ = new Date(date).toISOString();
      axios.post('/api/menus/' + isoDate_, currentUpdatedMenu, {headers})
      .then(res => {
        console.log(res.data);
        this.setState({
          errors: null
        });
        this.fetchData();
      }).catch(err => this.handleErrors(err));
    }
    
  }

  deleteMenu = (menuToDelete, mealType, date) => {
    if (this.props.deactivated) {
      return this.handleErrors({response: {status: 400, errorMessage: "Please log in to continue"}})
    }

    const headers = {
      "auth-token": localStorage.getItem('jwt-token')
    }

    let currentUpdatedMenu = {...this.state.overallMenu.find(item => item.date === date)};
    currentUpdatedMenu.menu.forEach(menu => {
      if (menu.mealType === mealType) {
        menu.menuList = menu.menuList.filter(menu => menu.subMenuType !== menuToDelete);
      }
      return menu
    });  

    const isoDate_ = new Date(date).toISOString();
    axios.post('/api/menus/' + isoDate_, currentUpdatedMenu, {headers})
    .then(res => {
      console.log(res.data);
      this.setState({
        errors: null
      });
      this.fetchData();
    }).catch(err => this.handleErrors(err));
  
  }

  addMeal = (meal, date) => {
    if (this.props.deactivated) {
      return this.handleErrors({response: {status: 400, errorMessage: "Please log in to continue"}})
    }

    const headers = {
      "auth-token": localStorage.getItem('jwt-token')
    }

    // If the entire day doesnt exist, we need to add an entire entry
    // If day exists, we need to modify the specific entry
    let currentUpdatedMenu = {...this.state.overallMenu.find(item => item.date === date)};
    if (currentUpdatedMenu.hasOwnProperty('menu')) {
      currentUpdatedMenu.menu.push({
        mealType: meal,
        menuList: []
      });
      const isoDate_ = new Date(date).toISOString();
      axios.post('/api/menus/' + isoDate_, currentUpdatedMenu, {headers})
      .then(res => {
        console.log(res.data);
        this.setState({
          errors: null
        });
        this.fetchData();
      }).catch(err => this.handleErrors(err));
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
      axios.post('/api/menus/', currentUpdatedMenu, {headers})
      .then(res => {
        console.log(res.data);
        this.setState({
          errors: null
        });
        this.fetchData();
      }).catch(err => this.handleErrors(err));
    }
  }

  deleteMeal = (mealType, date) => {
    if (this.props.deactivated) {
      return this.handleErrors({response: {status: 400, errorMessage: "Please log in to continue"}})
    }

    const headers = {
      "auth-token": localStorage.getItem('jwt-token')
    }

    let currentUpdatedMenu = {...this.state.overallMenu.find(item => item.date === date)};
    currentUpdatedMenu.menu = currentUpdatedMenu.menu.filter(menu => menu.mealType !== mealType);

    const isoDate_ = new Date(date).toISOString();
    if (currentUpdatedMenu.menu.length > 0) {
      axios.post('/api/menus/' + isoDate_, currentUpdatedMenu, {headers})
      .then(res => {
        console.log(res.data);
        this.setState({
          errors: null
        });
        this.fetchData();
      }).catch(err => this.handleErrors(err));
    } else {
      axios.delete('/api/menus/' + isoDate_, {headers})
      .then(res => {
        console.log(res.data);
        this.fetchData();
      }).catch(err => this.handleErrors(err));
    }
      
  }

  render(){
    let { startDate, endDate, overallMenu } = this.state;
    let displayedMeals = [];
    let dateRange = [];

    for (let d = new Date(startDate); d<=endDate; d.setDate(d.getDate() + 1)) { // PASS BY REFERENCE, CREATE A NEW COPY FIRST
      dateRange.push(new Date(d));
    }

    for (let i=0;i< dateRange.length; i++) {
      let found = false;
      for (let j=0; j<overallMenu.length; j++) {
        const currentMenuDate = new Date(overallMenu[j].date);
        if (currentMenuDate.getTime() === dateRange[i].getTime()) {
          displayedMeals.push(overallMenu[j]);
          found = true;
          break;
        } 
      }

      if (!found) {
        displayedMeals.push({"date": new Date(dateRange[i]), "menu":[]});
      }
    }

    displayedMeals = displayedMeals.map(day => (
      <DayMeal 
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
          {this.state.errors ? (
            <Alert variant="danger"> {this.state.errors} </Alert>
          ) : (
            null
          )}
          {displayedMeals}
        </Jumbotron>
        </div>
      )
  }
}

export default DisplayedMeal