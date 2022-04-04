import "../styles/Suggestion.css";
import catProfile from "../images/cat.jpg";

function Suggestion() {
  return (
    <div className="suggestion">
      <img className="suggestion-profile-img" src={catProfile} alt="" />
      <div className="suggestion-names">
        <div className="suggestion-username">stc.official</div>
        <div className="suggestion-fullname">Sushi the Cat</div>
      </div>
      <button className="suggestion-follow">Follow</button>
    </div>
  );
}

export default Suggestion;
