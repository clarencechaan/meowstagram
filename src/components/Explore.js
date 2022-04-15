/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/Explore.css";
import PostPreview from "./PostPreview";
import { useEffect, useRef, useState } from "react";
import {
  query,
  orderBy,
  collection,
  getDocs,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../Firebase";
import Footer from "./Footer";

let lastVisible = null;

function Explore({ now, me, setMe, setNavLinkSelectedHard }) {
  const [postsArr, setPostsArr] = useState([]);
  const endOfFeedRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true) {
          fetchExplorePosts();
        }
      },
      { rootMargin: "400px" }
    );

    fetchFirst().then(() => {
      observer.observe(endOfFeedRef.current);
    });
    setNavLinkSelectedHard("find-people");
  }, []);

  async function fetchFirst() {
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(postsRef, orderBy("timestamp", "desc"), limit(6));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setPostsArr(resultArr);
  }

  async function fetchExplorePosts() {
    if (lastVisible === undefined) return;
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(
      postsRef,
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setPostsArr((prevFeed) => [...prevFeed, ...resultArr]);
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
        <div ref={endOfFeedRef}></div>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
