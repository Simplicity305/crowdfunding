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

        
        {/* <div className="nav-under-logo"> */}
        <div className="nav-link-wrapper">
          <div className="login">
              {!loggedIn && <Link className="btn" to="/login">LOGIN</Link>}
              {loggedIn && <button className="sign-out" onClick={handleClick}>SIGN OUT</button>}
          </div>    
          <div className="nav-links">
              <Link to="/" >HOME</Link>
              <Link to="/projects" >PROJECTS</Link>
          </div>
        </div>
        <img className="logo" src="/logo8.png"/>

        {/* </div>  */}
        {/* // <span className="company-name">Sleepify</span> */}
        {/* <div id="logo">
            <img src="src/images/Communitarian.png" alt="communitarian-logo" />
        </div> */}


      </nav>
  );
}

export default Nav;

