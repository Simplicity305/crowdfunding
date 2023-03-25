import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PledgeForm from "../components/PledgeForm/PledgeForm";

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
    <div>
      <h2>{projectData.title}</h2>
      <h3>Created at: {projectData.date_created}</h3>
      <h3>{`Status: ${projectData.is_open}`}</h3>
      <h3>{projectData.description}</h3>
      <img src={projectData.image}/>
      <h3>Pledges:</h3>
      <ul>
        {projectData.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
      <button onClick={handlePledgeButtonClick}>Make a pledge</button>{showPledgeForm && <PledgeForm />}
    </div>
  );
}

export default ProjectPage;













// function ProjectPage() {
//     return <h1>This is the project page</h1>
// }