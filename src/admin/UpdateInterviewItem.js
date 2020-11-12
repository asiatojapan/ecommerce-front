import React, { useState, useEffect } from 'react';
import { isAuthenticates } from '../auth';
import { withRouter } from 'react-router-dom';
import { getInterview, getUsers } from './apiAdmin';
import { getStudents, updateInterviewItem } from '../core/apiCore';
import Modal from 'react-bootstrap/Modal';

const UpdateInterviewItem = ({ interviewId, interviewItemId, match, history }) => {
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
        event_day: "",
        japanese_level: "",
        skill_match: "",
        character_match: "",
        atojComment: "",
        companyComment: "",
        studentname: "",
        companyname: "",
        error: false,
        success: false,
        redirectToProfile: false,
    });


    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const { company, student, studentname, studentid, companyname, status, name, time, phase, result, time_period, category, skill_match, character_match, japanese_level, atojComment, companyComment,event_day, error, success, redirectToProfile} = values;

    const init = interviewId => {
        getInterview(interviewId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                const interviewItems = data.interviewItems.filter(items => items._id === interviewItemId);
                setValues({ ...values, studentid: data.student.studentid, studentname: data.student.name, companyname: data.company.name, company: data.company._id, student: data.student._id,
                  status: data.status, result: interviewItems[0].result, time: interviewItems[0].time,
                  phase: interviewItems[0].phase, category: interviewItems[0].category,
                  time_period: interviewItems[0].time_period, japanese_level: interviewItems[0].japanese_level,
                  character_match: interviewItems[0].character_match, skill_match: interviewItems[0].skill_match,
                  atojComment: interviewItems[0].atojComment, companyComment: interviewItems[0].companyComment,  event_day: interviewItems[0].event_day
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

    const clickSubmit = e => {
        e.preventDefault();
        updateInterviewItem(interviewId, interviewItemId, darwin_uid, darwin_myTk, { company, studentname, companyname, student, time, phase, result, time_period, event_day, category, japanese_level, character_match, skill_match, atojComment, companyComment }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
              setValues({
                  ...values,
                  success: true,
                  redirectToProfile: true
              });
            }
        });
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                    window.location.reload();
            }
        }
    };

    const interviewUpdate = (company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, event_day) => (
      <>
      <button onClick={handleShow}  className="linkButton" >
       Update
     </button>

     <Modal show={show} onHide={handleClose}>
     <form>
         <Modal.Header> {student.name} : {company.name}
       </Modal.Header>
       <Modal.Body>


          <div class="mb-2">
              <div class="form-label">時間</div>
              <select placeholder="時間" onChange={handleChange("time")} value={time} class="form-control">
              <option value="">Select</option>
                    <option value="08:00"> 08:00 </option>
                    <option value="09:00"> 09:00 </option>
                    <option value="09:30"> 09:30 </option>
                    <option value="09:40"> 09:40 </option>
                    <option value="09:45"> 09:45 </option>
                    <option value="09:50"> 09:50 </option>
                    <option value="10:00"> 10:00 </option>
                    <option value="10:10"> 10:10 </option>
                    <option value="10:20"> 10:20 </option>
                    <option value="10:30"> 10:30 </option>
                    <option value="10:40"> 10:40 </option>
                    <option value="10:50"> 10:50 </option>
                    <option value="11:00"> 11:00 </option>
                    <option value="11:15"> 11:15 </option>
                    <option value="11:30"> 11:30 </option>
                    <option value="11:40"> 11:40 </option>
                    <option value="12:00"> 12:00 </option>
                    <option value="12:30"> 12:30 </option>
                    <option value="12:40"> 12:40 </option>
                    <option value="13:00"> 13:00 </option>
                    <option value="13:30"> 13:30 </option>
                    <option value="13:40"> 13:40 </option>
                    <option value="13:45"> 13:45 </option>
                    <option value="14:00"> 14:00 </option>
                    <option value="14:15"> 14:15 </option>
                    <option value="14:20"> 14:20 </option>
                    <option value="14:30"> 14:30 </option>
                    <option value="14:45"> 14:45 </option>
                    <option value="15:00"> 15:00 </option>
                    <option value="15:10"> 15:10 </option>
                    <option value="15:30"> 15:30 </option>
                    <option value="15:40"> 15:40 </option>
                    <option value="15:45"> 15:45 </option>
                    <option value="15:50"> 15:50 </option>
                    <option value="16:00"> 16:00 </option>
                    <option value="16:15"> 16:15 </option>
                    <option value="16:20"> 16:20 </option>
                    <option value="16:30"> 16:30 </option>
                    <option value="17:00"> 17:00 </option>
                    <option value="17:15"> 17:15 </option>
                    <option value="17:30"> 17:30 </option>
                    <option value="17:40"> 17:40 </option>
                    <option value="17:45"> 17:45 </option>
                    <option value="18:00"> 18:00 </option>
                    <option value="18:30"> 18:30 </option>
                    <option value="19:00"> 19:00 </option>
                    <option value="19:30"> 19:30 </option>
                    <option value="20:00"> 20:00 </option>
                    <option value="20:30"> 20:30 </option>
                </select>
          </div>


          <div class="mb-2">
              <div class="form-label">選考</div>
              <select placeholder="選考" onChange={handleChange("phase")} value={phase} class="form-control">
                  <option value="">Select</option>
                    <option value="1次"> 1次 </option>
                    <option value="2次"> 2次 </option>
                    <option value="最終"> 最終 </option>
                    <option value="NG"> NG</option>
                    <option value="終了"> 終了</option>
                </select>
          </div>

          <div className="mb-2">
            <label className="form-label">結果</label>
            <select placeholder="結果" onChange={handleChange("result")} value={result} className="form-control">
                  <option value="">Select</option>
                  <option value="Nil">Nil</option>
                  <option value="合格"> ● </option>
                  <option value="不合格"> X </option>
                  <option value="三角"> ▲</option>
                  <option value="辞退"> 辞退　</option>
                  <option value="内定"> 内定　</option>
              </select>
          </div>
    
          <div className="mb-2">
          <label className="form-label">Date</label>
           <input type="text" onChange={handleChange("event_day")} value={event_day} class="form-control"/>
          </div>
          <div class="mb-2">
            <label class="form-label">Day</label>
            <select placeholder="time_period" onChange={handleChange("time_period")} value={time_period} class="form-control">
                  <option value="">Select</option>
                  <option value="1日"> 1日</option>
                  <option value="2日"> 2日 </option>
                  <option value="3日"> 3日 </option>
              </select>
          </div>

          <div class="mb-2">
            <label class="form-label">Category</label>
            <select placeholder="category" onChange={handleChange("category")} value={category} class="form-control">
                    <option value="">Select</option>
                  <option value="面接"> 面接</option>
                  <option value="試験"> 試験 </option>
                  <option value="説明会"> 説明会 </option>
                  <option value="Skype"> Skype </option>
              </select>
          </div>
    </Modal.Body>
    <Modal.Footer>
        <button type="submit" onClick={clickSubmit} class="btn btn-primary ml-auto">Submit</button>
    </Modal.Footer>
    </form>
  </Modal>
  </>
    );

    return (
      <span>
          {interviewUpdate(company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, event_day)}
          {redirectUser()}
      </span>
    );
};

export default withRouter(UpdateInterviewItem);
