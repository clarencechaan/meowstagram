import "./App.css";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  const [navLinkSelected, setNavLinkSelected] = useState("home");

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar selected={navLinkSelected} setSelected={setNavLinkSelected} />
        <Content setNavLinkSelected={setNavLinkSelected} />
      </BrowserRouter>
    </div>
  );
}

export default App;
