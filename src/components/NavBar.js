import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";

function NavBar({
  selected,
  setSelected,
  lastSelected,
  setLastSelected,
  setHomeFeedPostsArr,
  me,
  setMe,
}) {
  return (
    <div className="NavBar">
      <div className="navbar-content">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setSelected("home");
            setLastSelected("home");
          }}
        >
          <div className="logo">Meowstagram</div>
        </Link>
        <SearchBar me={me} setMe={setMe} />
        <NavLinks
          selected={selected}
          setSelected={setSelected}
          lastSelected={lastSelected}
          setLastSelected={setLastSelected}
          setHomeFeedPostsArr={setHomeFeedPostsArr}
          me={me}
          setMe={setMe}
        />
      </div>
    </div>
  );
}

export default NavBar;
