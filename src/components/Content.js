import "../styles/Content.css";
import SideBar from "./SideBar";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import { Routes, Route } from "react-router-dom";

function Content() {
  return (
    <div className="Content">
      <div className="content-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeFeed />
                <SideBar />
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default Content;
