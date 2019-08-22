import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validToken: false,
            password:"",
            passwordAgain:"",
            showSuccess: false,
            errorMessage: null
        }
    }

    componentDidMount() {
        axios.get('/api/users/forgotpassword/'+this.props.match.params.token).then(res => {
            console.log(res.data);
            this.setState({
                validToken: true
            });
        }).catch(err => {
            const errorMessage = err.response.data.error;
            this.setState({
                validToken: false
            });
        });
    }

    componentWillUnmount() {
        this.setState({
            password:"",
            passwordAgain:"",
            errorMessage: null,
            showSuccess: false
        });
        clearTimeout(this.redirectTimeout);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.passwordAgain) {
            this.setState({
                errorMessage: "Passwords do not match"
            })
        } else {
            axios.post('/api/users/forgotpassword/'+this.props.match.params.token, {password: this.state.password}).then( res => {
                console.log(res.data);
                this.setState({
                    password:"",
                    passwordAgain:"",
                    errorMessage: null,
                    showSuccess: true
                });
                this.redirectTimeout = setTimeout(() => {
                    this.props.history.push('/login');
                }, 3000);
                
            }).catch(err => {
                const errorMessage = err.response.data.error;
                this.setState({
                    errorMessage
                });
            })
        }
        
    }

    render() {
        return (
            <Container className="forgotPassword-page-container">
                <Jumbotron className="forgotPassword-form-container form-jumbotron">
                    { this.state.validToken ? (
                        <>
                        <h1>Forgot Password?</h1>
                        <Form>
                            <Form.Group controlId="password">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control autoComplete="on" type="password" placeholder="Enter new password" onChange={this.handleChange} value={this.state.password}/>
                                <Form.Text>Your password needs to be at least 6 characters long</Form.Text>
                            </Form.Group>
    
                            <Form.Group controlId="passwordAgain">
                                <Form.Label>New Password Again</Form.Label>
                                <Form.Control autoComplete="on" type="password" placeholder="Enter new password again" onChange={this.handleChange} value={this.state.passwordAgain}/>
                            </Form.Group>
    
                            { this.state.showSuccess ? (
                                    <Alert variant="success">Password successfully reset. You will be redirected momentarily...</Alert>
                                ): null }
                                { this.state.errorMessage ? (
                                    <Alert variant="danger">{this.state.errorMessage}</Alert>
                                ): null }
                            <div className="button-container">
                                <Button size="lg" variant="primary" type="submit" onClick={this.handleSubmit} disabled={this.state.showSuccess}>
                                    Reset Password
                                </Button>
                            </div>
                        </Form>
                        </>
                    ): <Alert variant="danger"> Invalid/expired link </Alert> }
                    
                    
                    
                </Jumbotron>
            </Container>
        )
    }
   
}

export default ResetPassword;