import "../styles/PostPopup.css";
import catPost from "../images/cat-post-2.jpeg";
import PostHeader from "./PostHeader";
import PostButtonsBar from "./PostButtonsBar";
import PostAddCommentBar from "./PostAddCommentBar";
import PostLikesCounter from "./PostLikesCounter";
import PostTimeAgo from "./PostTimeAgo";
import cat from "../images/cat.jpg";
import PostPopupComment from "./PostPopupComment";

function PostPopup({
  cancelPopup,
  postLiked,
  postSaved,
  setPostLiked,
  setPostSaved,
}) {
  return (
    <div
      className="post-popup"
      onClick={() => {
        cancelPopup();
        console.log("post popup clicked");
      }}
    >
      <div
        className="post-popup-window"
        // prevent close on clicking
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img className="post-popup-window-img" src={catPost} alt="" />
        <div className="post-popup-window-sidebar">
          <PostHeader cancelPopup={cancelPopup} />
          <div className="post-popup-window-comments">
            <div className="post-popup-window-comments-description">
              <img
                className="post-popup-window-comments-author-img"
                src={cat}
                alt=""
              />
              <div>
                <div className="post-popup-window-comments-author">
                  <span className="post-popup-window-comments-author-username">
                    stc.official
                  </span>
                  <span className="post-popup-window-comments-author-text">
                    I woke up like this.
                  </span>
                </div>
                <div className="post-popup-window-comments-description-time-ago">
                  1d
                </div>
              </div>
            </div>
            <PostPopupComment cancelPopup={cancelPopup} />
            <PostPopupComment cancelPopup={cancelPopup} />
            <PostPopupComment cancelPopup={cancelPopup} />
            <PostPopupComment cancelPopup={cancelPopup} />
            <PostPopupComment cancelPopup={cancelPopup} />
          </div>
          <PostButtonsBar
            postLiked={postLiked}
            postSaved={postSaved}
            setPostLiked={setPostLiked}
            setPostSaved={setPostSaved}
            setPostPopupShown={() => {}}
          />
          <PostLikesCounter />
          <PostTimeAgo />
          <PostAddCommentBar />
        </div>
      </div>
    </div>
  );
}

export default PostPopup;
