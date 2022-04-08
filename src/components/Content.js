import "../styles/Content.css";
import SideBar from "./SideBar";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import Explore from "./Explore";
import Inbox from "./Inbox";
import { Routes, Route } from "react-router-dom";

function Content({ setNavLinkSelected, now }) {
  return (
    <div className="Content">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomeFeed now={now} />
              <SideBar setNavLinkSelected={setNavLinkSelected} />
            </>
          }
        />
        <Route path="/profile" element={<Profile now={now} />} />
        <Route path="/explore" element={<Explore now={now} />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
}

export default Content;
