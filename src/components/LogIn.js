/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/LogIn.css";
import Footer from "./Footer";
import uploadGuestUsers from "../scripts/uploadGuestUsers";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import ProgressBar from "./ProgressBar";
import { follow } from "../scripts/follow";

function LogIn({
  me,
  setMe,
  setHomeFeedPostsArr,
  setGuestsArr,
  guestsArr,
  loading,
  setLoading,
}) {
  const [UID, setUID] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [errorShown, setErrorShown] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    setHomeFeedPostsArr([]);
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

  async function handleLogInBtnClicked() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    setLoading(true);
    const user = result.user;

    setAuthUser(user);
    setUID(user.uid);
  }

  function getUserCreationForm() {
    return (
      <div className="user-creation-form">
        <label htmlFor="username-input">
          <span>Enter your username</span>{" "}
          <span>(this can't be changed later)</span>
        </label>
        <div className="row-2">
          <input
            type="text"
            id="username-input"
            onChange={(e) => handleInputChanged(e)}
            value={inputValue}
            required
          />
          {isValid(inputValue) ? (
            <button className="create-user-btn" onClick={handleCreateUserBtn}>
              Create
            </button>
          ) : (
            <button className="create-user-btn disabled" disabled>
              Create
            </button>
          )}
        </div>
        <div className="user-creation-requirements-message">
          Usernames must contain at least 3 characters and only include letters
          and numbers.
        </div>
        {errorShown ? (
          <div className="user-creation-error-message">
            A user with that name already exists.
          </div>
        ) : (
          <div className="user-creation-error-message">
            <br />
          </div>
        )}
      </div>
    );
  }

  function getGuestLoginContainer() {
    return (
      <div className="guest-log-in-container">
        {guestsArr.map((guest) => (
          <button
            className="guest-log-in-btn"
            onClick={() => setMe(guest)}
            key={guest.username}
          >
            <img src={guest.imgURL} alt="" referrerPolicy="no-referrer" />
            <div className="guest-log-in-btn-name">
              <div className="guest-log-in-btn-username">@{guest.username}</div>
              ({guest.fullname})
            </div>
          </button>
        ))}
      </div>
    );
  }

  function getLoginForm() {
    return (
      <div className="log-in-label">
        Log In as a Guest or{" "}
        <button className="google-log-in-btn" onClick={handleLogInBtnClicked}>
          Log in with Google
        </button>
      </div>
    );
  }

  function handleInputChanged(e) {
    setErrorShown(false);
    const lower = e.target.value.toLowerCase();
    setInputValue(lower);
  }

  function isValid(username) {
    if (username.length < 3) return false;
    for (const c of username) {
      if (!((c >= "a" && c <= "z") || (c >= "0" && c <= "9"))) return false;
    }
    return true;
  }

  async function usernameExists(username) {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return true;
    } else {
      return false;
    }
  }

  async function handleCreateUserBtn() {
    if (await usernameExists(inputValue)) {
      setErrorShown(true);
    } else {
      createUser();
      return;
    }
  }

  async function createUser() {
    const startingUser = {
      uid: UID,
      activityFeed: [],
      bio: "",
      followers: [],
      following: ["blueberry", "widget", "critter", "pumpkin", "omelette"],
      fullname: authUser.displayName,
      imgURL: authUser.photoURL,
      recentSearches: [],
      saved: [],
      username: inputValue,
    };
    await setDoc(doc(db, "users", inputValue), startingUser);
    await followGuests();
    setMe(startingUser);
  }

  async function followGuests() {
    await follow(inputValue, "blueberry");
    await follow(inputValue, "widget");
    await follow(inputValue, "critter");
    await follow(inputValue, "pumpkin");
    await follow(inputValue, "omelette");
  }

  function handleSignOutBtnClicked() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setMe(null);
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <div className="log-in">
      <div className="log-in-window">
        {loading ? <ProgressBar speed={1.5} /> : null}
        <div className="log-in-header">Meowstagram</div>
        {!UID && !loading ? getGuestLoginContainer() : null}
        {!UID && !loading ? getLoginForm() : null}
        {UID && !loading ? getUserCreationForm() : null}
      </div>
      <Footer />
      <button onClick={uploadGuestUsers}>upload guests</button>
      <button onClick={handleSignOutBtnClicked}>sign out</button>
    </div>
  );
}

export default LogIn;
