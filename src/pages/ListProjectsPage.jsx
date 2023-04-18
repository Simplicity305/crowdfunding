import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

import "./ListProjectsPage.css"

function ListProjectsPage() {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}projects`)
            
            const projects = await response.json();
            projects.sort((a, b) => new Date(b.date_created).valueOf() - new Date(a.date_created).valueOf())
            setProjectList(projects)
        };
        loadProjects();
    }, [])


    return (
      <>
      <div className="page-main-header">All Projects</div>
      <div className="project-list">
        {projectList.map((project, key) => <ProjectCard key={key} projectData={project} />)}
      </div>
      </>
    );
  }
  
  export default ListProjectsPage;