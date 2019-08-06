import React from 'react';
import './App.css';
import Footer from "./components/Footer"
import About from "./components/About"
import Nav_ from "./components/Nav"
import Help from "./components/Help"
import DisplayedMenu from "./components/DisplayedMenu"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     
    }
  }

  render () {
    return (
      <Router>
        <Nav_ />
        <Route path="/" exact render={(props) => <DisplayedMenu/>} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Footer />
      </Router>
      )
  }
}




export default App;
