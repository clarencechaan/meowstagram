import "../styles/Explore.css";
import PostPreview from "./PostPreview";
import { useEffect, useState } from "react";
import { query, orderBy, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import Footer from "./Footer";

function Explore({ now, me, setMe }) {
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
        {postsArr.map((post, idx) => (
          <PostPreview
            isBig={(idx + 1) % 18 === 2 || (idx + 1) % 18 === 10}
            now={now}
            post={post}
            key={post.id}
            setParentPostsArr={setPostsArr}
            me={me}
            setMe={setMe}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
