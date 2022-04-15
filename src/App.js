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
import { guestsArray } from "./scripts/guests";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  getDocs,
  query,
  where,
  collection,
  getDoc,
  limit,
  doc,
} from "firebase/firestore";
import { db } from "./Firebase";

const functions = getFunctions();
connectFunctionsEmulator(functions, "localhost", 5001);
const getTimeStamp = httpsCallable(functions, "getTimeStamp");

function App() {
  const [navLinkSelected, setNavLinkSelected] = useState("home");
  const [lastNavLinkSelected, setLastNavLinkSelected] = useState("home");
  const [now, setNow] = useState(null);
  const [homeFeedPostsArr, setHomeFeedPostsArr] = useState([]);
  const [me, setMe] = useState(null);
  const [guestsArr, setGuestsArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTimeStamp().then((res) => {
      setNow(Math.round(res.data / 1000));
    });
    setLoading(true);
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserFromUID(user.uid);
        setLoading(false);
      } else {
        const username = localStorage.getItem("username");
        if (username) {
          const userRef = doc(db, "users", username);
          const userSnap = await getDoc(userRef);
          const user = userSnap.data();
          setMe(user);
        }
        guestsArray.then((arr) => {
          setGuestsArr(arr);
          setLoading(false);
        });
      }
    });
  }, []);

  async function fetchUserFromUID(uid) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid), limit(1));
    const snap = await getDocs(q);
    const user = snap.docs[0];
    if (user?.exists()) setMe(user.data());
  }

  function setNavLinkSelectedHard(link) {
    setNavLinkSelected(link);
    setLastNavLinkSelected(link);
  }

  return (
    <div className="App">
      <BrowserRouter>
        {me ? (
          <>
            <NavBar
              selected={navLinkSelected}
              setSelected={setNavLinkSelected}
              lastSelected={lastNavLinkSelected}
              setLastSelected={setLastNavLinkSelected}
              setHomeFeedPostsArr={setHomeFeedPostsArr}
              me={me}
              setMe={setMe}
            />
            <Content
              now={now}
              homeFeedPostsArr={homeFeedPostsArr}
              setHomeFeedPostsArr={setHomeFeedPostsArr}
              me={me}
              setMe={setMe}
              setNavLinkSelectedHard={setNavLinkSelectedHard}
            />
          </>
        ) : (
          <LogIn
            me={me}
            setMe={setMe}
            setHomeFeedPostsArr={setHomeFeedPostsArr}
            setGuestsArr={setGuestsArr}
            guestsArr={guestsArr}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
