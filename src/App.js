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

const functions = getFunctions();
connectFunctionsEmulator(functions, "localhost", 5001);
const getTimeStamp = httpsCallable(functions, "getTimeStamp");

function App() {
  const [navLinkSelected, setNavLinkSelected] = useState("home");
  const [now, setNow] = useState(null);
  const [homeFeedPostsArr, setHomeFeedPostsArr] = useState([]);
  const [profilePostsArr, setProfilePostsArr] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    getTimeStamp().then((res) => {
      setNow(Math.round(res.data / 1000));
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {me ? (
          <>
            <NavBar
              selected={navLinkSelected}
              setSelected={setNavLinkSelected}
              setHomeFeedPostsArr={setHomeFeedPostsArr}
              setProfilePostsArr={setProfilePostsArr}
              me={me}
            />
            <Content
              setNavLinkSelected={setNavLinkSelected}
              now={now}
              homeFeedPostsArr={homeFeedPostsArr}
              setHomeFeedPostsArr={setHomeFeedPostsArr}
              profilePostsArr={profilePostsArr}
              setProfilePostsArr={setProfilePostsArr}
              me={me}
              setMe={setMe}
            />
          </>
        ) : (
          <LogIn setMe={setMe} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
