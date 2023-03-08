import React, { useState } from "react";

// import components
import ProductList from "../components/ProductList";
import ConsoleMenu from "../components/ConsoleMenu";
import Cart from "../components/Cart";

const Home = () => {

  return (
    <div>
        <ConsoleMenu />
        <ProductList />
        <Cart />
    </div>
  );
};

export default Home;