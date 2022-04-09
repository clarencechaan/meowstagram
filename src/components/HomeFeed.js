/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "../styles/HomeFeed.css";
import Post from "./Post";
import { query, orderBy, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

function HomeFeed({ now, homeFeedPostsArr, setHomeFeedPostsArr }) {
  useEffect(() => {
    fetchLatestPosts();
  }, []);

  async function fetchLatestPosts() {
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(postsRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    setHomeFeedPostsArr(resultArr);
  }

  return (
    <div className="home-feed">
      {homeFeedPostsArr.map((post) => (
        <Post
          post={post}
          now={now}
          key={post.id}
          setHomeFeedPostsArr={setHomeFeedPostsArr}
        />
      ))}
    </div>
  );
}

export default HomeFeed;
