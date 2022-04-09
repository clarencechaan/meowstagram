import "../styles/Explore.css";
import PostPreview from "./PostPreview";
import { useEffect, useState } from "react";
import { query, orderBy, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

function Explore({ now }) {
  const [postsArr, setPostsArr] = useState([]);

  useEffect(() => {
    fetchExplorePosts();
  }, []);

  async function fetchExplorePosts() {
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(postsRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    setPostsArr(resultArr);
  }

  return (
    <div className="explore">
      <div className="explore-post-previews">
        {postsArr.map((post, idx) =>
          idx + (1 % 18) === 2 || (idx + 1) % 18 === 10 ? (
            <PostPreview isBig={true} now={now} post={post} key={post.id} />
          ) : (
            <PostPreview now={now} post={post} key={post.id} />
          )
        )}
      </div>
      <div className="footer">
        <div className="footer-row">
          <span>About</span> <span>Blog</span> <span>Jobs</span>{" "}
          <span>Help</span> <span>API</span> <span>Privacy</span>{" "}
          <span>Terms</span> <span>Top Accounts</span> <span>Hashtags</span>{" "}
          <span>Locations</span>
          <span>Catstagram Lite</span>
        </div>
        <div className="footer-row">
          <span>English</span>
          <span>
            Made with ♥ love by{" "}
            <a href="https://github.com/clarencechaan/">Clarence Chan</a>!
          </span>
        </div>
      </div>
    </div>
  );
}

export default Explore;
