import React from 'react';
import './App.css';
import Logout from './components/Logout';
import Footer from "./components/Footer";
import About from "./components/About";
import Help from "./components/Help";
import Login from "./components/Login";
import EditUser from './components/EditUser';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import NotFoundPage from "./components/NotFoundPage";
import DisplayedMeal from "./components/DisplayedMeal";
import { Route, HashRouter, NavLink, Link, Switch } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Register from './components/Register';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      errors: null,
      errorFields: null,
      success: false
    }
  }

  componentDidMount() {
    const headers = {
      'auth-token': localStorage.getItem('jwt-token')
    };

    axios.get('/api/users/getuser', {headers})
    .then(res => {
      const {username} = res.data;
      this.setState({
        username
      });
    });
  }

  loginUser = (username, password) => {
    axios.post('/api/users/login', {
        username,
        password
    }).then(res => {
        // successful login
        this.setState({
          username
        });
        localStorage.setItem('jwt-token', res.data.token);
        // console.log(res.data);
        this.setState({
            success: true,
            errors: null,
            errorFields: null
        });  
    }).catch(err => {
        // failed login
        this.setState({
            errors: err.response.data.error
        });
    });
  }

  updateUser = (username, email, oldPassword, newPassword, newPasswordAgain) => {
    if (newPassword !== newPasswordAgain) {
      this.setState({
          errors: "New passwords do not match",
          errorFields: "newPassword"
      });
  } else {
      const payload = {
          username,
          email,
          oldPassword,
          newPassword
      };

      const headers = {
          "auth-token": localStorage.getItem('jwt-token')
      };
      axios.post('/api/users/edituser', payload, {headers}).then(res => {
          // console.log(res.data);
          this.setState({
            success: true,
            username,
            errors: null,
            errorFields: null
          });
          localStorage.setItem('jwt-token', res.data.token);
      }).catch(err => {
          this.setState({
          errors: err.response.data.error,
          errorFields: err.response.data.key
          });
      });
  }
  }

  logout = (e) => {
    localStorage.removeItem('jwt-token');
    this.setState({
      username: null,
      success: false,
      errorFields: null,
      errors: null
    });
  }

  // needed this because on successful user update/login, success is true
  // on clicking on the edit user page, if success true, user will be redirected
  resetSuccess = (e) => { 
    this.setState({
      success: false,
      errors: null,
      errorFields: null
    })
  }

  render () {
    return (
      <HashRouter basename="/">
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Navbar.Brand className="brand"><Link to="/">Cookhouse Menu</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto link-list">
              <NavLink to="/" exact id="home" className="nav-link">Home</NavLink>
              <NavLink to="/help" id="help" className="nav-link">Help</NavLink>
              <NavLink to="/about" id="about" className="nav-link">About</NavLink>
              { !this.state.username ? (
                <NavLink to="/login" className="nav-link"> Sign in </NavLink>
              ) : (
                <NavDropdown title={this.state.username} alignRight id="nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/edituser" onClick={this.resetSuccess}>Edit User</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/logout" onClick={this.logout}>Log out</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/" exact component={DisplayedMeal} />
          <Route path="/about" component={About} />
          <Route path="/help" component={Help} />
          <Route path="/register" component={Register} />
          <Route path="/login" render={() => <Login loginUser={this.loginUser} errors={this.state.errors} success={this.state.success}/>} />
          <Route path="/logout" component={Logout} />
          <Route path="/edituser" render={() => <EditUser updateUser={this.updateUser} errors={this.state.errors} errorFields={this.state.errorFields} success={this.state.success} />} />
          <Route path="/forgotpassword" exact component={ForgotPassword} />} />
          <Route path="/forgotpassword/:token" component={ResetPassword} />
          <Route path="*" component={NotFoundPage} /> 
        </Switch>
        <Footer />
      </HashRouter>
      )
  }
}




export default App;
