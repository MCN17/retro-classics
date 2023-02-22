import React, { useState } from "react";

import ProductList from "../components/ProductList";
import ConsoleMenu from "../components/ConsoleMenu";

const Home = () => {

  return (
    <div>
        <ConsoleMenu />
        <ProductList />
    </div>
  );
};

export default Home;