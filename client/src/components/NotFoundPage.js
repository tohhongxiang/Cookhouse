import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";

const notFoundPage = () => {
    return (
        <Jumbotron>
            <h1> 404 NOT FOUND </h1>
            <p> This page does not exist </p>
        </Jumbotron>
    )
}

export default notFoundPage;