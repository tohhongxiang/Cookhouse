import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            username: "",
            password: ""
        });
    }

    componentDidUpdate(){
        if (this.props.success) {
            this.redirectTimeout = setTimeout(() => {
                this.props.history.push('/');
            }, 2000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.redirectTimeout);
        this.setState({
            username: "",
            password: ""
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.loginUser(username, password);
    }

    render() {
        return (
            <Container className="login-page-container">
            <Jumbotron className="login-form-container form-jumbotron">
                <h1>Login</h1>
                <Form autoComplete="on">
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control autoComplete="on" type="text" placeholder="Enter username" onChange={this.handleChange} value={this.state.username}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control autoComplete="on" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
                        <Form.Text className="text-muted"><Link to="/forgotpassword">Forgot Password?</Link></Form.Text>
                    </Form.Group>
                    
                    {this.props.errors ? (<Alert variant='danger'>{this.props.errors}</Alert>) : null}
                    {this.props.success ? (<Alert variant='success'> Logged in successfully. You will be redirected momentarily... </Alert>) : null}
                    <Button size="lg" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Login
                    </Button>
                </Form>
            </Jumbotron>
            <div className='register-text'>
                <p>Not registered? <Link to='/register'>Register</Link></p>
            </div>
            </Container>
        )
    }
};

export default withRouter(Login);