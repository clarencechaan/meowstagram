import { useEffect, useState } from "react";
import "../styles/ProgressBar.css";

function ProgressBar() {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    function incrementProg() {
      setProg((prevProg) => prevProg + 1);
    }

    const timer = setInterval(incrementProg, 5);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="progress">
      <span className="progress-bar" style={{ width: `${prog}%` }}></span>
    </div>
  );
}

export default ProgressBar;