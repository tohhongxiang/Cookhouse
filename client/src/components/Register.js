import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            username: "",
            email: "",
            password: "",
            password_again: "",
            errors: null,
            success: false
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password_again } = this.state;
        if (password !== password_again) {
            document.querySelectorAll('input[type=password]').forEach(input => input.classList.add('is-invalid'));
            this.setState({
                errors: "Passwords do not match"
            });
        } else {
            axios.post('/api/users/register', {
                username,
                email,
                password
            }).then(res => { 
                // successful registration
                console.log(res.data);
                document.querySelectorAll('input').forEach(input => input.classList.remove('is-invalid'));
                document.querySelectorAll('input').forEach(input => input.classList.add('is-valid'));
                this.setState({
                    username: "",
                    email: "",
                    password: "",
                    password_again: "",
                    errors: null,
                    success: true
                });

                this.redirectTimeout = setTimeout(() => {
                    this.setState({success: false});
                    this.props.history.push('/login');
                }, 2000);
            }).catch(err => {
                // error occurred
                const errorMessage = err.response.data.error;
                const errorField = err.response.data.key;
                document.querySelectorAll('input').forEach(input => input.classList.remove('is-invalid'));
                if (errorField) {
                    document.querySelector(`#${errorField}`).classList.add('is-invalid');
                }
                console.log(errorMessage);
                this.setState({
                    errors: errorMessage
                });
            });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.redirectTimeout);
        this.setState({
            username: "",
            email: "",
            password: "",
            password_again: "",
            errors: null,
            success: false
        });
    }

    render() {
        return (
            <Container className="registration-page-container">
                <Jumbotron className="registration-form-container form-jumbotron">
                    <h1>Register</h1>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control autoComplete="on" type="text" placeholder="Enter username" onChange={this.handleChange} value={this.state.username}/>
                            <small className="text-muted">At least 6 characters</small>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoComplete="on" type="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email}/>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="on" type="password" placeholder="Enter password" onChange={this.handleChange} value={this.state.password}/>
                            <small className="text-muted">At least 6 characters</small>
                        </Form.Group>

                        <Form.Group controlId="password_again">
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="on" type="password" placeholder="Enter password again" onChange={this.handleChange} value={this.state.password_again}/>
                        </Form.Group>
                        {this.state.errors ? (<Alert variant='danger'>{this.state.errors}</Alert>) : null}
                        {this.state.success ? (<Alert variant='success'> Registered user successfully. You will be redirected momentarily... </Alert>) : null}
                        <Button size="lg" variant="primary" type="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                    
                </Jumbotron>
                <div className="login-text">
                    <p>Already a user? <Link to='/login'>Login</Link></p>
                </div>
            </Container>
        )
    }
};

export default Register;