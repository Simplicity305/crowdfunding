import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../LoginProvider";

function PledgeForm() {
    // const authToken = window.localStorage.getItem("token")
    const { loggedIn, token: authToken } = useContext(LoginContext)
    // const [loggedIn] = useOutletContext();
    const [pledges, setPledges] = useState({
        // from JSON Raw Body in Deployed (default values)
        // this is what you return at the bottom - your list might look different to mine. If so, don't worry!
        "amount": null,
        "comment": "",
        "anonymous": false,      
    });

    // enables redirect
    const navigate = useNavigate();

    // accesses project ID so the pledge can be connected to it
    const { id: project } = useParams();

    // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below
    const handleChange = (event) => {
        const { id: fieldId, value } = event.target;
        setPledges((prevPledges) => ({
        ...prevPledges,
        [fieldId]: value,
        }));
    };

    // submit the new data (state change) from handleChange.
        // POST has been moved from separate function to be embedded and actioned when the submit button is pressed. 
    const handleSubmit = async (event) => {
        event.preventDefault();

        // if the auth token exists (if logged in) 
            // TRY to POST the data to your deployed, using fetch.
            // send the token with it to authorise the ability to post
                // wait for the response - 
                // if successful, return the JSON payload and reload the page with the data
                // if not successful, CATCH the error and display as a pop up alert
        // if not logged in, redirect to login page

        if (loggedIn) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}pledges/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify({...pledges, project}),
                }
                );
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                location.reload();
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            }
        } else {
        // redirect to login page
        navigate(`/login`);
        }
    };

    return (
        <>
        {loggedIn?
            <div>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Enter amount"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="comment">Comment:</label>
                <input
                    type="text"
                    id="comment"
                    placeholder="Enter Comment"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="anonymous">Anonymous:</label>
                <input 
                    type="checkbox"
                    id="anonymous" 
                    onChange={handleChange} 
                />
                </div>
                <div>
                {/* <label htmlFor="project">Project:</label> */}
                {/* <input
                    type="text"
                    id="project"
                    value={projectId}
                    disabled
                    hidden
                    placeholder="needs to be auto-filled with current project"
                /> */}
                </div>
                <button type="submit">Pledge</button>
            </form>
            </div> 
        : (<p>Login to pledge</p>) }
        </>
    );
}

export default PledgeForm;