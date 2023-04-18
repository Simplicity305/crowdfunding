import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../LoginProvider";
import { Link } from "react-router-dom";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

import ProjectForm from "../components/ProjectForm/ProjectForm";

import "./HomePage.css";

// function GetStarted() {
//   return <div className="get-started-container">
//     <Link className="btn" to="/login">Get Started</Link>
//   </div>
// }

function HomePage() {

  const { loggedIn } = useContext(LoginContext)
  // State
  const [projectList, setProjectList] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);


  // -------------Check if this section is correct-----
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        data.sort((a, b) => new Date(b.date_created).valueOf() - new Date(a.date_created).valueOf())
        setProjectList(data.slice(0, 5));
      });
  }, []);
  // -----------------------

  return (
    <>
      <div className="home-wrapper">
        <div className="welcome">
          <h1>Welcome to the world of the sleep deprived!</h1>
          <p>When the tired are too tired to fight for more sleep, this is where you'll find them! If you have any to spare, consider donating some precious ZZZZZZs to to those who need it most. It might just make all the difference to someone. Happy sleeping!</p>
        </div>


        <div className="page-main-header">Recent Projects</div>


        <div className="project-list">
          {projectList.map((project, key) => <ProjectCard key={key} projectData={project} />)}
        </div>

        {/* <img src="/public/logo.gif"/> */}
        { loggedIn && (showProjectForm
            ? <ProjectForm />
            : <div className="make-project-button">
                <button  onClick={() => setShowProjectForm(true)}>Create a new project</button>
            </div>)
        }
      </div>
    </>
  );
}

export default HomePage;





// --------------------------------
// ORIGINAL CODE BEFORE THE ABOVE
// The above is copied from alex in slack to update the project card stuff ^^^^^
// --------------------------------

//data 
// import { allProjects } from "../data";

//components 


// function HomePage() {
//     // return <h1>This is the home page</h1>
//     return (
//     //Doing a map statement 
//         <div>
//             {allProjects.map((project, key) => {
//                 return <div key={key}>{project.title}</div>;
//             })}
//         </div>
//         // We're importing the all projects from the data file which is an array, then mapping the array? key is equivalent to index - then creating a div - when creating arrays in react, we have to give it a key otherwise it wont know which way its updating? probs should use an id, andthen jamming in the project title 
//     );

// }

// export default HomePage;


