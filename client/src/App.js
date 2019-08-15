import React from 'react';
import './App.css';
import Footer from "./components/Footer"
import About from "./components/About"
import Help from "./components/Help"
import DisplayedMeal from "./components/DisplayedMeal"
import { Route, HashRouter, Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     
    }
  }

  render () {
    return (
      <HashRouter basename="/">
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Navbar.Brand className="brand"><Link to="/">Cookhouse Menu</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto link-list">
              <Link to="/">Home</Link>
              <Link to="/help">Help</Link>
              <Link to="/about">About</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route path="/" exact render={(props) => <DisplayedMeal/>} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Footer />
      </HashRouter>
      )
  }
}




export default App;
