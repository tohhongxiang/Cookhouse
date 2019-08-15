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

  handleClick = (e) => {
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    document.querySelector("#" + e.target.getAttribute("data-set-active")).classList.add("active");
  }

  render () {
    return (
      <HashRouter basename="/">
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Navbar.Brand className="brand"><Link to="/" onClick={this.handleClick} data-set-active="home">Cookhouse Menu</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto link-list">
              <Link to="/" onClick={this.handleClick} id="home" className="nav-link active" data-set-active="home">Home</Link>
              <Link to="/help" onClick={this.handleClick} id="help" className="nav-link" data-set-active="help">Help</Link>
              <Link to="/about" onClick={this.handleClick} id="about" className="nav-link" data-set-active="about">About</Link>
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
