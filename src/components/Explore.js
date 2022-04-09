import "../styles/Explore.css";
import PostPreview from "./PostPreview";
import { useEffect, useState } from "react";
import { query, orderBy, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import Footer from "./Footer";

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
            <PostPreview
              isBig={true}
              now={now}
              post={post}
              key={post.id}
              setParentPostsArr={setPostsArr}
            />
          ) : (
            <PostPreview
              now={now}
              post={post}
              key={post.id}
              setParentPostsArr={setPostsArr}
            />
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
