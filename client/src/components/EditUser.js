import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { FaEdit, FaWindowClose } from 'react-icons/fa';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFields: false,
            username: "",
            email: "",
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: ""
        };
    }

    async componentDidMount() {

        const headers = {
            'auth-token': localStorage.getItem('jwt-token')
        }
        const res = await axios.get('/api/users/getuser', {headers});
        const {username, email} = res.data;
        this.setState({
            username, 
            email
        });
    }

    componentDidUpdate() {
        const errorFields = this.props.errorFields;
        document.querySelectorAll('input').forEach(input => input.classList.remove('is-invalid'));
        if (errorFields) {
            document.querySelectorAll(`input[id^=${errorFields}]`).forEach(item => item.classList.add('is-invalid'));
        }

        if (this.props.success) {
            document.querySelectorAll('input').forEach(input => {
                if (input.value) {
                    input.classList.add('is-valid');
                }
            });
            this.redirectTimeout = setTimeout(() => {
                this.props.history.push('/');
            }, 2000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.redirectTimeout);
        this.setState({
            username: "",
            email: "",
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: ""
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    enableFields = (e) => {
        const button = e.target;

        const toggleFields = document.querySelectorAll('.toggle-disable');
        toggleFields.forEach(item => {
            if (item.disabled) {
                item.disabled = false;
            } else {
                item.disabled = true;
            }
        })
        const hiddenFields = document.querySelectorAll('.hidden-fields');
        hiddenFields.forEach(field => {
            field.classList.toggle('hidden');
        });

        this.setState((prevState) => {
            return {showFields: !prevState.showFields}
        })
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {username, email, oldPassword, newPassword, newPasswordAgain} = this.state;
        this.props.updateUser(username, email, oldPassword, newPassword, newPasswordAgain);
    }

    render() {
        return (
            <Container className="edituser-page-container">
                <Jumbotron className="edituser-form-container form-jumbotron">
                    <div className="edit-user-header">
                        <h2>User Information</h2>
                        <Button variant='link' style={{color:"#444444"}} className="edit-user-button" onClick={this.enableFields}>{this.state.showFields ? <FaWindowClose /> : <FaEdit />}</Button>
                    </div>
                    
                    <Form autoComplete="on">
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control disabled autoComplete="on" className="toggle-disable" type="text" placeholder="Enter username" onChange={this.handleChange} value={this.state.username}/>
                            <div className="hidden-fields hidden">
                                <small className="text-muted">At least 6 characters</small>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled autoComplete="on" className="toggle-disable" type="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email}/>
                        </Form.Group>

                        <div className="hidden-fields hidden">
                            <Form.Group controlId="oldPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control autoComplete="on" type="password" placeholder="Enter old password" onChange={this.handleChange} value={this.state.oldPassword}/>
                                <small className="text-muted">Please confirm your old password</small>
                            </Form.Group>

                        
                            <Form.Group controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control autoComplete="on" type="password" placeholder="Enter new password" onChange={this.handleChange} value={this.state.newPassword}/>
                                <small className="text-muted">At least 6 characters</small>
                            </Form.Group>

                            <Form.Group controlId="newPasswordAgain">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control autoComplete="on" type="password" placeholder="Enter new password again" onChange={this.handleChange} value={this.state.newPasswordAgain}/>
                            </Form.Group>
                        </div>
                        {this.props.errors ? (<Alert variant='danger'>{this.props.errors}</Alert>) : null}
                        {this.props.success ? (<Alert variant='success'> Changed user particulars successfully. You will be redirected momentarily... </Alert>) : null}

                        <div className="hidden-fields hidden">
                            <Button size="lg" variant="primary" type="submit" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                    
                </Jumbotron>
            </Container>
        )
    }
}

export default withRouter(EditUser);