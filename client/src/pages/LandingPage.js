import React, { useState } from "react";

//import css
import "./style.css";

// Import Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from 'react-bootstrap/Carousel';

const LandingPage = () => {
    return (
        <Container fluid>
            <Row className="main">
                <Carousel className="carousel-inner bg-primary">
                    <Carousel.Item>
                       <img className="slideImg" src="/images/slidePic1.jpg"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="slideImg" src="/images/slidePic2.jpg"/>
                    </Carousel.Item>
                </Carousel>
            </Row>
        </Container>
    )
};

export default LandingPage;