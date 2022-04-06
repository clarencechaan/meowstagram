import catProfile from "../images/cat.jpg";
import postHeaderMoreOptions from "../images/post-header-more-options.svg";
import "../styles/PostHeader.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import MoreOptionsPopup from "./MoreOptionsPopup";

function PostHeader() {
  const [moreOptionsPopupShown, setMoreOptionsPopupShown] = useState(false);

  function handleMoreOptionsClicked() {
    setMoreOptionsPopupShown(true);
    document.body.style.overflow = "hidden";
  }

  function cancelMoreOptionsPopup() {
    setMoreOptionsPopupShown(false);
    document.body.style.overflow = "auto";
  }

  return (
    <div className="post-header">
      <Link to="/profile">
        <img className="post-header-img" src={catProfile} alt="" />
      </Link>
      <Link to="/profile">
        <div className="post-header-username">stc.official</div>
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
