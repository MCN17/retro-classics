import React, { useState } from "react";
import { Link } from "react-router-dom";

//import css
import "./style.css";

// Import Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from 'react-bootstrap/Carousel';

const LandingPage = () => {
    return (
        <Container fluid>
            <Row className="main">
                <Carousel className="carousel-inner" variant="dark">
                    <Carousel.Item>
                       <img className="slideImg" src="/images/slidePic1.jpg" alt="nintendo characters"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="slideImg" src="/images/slidePic2.jpg" alt="sega genesis console"/>
                    </Carousel.Item>
                </Carousel>
                <Link to="/home"><Button className="gamesButton">View Games</Button></Link>
            </Row>
        </Container>
    )
};

export default LandingPage;