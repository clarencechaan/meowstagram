import "./App.css";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
