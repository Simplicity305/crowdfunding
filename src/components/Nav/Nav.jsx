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
import './nav.css';


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
          {/* <div id="logo">
              <img src="src/images/Communitarian.png" alt="communitarian-logo" />
          </div> */}
          <div id="nav-right">
              {!loggedIn && <Link to="/login" 
              className="btn">Login</Link>}
              {loggedIn && <button onClick={handleClick}>Sign Out</button>}
              <div id="nav-controls">
                  <Link to="/" >Home</Link>
                  <Link to="/projects" >Projects</Link>
              </div>
          </div>

      </nav>
  );
}

export default Nav;

