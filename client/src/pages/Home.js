import React, { useState } from "react";

// import components
import ProductList from "../components/ProductList";
import ConsoleMenu from "../components/ConsoleMenu";
import Cart from "../components/Cart";

// Import Bootstrap components
import Container from "react-bootstrap/Container";


const Home = () => {

  return (
    <Container fluid>
        <ConsoleMenu />
        <ProductList />
        <Cart />
    </Container>
  );
};

export default Home;