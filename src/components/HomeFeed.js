/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import "../styles/HomeFeed.css";
import Post from "./Post";
import {
  query,
  orderBy,
  collection,
  getDocs,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../Firebase";

let lastVisible = null;

function HomeFeed({
  now,
  homeFeedPostsArr,
  setHomeFeedPostsArr,
  me,
  setMe,
  setNavLinkSelectedHard,
}) {
  const endOfFeedRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    localStorage.setItem("username", me.username);
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true) {
          fetchLatestPosts();
        }
      },
      { rootMargin: "400px" }
    );

    fetchFirst().then(() => {
      observer.observe(endOfFeedRef.current);
    });
    setNavLinkSelectedHard("home");
  }, []);

  async function fetchFirst() {
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(
      postsRef,
      where("user", "in", [...me.following, me.username]),
      orderBy("timestamp", "desc"),
      limit(2)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setHomeFeedPostsArr(resultArr);
  }

  async function fetchLatestPosts() {
    if (lastVisible === undefined) return;
    const postsRef = collection(db, "posts");
    let resultArr = [];
    const q = query(
      postsRef,
      where("user", "in", [...me.following, me.username]),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(2)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArr.push({ ...doc.data(), id: doc.id });
    });
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setHomeFeedPostsArr((prevFeed) => [...prevFeed, ...resultArr]);
  }

  return (
    <div className="home-feed">
      {homeFeedPostsArr.map((post) => (
        <Post
          post={post}
          now={now}
          key={post.id}
          setHomeFeedPostsArr={setHomeFeedPostsArr}
          me={me}
          setMe={setMe}
        />
      ))}
      {homeFeedPostsArr.length === 0 ? (
        <div className="home-feed-no-posts-message">
          <div>No posts found.</div>{" "}
          <div>Find users to follow to get started.</div>
        </div>
      ) : null}
      <div className="end-of-feed" ref={endOfFeedRef}></div>
    </div>
  );
}

export default HomeFeed;
