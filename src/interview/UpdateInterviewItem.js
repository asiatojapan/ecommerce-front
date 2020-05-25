import React, { useState, useEffect } from 'react';
import { isAuthenticates } from '../auth';
import { withRouter, Link } from 'react-router-dom';
import { readInterview } from './apiInterview';
import { getStudents, updateInterviewItem } from '../core/apiCore';
import moment from "moment"


const UpdateInterviewItem = ({ interviewId, interviewItemId  }) => {
    const [values, setValues] = useState({
        name: "",
        time: "",
        status: "",
        phase: "",
        result: "",
        company: "",
        student: "",
        companyRank: "",
        companyRate: "",
        time_period: "",
        category: "",
        event_day: "",
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

    const { company, student, status, name,companyRank, companyRate, time, phase, event_day, result, time_period, category, skill_match, character_match, japanese_level, error, success, atojComment , companyComment, company_form, redirectToProfile} = values;

    const init = interviewId => {
        readInterview(interviewId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                const interviewItems = data.interviewItems.filter(items => items._id === interviewItemId);
                setValues({ ...values, company: data.company._id, student: data.student._id, companyRank: data.companyRank,
                  companyRate: data.companyRate,event_day: data.interviewItems[0].event_day,
                  status: data.status, result: interviewItems[0].result, time: interviewItems[0].time,
                  phase: interviewItems[0].phase, category: interviewItems[0].category,
                  time_period: interviewItems[0].time_period, japanese_level: interviewItems[0].japanese_level,
                  character_match: interviewItems[0].character_match, skill_match: interviewItems[0].skill_match,
                  atojComment: interviewItems[0].atojComment, companyComment: interviewItems[0].companyComment, 
                  company_form: interviewItems[0].company_form, event_day: interviewItems[0].event_day
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
        updateInterviewItem(interviewId, interviewItemId, darwin_uid, darwin_myTk, { company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match,  atojComment, event_day, companyComment, company_form }).
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
                    return ""
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


    const interviewList = () => (
        <div className="list-list" style={{padding: "0px"}}>
            <div className="card-header"><div className="card-title">{ values.event_day} </div>
            <div class="card-options"> <button type="button" class="btn btn-primary btn-sm" onClick={clickEdit}> Edit </button>   </div>
             </div>
                  <div className="card-body">
                       <div class="row row">

                         <div class="col col-3">
                         <h6 class="h6 mt-0">Phase</h6>
                           <p>{values.phase} </p>
                        </div>

                        <div class="col col-3">
                         <h6 class="h6 mt-0">日</h6>
                           <p>{values.time_period} </p>
                        </div>

                        <div class="col col-3">
                         <h6 class="h6 mt-0">時間</h6>
                           <p>{values.time} </p>
                        </div>

                        <div class="col col-3">
                            <h6 class="h6 mt-0">Category</h6>
                           <p>{values.category}</p>
                        </div>

                         <div class="col col-3">
                         <h6 class="h6 mt-0">日本語力</h6>
                           <p>{values.japanese_level} </p>
                           </div>

                           <div class="col col-3">
                           <h6 class="h6 mt-0">人物マッチ</h6>
                             <p>{values.character_match} </p>
                          </div>

                          <div class="col col-3">
                             <h6 class="h6 mt-0">スキルマッチ</h6>
                             <p>{values.skill_match} </p>
                          </div>

                          <div class="col col-3">
                          <h6 class="h6 mt-0">結果</h6>
                             <p>{resultInNice(values.result)} </p>
                          </div>
                        </div>
                      <h6 class="h6 mt-0 mb-4">AtoJコメント</h6>
                      <p className="pre-line">{values.atojComment} </p>
                    
                      <h6 class="h6 mt-0 mb-4">企業コメント</h6>
                      <p className="pre-line"> {values.companyComment} </p>

              </div>
        </div>
    )

        
     const interviewUpdate = (company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, atojComment) => (
        <>
         <div className="list-list" style={{padding: "0px"}}>
            <div className="card-header">
                <div className="card-title">
                <input class="form-control" name="event_day" onChange={handleChange("event_day")} value={event_day} rows="5" /> 
                </div>
            <div class="card-options"> 
            <button type="button" class="btn btn-link btn-sm" onClick={clickEdit}> Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" onClick={clickSubmit}> Save</button>
            </div>
             </div>
                  <div className="card-body">
                       <div class="row row">

                       <div class="col col-3">
                         <h6 class="h6 mt-0">Phase</h6>
                           <p>
                            <select placeholder="phase" onChange={handleChange("phase")} value={phase} className="form-control custom-select">
                                <option value=""> Select </option>
                                <option value="1次"> 1次 </option>
                                <option value="2次"> 2次 </option>
                                <option value="最終"> 最終 </option>
                             </select>
                            </p>
                        </div>

                        <div class="col col-3">
                         <h6 class="h6 mt-0">日</h6>
                           <p>
                               <select placeholder="phase" onChange={handleChange("time_period")} value={time_period} className="form-control custom-select">
                                <option value=""> Select </option>
                                <option value="1日"> 1日 </option>
                                <option value="2日"> 2日 </option>
                             </select></p>
                        </div>

                        <div class="col col-3">
                         <h6 class="h6 mt-0">時間</h6>
                           <p> 
                            <select placeholder="時間" onChange={handleChange("time")} value={time} class="form-control custom-select">
                                <option value="">Select</option>
                                <option value="08:00"> 08:00 </option>
                                <option value="09:00"> 09:00 </option>
                                <option value="09:30"> 09:30 </option>
                                <option value="10:00"> 10:00 </option>
                                <option value="11:00"> 11:00 </option>
                                <option value="12:00"> 12:00 </option>
                                <option value="12:40"> 12:40 </option>
                                <option value="13:00"> 13:00 </option>
                                <option value="13:30"> 13:30 </option>
                                <option value="14:00"> 14:00 </option>
                                <option value="15:00"> 15:00 </option>
                                <option value="15:30"> 15:30 </option>
                                <option value="16:00"> 16:00 </option>
                                <option value="17:00"> 17:00 </option>
                                <option value="17:40"> 17:40 </option>
                                <option value="18:00"> 18:00 </option>
                                <option value="18:30"> 18:30 </option>
                                <option value="19:00"> 19:00 </option>
                                <option value="19:30"> 19:30 </option>
                                <option value="20:00"> 20:00 </option>
                                <option value="20:30"> 20:30 </option>
                            </select>
                            </p>
                        </div>

                        <div class="col col-3">
                        <h6 class="h6 mt-0">Category</h6>
                        <select placeholder="category" onChange={handleChange("category")} value={category} class="form-control custom-select">
                            <option value="">Select</option>
                            <option value="面接"> 面接</option>
                            <option value="試験"> 試験 </option>
                            <option value="説明会"> 説明会 </option>
                            <option value="Skype"> Skype </option>
                        </select>
                        </div>

                           
                         <div class="col col-3">
                         <h6 class="h6 mt-0">日本語力</h6>
                           <p>
                            <select placeholder="japanese_level" onChange={handleChange("japanese_level")} value={japanese_level} className="form-control custom-select">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                            </select>
                           </p>
                           </div>

                           <div class="col col-3">
                           <h6 class="h6 mt-0">人物マッチ</h6>
                             <p>
                             <select placeholder="character_match" onChange={handleChange("character_match")} value={character_match} className="form-control custom-select">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                            </select>
                            </p>
                          </div>

                          <div class="col col-3">
                             <h6 class="h6 mt-0">スキルマッチ</h6>
                             <p>
                             <select placeholder="skill_match" onChange={handleChange("skill_match")} value={skill_match} className="form-control custom-select">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                            </select>
                            </p>
                          </div>

                          <div class="col col-3">
                          <h6 class="h6 mt-0">結果</h6>
                             <p>
                             <select placeholder="結果" onChange={handleChange("result")} value={result} className="form-control custom-select">
                                    <option value="">Select</option>
                                    <option value="Nil"> Nil </option>
                                    <option value="合格"> ● </option>
                                    <option value="不合格"> X </option>
                                    <option value="三角"> ▲</option>
                                    <option value="辞退"> 辞退　</option>
                                    <option value="内定"> 内定　</option>
                                </select>
                             </p>
                          </div>

                        </div>
                      <h6 class="h6 mt-0 mb-4">AtoJコメント</h6>
                      <p>
                      <textarea class="form-control" name="atojComment" onChange={handleChange("atojComment")} value={atojComment} rows="5" /> 
                       </p>
                    
                      <h6 class="h6 mt-0 mb-4">企業コメント</h6>
                      <p> 
                        <textarea class="form-control" name="companyComment" onChange={handleChange("companyComment")} value={companyComment} rows="5" /> 
                    </p>
              </div>
        </div>
              
  
        </>
        );

    return (
      <>
           {isEditing ? 
           <>{interviewUpdate(company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, atojComment)} </> :
           <>{console.log(values)}{interviewList()}</> }
   
      </>
    );
};

export default withRouter(UpdateInterviewItem);
