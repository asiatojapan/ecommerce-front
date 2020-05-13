import React, { useState, useEffect } from 'react';
import { isAuthenticates } from '../auth';
import { withRouter } from 'react-router-dom';
import { updateInterview, getInterview, getUsers } from './apiAdmin';
import { getStudents } from '../core/apiCore';
import Modal from 'react-bootstrap/Modal';


const UpdateInterview = ({ interviewId, match, history }) => {
    const [values, setValues] = useState({
        name: "",
        interviewType: "",
        studentStatus: "",
        companyStatus: "",
        status: "",
        companyRank: "",
        companyRate: "",
        reason: "",
        company: "",
        student: "",
        error: false,
        success: false,
        redirectToProfile: false,
        formData: ''
    });

    const [ users, setUsers] = useState([]);
    const [ students, setStudents] = useState([]);
    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const { 
        company, 
        student, 
        name, 
        interviewType,
        studentStatus, 
        companyStatus, 
        status, 
        companyRank, 
        companyRate, 
        reason,  
        formData,
        error, 
        success, 
        redirectToProfile
    } = values;

    const init = interviewId => {
        // console.log(userId);
        getInterview(interviewId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, company: data.company, student: data.student,
                interviewType: data.interviewType, studentStatus: data.studentStatus, companyStatus: data.companyStatus, 
                status: data.status, companyRate: data.companyRank, companyRate: data.companyRate, reason: data.reason, 
                formData: new FormData()});
            }
        });
        initUsers();
        initStudents();
    };

    const initUsers = () => {
        getUsers(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setUsers(data);
            }
        });
    };

    const initStudents = () => {
        getStudents(darwin_uid, darwin_myTk).then(data => {
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

    const handleChange = name => event => {
        const value = name === 'upload_fyp' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
  };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateInterview(interviewId, darwin_uid, darwin_myTk, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
              setValues({
                  ...values,
                  company: "", 
                  student: "", 
                  interviewType: "", 
                  studentStatus: "", 
                  companyStatus: "", 
                  status: "", 
                  companyRate: "", 
                  companyRate: "", 
                  reason: "",
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

    const interviewUpdate = () => (
      <div>
      <a onClick={handleShow}>
       Update
     </a>

     <Modal show={show} onHide={handleClose}>
     <form onSubmit={clickSubmit}>
       <Modal.Header> Update Interview
       </Modal.Header>
       <Modal.Body>
           <div class="mb-2">
              <div class="form-label">Interview Type</div>
              <select placeholder="Select English level" onChange={handleChange("interviewType")} value={values.interviewType} name="interviewType" class="form-control">       
                    <option value=""> Select </option>
                    <option value="Nil"> Nil </option>
                    <option value="Japan"> 日本 </option>
                    <option value="Skype"> Skype </option>
                </select>
          </div>


          <div class="mb-2">
              <div class="form-label">Company Status</div>
              <select placeholder="選考" onChange={handleChange("companyStatus")} value={values.companyStatus} class="form-control">
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
              <select placeholder="選考" onChange={handleChange("studentStatus")} value={values.studentStatus} class="form-control">
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
            <select placeholder="status" onChange={handleChange("status")} value={values.status} class="form-control">
                  <option value="">Select</option>
                  <option value="選考"> 選考</option>
                  <option value="終了"> 終了 </option>
                  <option value="辞退"> 辞退 </option>
              </select>
          </div>

          
    </Modal.Body>
    <Modal.Footer>
    <a class="btn btn-link" onClick={() => history.goBack()}>Cancel</a>
                      <button type="submit" class="btn btn-primary ml-auto">Submit</button>
                    </Modal.Footer>
    </form>
  </Modal>
  </div>
    );

    return (
      <span>
          {interviewUpdate()}
          {redirectUser()}
      </span>
    );
};

export default withRouter(UpdateInterview);
