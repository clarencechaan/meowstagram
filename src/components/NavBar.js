import "../styles/NavBar.css";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="navbar-content">
        <div className="logo">Outstagram</div>
        <SearchBar />
        <NavLinks />
      </div>
    </div>
  );
}

export default NavBar;
