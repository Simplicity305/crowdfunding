import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";


function ListProjectsPage() {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}projects`)
            const projects = await response.json();
            setProjectList(projects)
        };
        loadProjects();
    }, [setProjectList])

    return (
      <div id="project-list">
        {projectList.map((project, key) => <ProjectCard key={key} projectData={project} />)}
      </div>
    );
  }
  
  export default ListProjectsPage;