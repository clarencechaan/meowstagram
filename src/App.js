import "./App.css";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import LogIn from "./components/LogIn";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import guestsArray from "./scripts/guests";

const functions = getFunctions();
connectFunctionsEmulator(functions, "localhost", 5001);
const getTimeStamp = httpsCallable(functions, "getTimeStamp");

function App() {
  const [navLinkSelected, setNavLinkSelected] = useState("home");
  const [now, setNow] = useState(null);
  const [homeFeedPostsArr, setHomeFeedPostsArr] = useState([]);
  const [me, setMe] = useState(null);
  const [guestsArr, setGuestsArr] = useState([]);

  useEffect(() => {
    getTimeStamp().then((res) => {
      setNow(Math.round(res.data / 1000));
    });
    guestsArray.then((arr) => {
      setGuestsArr(arr);
    });
  }, []);

  useEffect(() => {
    if (!me) return;
    setGuestsArr((prevArr) => {
      const index = prevArr.findIndex(
        (guest) => guest.username === me.username
      );
      if (index !== -1) {
        return [...prevArr.slice(0, index), me, ...prevArr.slice(index + 1)];
      } else {
        return prevArr;
      }
    });
  }, [me]);

  return (
    <div className="App">
      <BrowserRouter>
        {me ? (
          <>
            <NavBar
              selected={navLinkSelected}
              setSelected={setNavLinkSelected}
              setHomeFeedPostsArr={setHomeFeedPostsArr}
              me={me}
              setMe={setMe}
            />
            <Content
              setNavLinkSelected={setNavLinkSelected}
              now={now}
              homeFeedPostsArr={homeFeedPostsArr}
              setHomeFeedPostsArr={setHomeFeedPostsArr}
              me={me}
              setMe={setMe}
            />
          </>
        ) : (
          <LogIn
            setMe={setMe}
            guestsArr={guestsArr}
            setGuestsArr={setGuestsArr}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
