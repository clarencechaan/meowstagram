/* eslint-disable react-hooks/exhaustive-deps */
import postHeaderMoreOptions from "../images/post-header-more-options.svg";
import "../styles/PostHeader.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import MoreOptionsPopup from "./MoreOptionsPopup";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

function PostHeader({ cancelPopup, authorUsername }) {
  const [moreOptionsPopupShown, setMoreOptionsPopupShown] = useState(false);
  const [author, setAuthor] = useState({});

  useEffect(() => {
    fetchAuthor();
  }, []);

  async function fetchAuthor() {
    const userRef = doc(db, "users", authorUsername);
    const userSnap = await getDoc(userRef);
    setAuthor(userSnap.data());
  }

  function handleMoreOptionsClicked() {
    setMoreOptionsPopupShown(true);
  }

  function cancelMoreOptionsPopup() {
    setMoreOptionsPopupShown(false);
  }

  return (
    <div className="post-header">
      <Link to={"/profile/" + authorUsername} onClick={cancelPopup}>
        <img className="post-header-img" src={author.imgURL} alt="" />
      </Link>
      <Link to={"/profile/" + authorUsername} onClick={cancelPopup}>
        <div className="post-header-username">{authorUsername}</div>
      </Link>
      <img
        className="post-header-more-options"
        src={postHeaderMoreOptions}
        alt=""
        onClick={handleMoreOptionsClicked}
      />
      {moreOptionsPopupShown ? (
        <MoreOptionsPopup cancelPopup={cancelMoreOptionsPopup} />
      ) : null}
    </div>
  );
}

export default PostHeader;
