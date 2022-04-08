import "./App.css";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";

const functions = getFunctions();
connectFunctionsEmulator(functions, "localhost", 5001);
const getTimeStamp = httpsCallable(functions, "getTimeStamp");

function App() {
  const [navLinkSelected, setNavLinkSelected] = useState("home");
  const [now, setNow] = useState(null);

  useEffect(() => {
    getTimeStamp().then((res) => {
      setNow(Math.round(res.data / 1000));
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar selected={navLinkSelected} setSelected={setNavLinkSelected} />
        <Content setNavLinkSelected={setNavLinkSelected} now={now} />
      </BrowserRouter>
    </div>
  );
}

export default App;
