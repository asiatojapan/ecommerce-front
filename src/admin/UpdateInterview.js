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
        interviewType: "",
        studentStatus: "",
        companyStatus: "",
        status: "",
        result: "",
        companyRank: "",
        companyRate: "",
        reason: "",
        company: "",
        student: "",
        error: false,
        success: false,
        redirectToProfile: false,
    });

    const [ users, setUsers] = useState([]);
    const [ students, setStudents] = useState([]);

    const { user, token } = isAuthenticated();

    const { company, student, name, interviewType, studentStatus, companyStatus, status, companyRank, companyRate, reason,  error, success, redirectToProfile} = values;

    const init = interviewId => {
        // console.log(userId);
        getInterview(interviewId).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, company: data.company, student: data.student,
                interviewType: data.interviewType, studentStatus: data.studentStatus, companyStatus: data.companyStatus, 
            status: data.status, companyRate: data.companyRank, companyRate: data.companyRate, reason: data.reason});
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
        updateInterview(interviewId,  user._id, token, {company, student, interviewType, companyStatus, studentStatus, status}).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
              setValues({
                  ...values,
                  company: data.company, student: data.student, interviewType: data.interviewType, studentStatus: data.studentStatus, companyStatus: data.companyStatus, 
                  status: data.status, companyRate: data.companyRate, companyRate: data.companyRank, reason: data.reason,
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

    const interviewUpdate = (company, student, interviewType, companyStatus, studentStatus, status) => (
      <div>
      <a onClick={handleShow}>
       Update
     </a>

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
              <div class="form-label">Interview Type</div>
              <select placeholder="Type" onChange={handleChange("interviewType")} value={interviewType} class="form-control">
                    <option value=""> Select </option>
                    <option value="Nil"> Nil </option>
                    <option value="Japan"> 日本 </option>
                    <option value="Skype"> Skype </option>
                </select>
          </div>


          <div class="mb-2">
              <div class="form-label">Company Status</div>
              <select placeholder="選考" onChange={handleChange("companyStatus")} value={companyStatus} class="form-control">
                  <option value="">Select</option>
                    <option value="Nil"> Nil </option>
                    <option value="Asking"> Ask </option>
                    <option value="Waiting"> まち </option>
                    <option value="Confirmed"> Confirmed</option>
                    <option value="NG"> NG </option>
                </select>
          </div>

          <div class="mb-2">
              <div class="form-label">Student Status</div>
              <select placeholder="選考" onChange={handleChange("studentStatus")} value={studentStatus} class="form-control">
                  <option value="">Select</option>
                    <option value="Nil"> Nil </option>
                    <option value="Asking"> Ask </option>
                    <option value="Waiting"> まち </option>
                    <option value="Confirmed"> Confirmed</option>
                    <option value="NG"> NG </option>
                </select>
          </div>

          <div class="mb-2">
            <label class="form-label">Status</label>
            <select placeholder="status" onChange={handleChange("status")} value={status} class="form-control">
                  <option value="">Select</option>
                  <option value="選考"> 選考</option>
                  <option value="終わる"> 終わる </option>
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
          {interviewUpdate(company, student, interviewType,  companyStatus, studentStatus, status)}
          {redirectUser()}
      </span>
    );
};

export default withRouter(UpdateInterview);
