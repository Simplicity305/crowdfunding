import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";


function LoginForm() {

    const [, setLoggedIn] = useOutletContext();
    
    //State
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    
    //Hooks 
    const navigate = useNavigate();

    //Actions
    const handleChange = (event) => {
        const { id, value } = event.target;

        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value, //this will override the prevCredentials and setting it as the state. Javascript works from top to bottom. 
        }));
    };

// post data ---------------
    const postData = async () => {
        const response = await fetch(
        `${import.meta.env.VITE_API_URL}api-token-auth/`,
        {
            // posting 
            method: "post",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }
        );
        return response.json();
    };
// Put async because using await
// now have to change the handle submit bit 
//post data --------------------

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (credentials.username && credentials.password) {
    //       fetch(`${import.meta.env.VITE_API_URL}api-token-auth/`, {
    //         method: "post",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(credentials),
    //       }).then((response) => {
    //         console.log(response.json());
    //       });
    //     }
    //   };
    //The handle change is plugged into the input. It means that everytime the event handler for onChnage is triggered, this function gets called. Everytime the function is called, the event is passed into it. An event is the dom/browser. React does weird things to the events under the hood. We go event.target and grab the target. We set the id in the input to üsername"to match the username at the top (login form function). Got lost at the targe thing but is talking about replacing data or something. Check about this part and understand how this bit works a bit.

    // Replacing the above handleSubmit - best practice/deviating/code is cleaner
        const handleSubmit = async (event) => {
            event.preventDefault();
            if (credentials.username && credentials.password) {
                const { token } = await postData();
                window.localStorage.setItem("token", token);
                // window because accessing the browser 
                navigate("/");
            }
          };


    return (
        <form onSubmit={handleSubmit}> 
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <button type="submit">
            Login
          </button>
        </form>
      );

}

        
export default LoginForm;