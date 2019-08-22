import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

const Logout = () => {
    return (
        <Jumbotron>
            <Alert variant="success"> Successfully Logged Out </Alert>
            <p><Link to="login">Log In</Link></p>
        </Jumbotron>
    )
}

export default Logout;