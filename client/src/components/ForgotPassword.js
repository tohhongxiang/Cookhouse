import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import axios from "axios";
import {withRouter} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            showSuccess: false,
            errorMessage: "",
            isLoading: false
        }
    }

    componentWillUnmount() {
        this.setState({
            email:"",
            showSuccess: false,
            isLoading: false,
            errorMessage: ""
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    postEmail = () => {
        const email = this.state.email;
        axios.post('/api/users/forgotpassword', {email}).then(res => {
            console.log(res.data);
            this.setState({
                email:""
            });
            this.setState({
                showSuccess: true,
                isLoading: false,
                errorMessage: null
            })
        }).catch(err => {
            this.setState({
                showSuccess: false,
                isLoading: false,
                errorMessage: err.response.data.error
            })
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
            errorMessage: null
        }, this.postEmail );
    }

    render() {
        return (
            <Container className="forgotPassword-page-container">
                <Jumbotron className="forgotPassword-form-container form-jumbotron">
                    <h1>Forgot Password?</h1>
                    <Form>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoComplete="on" type="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email}/>
                            <Form.Text>We will send an email to reset your password</Form.Text>
                        </Form.Group>
                        { this.state.showSuccess ? (
                                <Alert variant="success">Email successfully sent. Please check your email for further instructions to reset your password</Alert>
                            ): null }
                        { this.state.errorMessage ? (
                            <Alert variant="danger">{this.state.errorMessage}</Alert>
                        ): null }
                        { this.state.isLoading ? <p> Loading... </p> : null}
                        <div className="button-container">
                            <Button size="lg" variant="primary" type="submit" onClick={this.handleSubmit}>
                                Send Email
                            </Button>
                            <Button variant="danger" onClick={() => this.props.history.goBack()}> Back </Button>
                        </div>
                    </Form>
                    
                </Jumbotron>
            </Container>
        )
    }
   
}

export default withRouter(ForgotPassword);