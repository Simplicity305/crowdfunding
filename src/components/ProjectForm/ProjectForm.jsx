import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../LoginProvider";

import "./ProjectForm.css"

function ProjectForm() {
    const { loggedIn, token: authToken } = useContext(LoginContext)
    const [project, setProject] = useState({
        title: '',
        description: '',
        goal: undefined,
        image: undefined,
        is_open: true
    });

    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const { id: fieldId, value } = event.target;
        setProject({
            ...project,
            [fieldId]: value,
        });
    };

    // submit the new data (state change) from handleChange.
        // POST has been moved from separate function to be embedded and actioned when the submit button is pressed. 
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loggedIn) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}projects/`, {
                        method: "post",
                        headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`,
                        },
                        body: JSON.stringify(project),
                    }
                );
                if (!response.ok) { throw new Error(await response.text()); }
                const { id } = await response.json()
                navigate(`/project/${id}`);
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div className="project">

            <form onSubmit={handleSubmit}>
                <p className="form-name">CREATE A PROJECT</p>
                <div className="project-form-rows">
                    <label htmlFor="title">Title </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter project title"
                        onChange={handleChange}
                    />
                </div>
                <div className="project-form-rows">
                    <label htmlFor="description">Description </label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Enter project description"
                        onChange={handleChange}
                    />
                </div>
                <div className="project-form-rows">
                    <label htmlFor="goal">Goal </label>
                    <input
                        id="goal"
                        type="number"
                        placeholder="Enter amount"
                        onChange={handleChange}
                    />
                </div>
                <div className="project-form-rows">
                    <label htmlFor="image">Image URL </label>
                    <input
                        id="image"
                        type="text"
                        placeholder="Enter project image"
                        onChange={handleChange}
                    />
                </div>
                <button className="project-submit-button" type="submit">Create Project</button>
            </form>

        </div>
        
    );
}

export default ProjectForm;