import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { withRouter } from 'react-router-dom';
import { createInterviewItem, getInterview  } from './apiAdmin';
import Modal from 'react-bootstrap/Modal';


  const AddInterviewItem = ({interviewId }) => {
    const [values, setValues] = useState({
        name: "",
        time: "",
        phase: "1次",
        result: "Nil",
        company: "",
        student: "",
        time_period: "1日",
        event_day: "2020-06-16",
        category: "Skype",
        error: false,
        success: false,
        redirectToProfile: false,
    });

    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const { company, student, name, time, phase, result, time_period, category, event_day, error, success, redirectToProfile} = values;

    const init = () => {
        getInterview(interviewId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, company: data.company, student: data.student });
            }
        });
    };


    useEffect(() => {
        init();
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        createInterviewItem(interviewId, darwin_uid, darwin_myTk, {time, phase, result, time_period, event_day, category }).then(data => {
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
                  success: true,
              });
            }
        });
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


        const showSuccess = () => (
            <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                User has been updated!
            </div>
        );

            const redirectUser = () => {
                if (redirectToProfile) {
                    if (!error) {
                          window.location.reload();
                    }
                }
            };

    const interviewUpdate = ( time,  phase, result, time_period, category) => (
      <div>
      <a onClick={handleShow}>
       Add Interview Item
     </a>

     <Modal show={show} onHide={handleClose}>
     <form>
       <Modal.Header>   {student.studentid} {student.name} : {company.name}
       </Modal.Header>
       <Modal.Body>

          <div className="mb-2">
              <div className="form-label">時間</div>
              <select placeholder="時間" onChange={handleChange("time")} value={time} className="form-control">
                        <option value="">Select</option>
                    <option value="08:00"> 08:00 </option>
                    <option value="09:00"> 09:00 </option>
                    <option value="09:30"> 09:30 </option>
                    <option value="10:00"> 10:00 </option>
                    <option value="10:00"> 10:30 </option>
                    <option value="11:00"> 11:00 </option>
                    <option value="11:00"> 11:30 </option>
                    <option value="12:00"> 12:00 </option>
                    <option value="12:40"> 12:30 </option>
                    <option value="12:40"> 12:40 </option>
                    <option value="13:00"> 13:00 </option>
                    <option value="13:30"> 13:30 </option>
                    <option value="14:00"> 14:00 </option>
                    <option value="14:00"> 14:30 </option>
                    <option value="15:00"> 15:00 </option>
                    <option value="15:30"> 15:30 </option>
                    <option value="16:00"> 16:00 </option>
                    <option value="16:00"> 16:30 </option>
                    <option value="17:00"> 17:00 </option>
                    <option value="17:40"> 17:40 </option>
                    <option value="18:00"> 18:00 </option>
                    <option value="18:30"> 18:30 </option>
                    <option value="19:00"> 19:00 </option>
                    <option value="19:30"> 19:30 </option>
                    <option value="20:00"> 20:00 </option>
                    <option value="20:30"> 20:30 </option>
                </select>
          </div>


          <div className="mb-2">
              <div className="form-label">選考</div>
              <select placeholder="選考" onChange={handleChange("phase")} value={phase} className="form-control">
                  <option value="">Select</option>
                    <option value="1次"> 1次 </option>
                    <option value="2次"> 2次 </option>
                    <option value="最終"> 最終 </option>
                    <option value="NG"> NG</option>
                    <option value="終了"> 終了</option>
                </select>
          </div>




          <div className="mb-2">
          <label className="form-label">Date</label>
           <input type="text" onChange={handleChange("event_day")} value={event_day} class="form-control"/>
          </div>

          <div className="mb-2">
            <label className="form-label">Day</label>
            <select placeholder="time_period" onChange={handleChange("time_period")} value={time_period} className="form-control">
                  <option value="">Select</option>
                  <option value="1日"> 1日</option>
                  <option value="2日"> 2日 </option>
                  <option value="3日"> 3日 </option>
              </select>
          </div>


          <div className="mb-2">
            <label className="form-label">Category</label>
            <select placeholder="category" onChange={handleChange("category")} value={category} className="form-control">
                  <option value="">Select</option>
                  <option value="面接"> 面接</option>
                  <option value="試験"> 試験 </option>
                  <option value="説明会"> 説明会 </option>
                  <option value="Skype"> Skype </option>
                  <option value="Web Test"> Web Test </option>
              </select>
          </div>
    </Modal.Body>
    <Modal.Footer>
        <button type="submit" onClick={clickSubmit} className="btn btn-primary ml-auto">Submit</button>
    </Modal.Footer>
    </form>
  </Modal>
  </div>
    );

    return (
      <span>
          {success ? showSuccess() : interviewUpdate(time, phase, result, time_period, category)}
          {redirectUser()}
      </span>
    );
};

export default withRouter(AddInterviewItem);
