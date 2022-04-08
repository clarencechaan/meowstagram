import { useEffect, useState } from "react";
import "../styles/HomeFeed.css";
import Post from "./Post";
import { query, orderBy, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

function HomeFeed({ now }) {
  const [postsArr, setPostsArr] = useState([]);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  async function fetchLatestPosts() {
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(postsRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push(doc.data());
    });
    setPostsArr(resultArr);
  }

  return (
    <div className="home-feed">
      {postsArr.map((post) => (
        <Post post={post} now={now} />
      ))}
    </div>
  );
}

export default HomeFeed;
