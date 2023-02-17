import React, { useState } from "react";
import ConsoleMenu from "../components/ConsoleMenu"

const Home = () => {
    const [currentConsole, setConsole] = useState("");

  return (
    <div>
        <ConsoleMenu setConsole={setConsole} />
    </div>
  );
};

export default Home;