import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../LoginProvider";

// function Nav() {
//   return (
//     <nav>
//       <Link to="/">Home</Link>
//     </nav>
//   );
// }
import './Nav.css';


function Nav(props) {
//   const { loggedIn, setLoggedIn } = props
  const { loggedIn, setToken } = useContext(LoginContext)
  const handleClick = () => {
      window.localStorage.removeItem("token")
      setToken(null);
    //   setLoggedIn(false)
  }
  return (
      <nav>
            <span className="company-name">SleepyDaze</span>
          {/* <div id="logo">
              <img src="src/images/Communitarian.png" alt="communitarian-logo" />
          </div> */}
            <div className="nav-links">
                <Link to="/" >Home</Link>
                <Link to="/projects" >Projects</Link>
            </div>
          <div className="login">
              {!loggedIn && <Link className="btn" to="/login">Login</Link>}
              {loggedIn && <button onClick={handleClick}>Sign Out</button>}
          </div>

      </nav>
  );
}

export default Nav;

