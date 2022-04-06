import "../styles/Content.css";
import SideBar from "./SideBar";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import Explore from "./Explore";
import Inbox from "./Inbox";
import { Routes, Route } from "react-router-dom";

function Content({ setNavLinkSelected }) {
  return (
    <div className="Content">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeFeed />
              <SideBar setNavLinkSelected={setNavLinkSelected} />
            </>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
}

export default Content;
