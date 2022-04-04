import "../styles/Content.css";
import Post from "./Post";
import SideBar from "./SideBar";

function Content() {
  return (
    <div className="Content">
      <div className="content-container">
        <div className="posts-container">
          <Post />
          <Post />
          <Post />
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default Content;
