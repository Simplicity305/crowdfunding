import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PledgeForm from "../components/PledgeForm/PledgeForm";

import "./ProjectPage.css"

function ProjectPage() {
  // State
  const [projectData, setProjectData] = useState({ pledges: [] });
  
  const [showPledgeForm, setShowPledgeForm] = useState(false);

  // Hooks
  const { id } = useParams();

  // Effects
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
  //     .then((results) => {
  //       return results.json();
  //     })
  //     .then((data) => {
  //       setProjectData(data);
  //     });
  // }, []);

  // ----------Check this - different to thinkific slide 3 getting api data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}projects/${id}`
        );
        console.log(res);
        const data = await res.json();
        setProjectData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, []);
  // --------------------------------------------

//Handlers

  const handlePledgeButtonClick = () => {
    setShowPledgeForm(true);
  };

  return (
    <div className="project-detail-wrapper">
      <img src={projectData.image}/>

      <div className="project-detail">
        <div className="project-header">
          <h2 className="project-name">{projectData.title}</h2>
          <span className="status" style={{color: projectData.is_open ? 'green' : 'red'}}>This project is {!projectData.is_open && 'not '}accepting pledges</span>
                  {/* <h3>{`Status: ${projectData.is_open}`}</h3> */}
        </div>

        <h3 className="project-description">{projectData.description}</h3>
        <p className="created-date">Created by {projectData.owner}</p>
        <p className="created-date">Created at: {projectData.date_created}</p>

        <div className="pledge-wrapper">
        <div className="pledge-header">
          <h3 className="pledge-title">Pledges</h3>
          <h3 className="pledge-total">{projectData.pledge_total ?? 0} hours pledged out of {projectData.goal} hours</h3>
          {/* ^^ ?? is nullish coalescing - returns the thing on the right if the thing on the left is null or undefined. Can also do || 0 - which means or 0 */}

        </div>  

        <ul>
          {projectData.pledges.map((pledgeData, key) => {
            return (
              <li className="pledge-list" key={key}>
                {pledgeData.amount} from {pledgeData.supporter}
              </li>
            );
          })}
        </ul>
        {showPledgeForm ? <PledgeForm /> : <button className="make-pledge-button" onClick={handlePledgeButtonClick}>Make a pledge</button>}

        {/* Alternative solutions to the above - shows the make a pledge button OR shows the pledge form, but not both */}
        {/* {!showPledgeForm && <button className="make-pledge-button" onClick={handlePledgeButtonClick}>Make a pledge</button>}
        {showPledgeForm && <PledgeForm />} */}
      </div>

      </div>






    


    </div>
  );
}

export default ProjectPage;


// ALTERNATIVE CODE

// To add conditional text for project status (accepting pledges or not):
      {/* {projectData.is_open ? 'This project is accepting pledges' : 'This project is not accepting pledges'} */} 
      {/* Logic/structure is a bit more explicit */}

// Alternative to conditionally style project status:
      {/* <span className={`status ${projectData.is_open && 'accepting'}`}>This project is {!projectData.is_open && 'not '}accepting pledges</span> */}
      {/* ^This approach requires a 'status' and 'status.accepting' in css. Chose to add a 'style' in existing code because only one property is changing (font colour) */}











// function ProjectPage() {
//     return <h1>This is the project page</h1>
// }