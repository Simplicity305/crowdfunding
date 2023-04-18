import { allMentors } from "../mentordata";

// function MentorListPage() {

//     return (
//         <div>
//         {
//         allMentors.map((mentor) => {
//             return <div key ={mentor.id}>
//                 <h2>{`${mentor.first_name} ${mentor.last_name}`}</h2>
//                 <p>{`Skills: ${mentor.skills}`}</p>
//                 <p>{`Will travel? ${mentor.will_travel}`}</p>
//                 <p>{`Onboarding active? ${mentor.is_active}`}</p>
//                 </div>
//             })
//         }
//         </div> 
//     );
// }

function MentorListPage(){

    const getMentorType = ({ industry_mentor, lead_mentor, junior_mentor}) => {
        if (industry_mentor) return 'industry';
        if (lead_mentor) return 'lead';
        if (junior_mentor) return 'junior';
    }

    const enhancedMentorData = allMentors.map(mentorData => ({ ...mentorData, mentor_type: getMentorType(mentorData) }))

    const columns = ['first_name', 'last_name', 'email', 'skills', 'city', 'will_travel', 'mentor_type'];

    const formatter = (colName, value) => {
        if (colName === 'will_travel') {
            return <input type="checkbox" checked={value} />
        }
        if (colName === 'mentor_type')
            return value.toUpperCase()
        return value;
    }

    return <table>
    <thead>
        <tr>
            {columns.map(colName =><th>{colName}</th>)}
        </tr>
    </thead>
    <tbody>
        {enhancedMentorData.map(mentorData =>
            <tr>
                {columns.map(colName =><td className={`${colName}_cell`}>{formatter(colName, mentorData[colName])}</td>)}
            </tr>)
        }
    </tbody>
</table>
}

export default MentorListPage;

