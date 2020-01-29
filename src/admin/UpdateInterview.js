import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { updateInterview, getInterview, getUsers } from './apiAdmin';
import { getStudents } from '../core/apiCore';
import SiteWrapper from '../templates/SiteWrapper'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  Page,
  Dropdown,
  Icon,
  Grid,
  Card,
  Text,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";

const UpdateInterview = ({ interviewId, match, history }) => {
    const [values, setValues] = useState({
        name: "",
        time: "",
        phase: "",
        result: "",
        company: "",
        student: "",
        time_period: "",
        category: "",
        error: false,
        success: false,
        redirectToProfile: false,
    });

    const [ users, setUsers] = useState([]);
    const [ students, setStudents] = useState([]);

    const { user, token } = isAuthenticated();

    const { company, student, name, time, phase, result, time_period, category, error, success, redirectToProfile} = values;

    const init = interviewId => {
        // console.log(userId);
        getInterview(interviewId).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, company: data.company, student: data.student, time: data.time, result: data.result, phase: data.phase, category: data.category, time_period: data.time_period });
            }
        });
        initUsers();
        initStudents();
    };

    const initUsers = () => {
        getUsers().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setUsers(data);
            }
        });
    };

    const initStudents = () => {
        getStudents().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setStudents(data);
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
        updateInterview(interviewId,  user._id, token, { company, student, time, phase, result, time_period, category }).then(data => {
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
                  redirectToProfile: true
              });
            }
        });
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


        const showError = () => (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );

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

    const interviewUpdate = (company, student, time,  phase, result, time_period, category) => (
      <div>
      <Button className="btn btn-sm btn-secondary ml-2" variant="primary" onClick={handleShow}>
       Update
     </Button>

     <Modal show={show} onHide={handleClose}>
     <form>
       <Modal.Header closeButton> Update Interview
       </Modal.Header>
       <Modal.Body>
          <div class="mb-2">
              <div class="form-label">企業</div>
              <select placeholder="企業" onChange={handleChange("company")} value={company} class="form-control">
                {users && users.map((c, i) => (
                    <option key={i} value={c._id}>
                          {c.name}
                    </option>))}
                </select>
          </div>

          <div class="mb-2">
              <div class="form-label">学生</div>
              <select placeholder="企業" onChange={handleChange("student")} value={student} class="form-control">
                {students && students.map((c, i) => (
                    <option key={i} value={c._id}>
                          {c.studentid}
                    </option>))}
                </select>
          </div>

          <div class="mb-2">
              <div class="form-label">時間</div>
              <select placeholder="時間" onChange={handleChange("time")} value={time} class="form-control">
                    <option value="08:00"> 08:00 </option>
                    <option value="09:00"> 09:00 </option>
                    <option value="10:00"> 10:00 </option>
                    <option value="11:00"> 11:00 </option>
                    <option value="12:00"> 12:00 </option>
                    <option value="12:40"> 12:40 </option>
                    <option value="13:00"> 13:00 </option>
                    <option value="14:00"> 14:00 </option>
                    <option value="15:00"> 15:00 </option>
                    <option value="16:00"> 16:00 </option>
                    <option value="17:00"> 17:00 </option>
                    <option value="18:00"> 18:00 </option>
                </select>
          </div>


          <div class="mb-2">
              <div class="form-label">選考</div>
              <select placeholder="選考" onChange={handleChange("phase")} value={phase} class="form-control">
                    <option value="1次"> 1次 </option>
                    <option value="2次"> 2次 </option>
                    <option value="最終"> 最終 </option>
                    <option value="NG"> NG</option>
                    <option value="終了"> 終了</option>
                </select>
          </div>

          <div class="mb-2">
            <label class="form-label">結果</label>
            <select placeholder="結果" onChange={handleChange("result")} value={result} class="form-control">
                  <option value="Nil"> </option>
                  <option value="合格"> ● </option>
                  <option value="不合格"> X </option>
                  <option value="三角"> ▲</option>
                  <option value="辞退"> 辞退　</option>
                  <option value="内定"> 内定　</option>
              </select>
          </div>

          <div class="mb-2">
            <label class="form-label">Day</label>
            <select placeholder="time_period" onChange={handleChange("time_period")} value={time_period} class="form-control">
                  <option value="1日"> 1日</option>
                  <option value="2日"> 2日 </option>
                  <option value="3日"> 3日 </option>
              </select>
          </div>

          <div class="mb-2">
            <label class="form-label">Category</label>
            <select placeholder="category" onChange={handleChange("category")} value={category} class="form-control">
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
  </div>
    );

    return (
      <span>

          {interviewUpdate(company, student, time, phase, result, time_period, category)}
          {redirectUser()}
      </span>
    );
};

export default withRouter(UpdateInterview);
