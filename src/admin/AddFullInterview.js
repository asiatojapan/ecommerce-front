import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { createInterview, updateInterview, getInterview, getUsers } from './apiAdmin';
import { getStudents } from '../core/apiCore';
import SiteWrapper from '../templates/SiteWrapper'
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

const AddFullInterview = ({ history }) => {
  const [values, setValues] = useState({
      name: "",
      time: "",
      phase: "",
      result: "",
      company: "",
      student: "",
      time_period: "",
      category: "",
      createdInterview: "",
      error: false,
      success: false,
      loading: false,
      redirectToProfile: false,
  });

  const [ users, setUsers] = useState([]);

  const [ students, setStudents] = useState([]);

  const { user, token } = isAuthenticated();
  const { company, student, name, time, phase, result, time_period, category, error, success, createdInterview, loading, redirectToProfile} = values;

  const init = interviewId => {
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
      init();
  }, []);

  const handleChange = name => e => {
      setValues({ ...values, error: false, [name]: e.target.value });
      console.log(company)
  };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createInterview( student, company, token, { time, phase, result, time_period, category }).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
      <form onSubmit={clickSubmit}>
      <div class="card">
      <div class="card-body">
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


            </div>
             <div class="card-footer text-right">
                             <div class="d-flex">
                               <a class="btn btn-link" onClick={() => history.goBack()}>Cancel</a>
                               <button type="submit" class="btn btn-primary ml-auto">Submit</button>
                             </div>
                           </div>
               </div>

        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdInterview ? '' : 'none' }}>
            <h2>{`${createdInterview}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
      <SiteWrapper>
      <Page.Content>
      <Grid.Row>
      <Grid.Col width={12}>
                  {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    </Grid.Col>
                    </Grid.Row>
                    </Page.Content>
                </SiteWrapper>
    );
};

export default withRouter(AddFullInterview);
