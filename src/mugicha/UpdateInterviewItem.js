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
        companyComment: "", 
        company_form: "",
        redirectToProfile: false,
    });

    const [ isEditing, setIsEditing] = useState(false)
 
    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const { company, student, status, name, time, phase, result, time_period, category, skill_match, character_match, japanese_level, error, success, atojComment , companyComment, company_form, redirectToProfile} = values;

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
                  atojComment: interviewItems[0].atojComment, companyComment: interviewItems[0].companyComment, 
                  company_form: interviewItems[0].company_form
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
        updateInterviewItem(interviewId, interviewItemId, darwin_uid, darwin_myTk, { company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match,  atojComment, companyComment, company_form }).
        then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
              setValues({
                  ...values
              });
              setIsEditing(!isEditing)
            }
        });
        };

            const resultInNice = (result) => {
                if (result === "Nil") {
                    return "Nil"
                }
                else if (result === "合格") {
                    return "●"
                }
                else if (result === "不合格") {
                    return "X"
                }
                else if (result === "三角") {
                    return "▲"
                }
                else if (result === "辞退") {
                    return "辞退"
                }
                else if (result === "内定") {
                    return "内定"
                }
                else {
                    return ""
                }
            }


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
                 <Link to={`/mugicha/company/${company}`} >  {companyName} </Link> 
                </td>
                <td>
                <Link to={`/mugicha/student/${student}`} >  {studentId}  {studentName} </Link> 
                </td>
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
                    {resultInNice
                    (result)}
                </td>
                <td>
                    {atojComment}
                </td>
                <td>
                    {companyComment}
                </td>
                <td><Link to={`/mugicha/interview/${interviewId}`} >  View More </Link>
                     <button type="button" class="btn btn-primary btn-sm" onClick={clickEdit}> Edit </button>   
                </td>
                </>
            )

        
            const interviewUpdate = (company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, atojComment) => (
                    <>
                 <td>
                 <Link to={`/mugicha/company/${company}`} >  {companyName} </Link> 
                </td>
                <td>
                <Link to={`/mugicha/student/${student}`} >  {studentId}  {studentName} </Link> 
                </td>
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
                    {companyComment}
                </td>
            
            <td>
                <div class="btn-list">
            <button type="button" class="btn btn-link btn-sm" onClick={clickEdit}> Cancel</button>

            <button type="button" class="btn btn-primary btn-sm" onClick={clickSubmit}> Save</button>
           </div>
           </td>
  
</>
    );

    return (
      <>
           {isEditing ? 
          <>{interviewUpdate(company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, atojComment)} </> :
           <>{interviewList()}</> }
   
      </>
    );
};

export default withRouter(UpdateInterviewItem);
