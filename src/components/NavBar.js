import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar({
  selected,
  setSelected,
  setHomeFeedPostsArr,
  setProfilePostsArr,
  me,
}) {
  const [lastSelected, setLastSelected] = useState("home");

  return (
    <div className="NavBar">
      <div className="navbar-content">
        <Link
          to="/"
          onClick={() => {
            setSelected("home");
            setLastSelected("home");
          }}
        >
          <div className="logo">Catstagram</div>
        </Link>
        <SearchBar />
        <NavLinks
          selected={selected}
          setSelected={setSelected}
          lastSelected={lastSelected}
          setLastSelected={setLastSelected}
          setHomeFeedPostsArr={setHomeFeedPostsArr}
          setProfilePostsArr={setProfilePostsArr}
          me={me}
        />
      </div>
    </div>
  );
}

export default NavBar;
