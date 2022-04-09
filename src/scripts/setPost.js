function setPost(param, setParentPostsArr, post) {
  setParentPostsArr((prevPostsArr) => {
    let updatedPost;
    if (typeof param === "function") {
      updatedPost = param(post);
    } else {
      updatedPost = param;
    }
    const index = prevPostsArr.indexOf(post);
    return [
      ...prevPostsArr.slice(0, index),
      updatedPost,
      ...prevPostsArr.slice(index + 1),
    ];
  });
}

function setPostLiked(param, setParentPostsArr, post, postLiked) {
  setParentPostsArr((prevPostsArr) => {
    let updatedPostLiked;
    if (typeof param === "function") {
      updatedPostLiked = param(postLiked);
    } else {
      updatedPostLiked = param;
    }
    let updatedPost;
    if (updatedPostLiked) {
      updatedPost = { ...post, likes: [...post.likes, "stc.official"] };
    } else {
      const index = post.likes.indexOf("stc.official");
      updatedPost = {
        ...post,
        likes: [...post.likes.slice(0, index), ...post.likes.slice(index + 1)],
      };
    }
    const index = prevPostsArr.indexOf(post);
    return [
      ...prevPostsArr.slice(0, index),
      updatedPost,
      ...prevPostsArr.slice(index + 1),
    ];
  });
}

export { setPost, setPostLiked };
