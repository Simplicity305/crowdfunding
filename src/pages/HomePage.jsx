import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

import ProjectForm from "../components/ProjectForm/ProjectForm";

function HomePage() {
  // State
  const [projectList, setProjectList] = useState([]);


  // -------------Check if this section is correct-----
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
        console.log(data)
      });
  }, []);
  // -----------------------

  return (
    <>
      <ProjectForm />
      <div id="project-list">
        {projectList.map((project, key) => <ProjectCard key={key} projectData={project} />)}
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


