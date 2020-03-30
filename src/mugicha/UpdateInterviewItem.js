import React, { useState, useEffect } from 'react';
import { isAuthenticates } from '../auth';
import { withRouter, Link } from 'react-router-dom';
import { getInterview, getUsers } from '../admin/apiAdmin';
import { getStudents, updateInterviewItem } from '../core/apiCore';

const UpdateInterviewItem = ({ interviewId, interviewItemId, studentName, companyName, studentId }) => {
    const [values, setValues] = useState({
        name: "",
        time: "",
        status: "",
        phase: "",
        result: "",
        company: "",
        student: "",
        time_period: "",
        category: "",
        japanese_level: "",
        skill_match: "",
        character_match: "",
        error: false,
        success: false,
        atojComment: "",
        redirectToProfile: false,
    });

    const [ isEditing, setIsEditing] = useState(false)
 
    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const { company, student, status, name, time, phase, result, time_period, category, skill_match, character_match, japanese_level, error, success, atojComment , redirectToProfile} = values;

    const init = interviewId => {
        getInterview(interviewId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                const interviewItems = data.interviewItems.filter(items => items._id === interviewItemId);
                setValues({ ...values, company: data.company._id, student: data.student._id,
                  status: data.status, result: interviewItems[0].result, time: interviewItems[0].time,
                  phase: interviewItems[0].phase, category: interviewItems[0].category,
                  time_period: interviewItems[0].time_period, japanese_level: interviewItems[0].japanese_level,
                  character_match: interviewItems[0].character_match, skill_match: interviewItems[0].skill_match,
                  atojComment: interviewItems[0].atojComment
                 });
            }
        });
    };


    useEffect(() => {
        init(interviewId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickEdit = () => {
        setIsEditing(!isEditing)
    }

    const clickSubmit = e => {
        e.preventDefault();
        updateInterviewItem(interviewId, interviewItemId, darwin_uid, darwin_myTk, { company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match,  atojComment }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
              setValues({
                  ...values,
                  company: data.company,
                  student: data.student,
                  name: data.name,
                  time: data.time,
                  phase: data.phase,
                  result: data.result,
                  category: data.category,
                  time_period: data.time_period,
                  japanese_level: data.japanese_level,
                  character_match: data.character_match,
                  atojComment: data.atojComment,
                  skill_match: data.skill_match,
                  success: true,
                  redirectToProfile: true
              });
            }
        });
        };




            const redirectUser = () => {
                if (redirectToProfile) {
                    if (!error) {
                          window.location.reload();
                    }
                }
            };

            const interviewList = () => (
                <>
                <td>
                     {time}
                </td>
                <td>
                    {time_period}
                </td>
                <td>
                    {category}
                </td>
                <td>
                    {result}
                </td>
                <td>
                    {atojComment}
                </td>
                <td>
                     <button type="button" class="btn btn-link" onClick={clickEdit}> Edit </button>
                     <br/>
                    <Link to={`/mugicha/interview/${interviewId}`} > View More</Link> 
                </td>
                </>
            )

        
            const interviewUpdate = (company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, atojComment) => (
      <>
         
                <td>
                     {time}
                </td>
                <td>
                    {time_period}
                </td>
                <td>
                    {category}
                </td>
            <td>
            <div class="input-group input-group-sm mb-3">
             <select placeholder="結果" onChange={handleChange("result")} value={result} class="form-control"
              aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                  <option value="">Select</option>
                  <option value="Nil"> Nil </option>
                  <option value="合格"> ● </option>
                  <option value="不合格"> X </option>
                  <option value="三角"> ▲</option>
                  <option value="辞退"> 辞退　</option>
                  <option value="内定"> 内定　</option>
              </select>
              </div>
              </td>
            
            <td>
            <div class="input-group input-group-sm mb-3">
            <textarea onChange={handleChange("atojComment")} value={atojComment} name="name"  class="form-control" 
            aria-label="Small" aria-describedby="inputGroup-sizing-sm" rows="3"/>
            </div>
            </td>
            
            <td>
            <button type="button" class="btn btn-link btn-sm" onClick={clickEdit}> Cancel</button>
            <br/>
            <button type="button" class="btn btn-primary btn-sm" onClick={clickSubmit}> Save</button>
            <br/>
            <Link to={`/mugicha/interview/${interviewId}`} > View More</Link> 
           </td>
  
</>
    );

    return (
      <>
           {isEditing ? 
          <>{interviewUpdate(company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, atojComment)} </> :
           <>{interviewList()}</> }
          {redirectUser()}
      </>
    );
};

export default withRouter(UpdateInterviewItem);
