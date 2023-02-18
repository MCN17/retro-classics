import React, { useState } from "react";

import ProductList from "../components/ProductList";
import ConsoleMenu from "../components/ConsoleMenu";

const Home = () => {
    const [currentConsole, setConsole] = useState("");

  return (
    <div>
        <ConsoleMenu setConsole={setConsole} />
        <ProductList currentConsole={currentConsole} />
    </div>
  );
};

export default Home;