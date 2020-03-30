import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { signup } from '../auth';
import { getSalesRep } from "./apiAdmin";
import SiteWrapper from '../templates/SiteWrapper'
import { isAuthenticates } from '../auth';
import {
  Page,
  Grid,
} from "tabler-react";

const AddUser = ({history}) => {
    const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      role: '',
      phase: "",
      round: "",
      sales_rep: "",
      specialPlan: "", 
      error: false,
      success: false,
      redirectToProfile: false
    });

    const [users, setUsers] = useState([]);


    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const { name, email, password, role, phase, round, specialPlan, sales_rep, error, success, redirectToProfile } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };


    const initUsers = () => {
        getSalesRep(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setUsers(data);
            }
        });
    };

    useEffect(() => {
        initUsers();
    }, []);


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password, role, round, sales_rep, specialPlan }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    role: "",
                    round: "",
                    specialPlan: "", 
                    redirectToProfile: true,
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
        <div class="card">
        <div class="card-header">
         <h4 class="card-title">Add User</h4>
        </div>
        <div class="card-body">

          <div class="mb-2">
            <label class="form-label">Name</label>
            <input onChange={handleChange('name')} type="text" class="form-control" value={name} />
          </div>

          <div class="mb-2">
            <label class="form-label">Email</label>
            <input onChange={handleChange('email')} type="text" class="form-control" value={email} />
          </div>

          <div class="mb-2">
            <label class="form-label">Password</label>
            <input onChange={handleChange('password')} type="password" class="form-control" value={password} />
          </div>
    
          <div class="mb-2">
              <div class="form-label">Role</div>
              <select placeholder="Role" onChange={handleChange("role")} value={role}  class="form-control">
              <option value=""> Select </option>
                    <option value="0"> 参加企業 </option>
                    <option value="3"> 閲覧企業​ </option>
                    <option value="2"> Unregistered User </option>
                    <option value="1"> Admin </option>
                    <option value="4"> Mentor </option>
                  
                </select>
          </div>

          <div class="mb-3">
              <div class="form-label">Phase</div>
              <select placeholder="Phase" onChange={handleChange("round")} value={round}　class="form-control">
              <option value=""> Select </option>
              <option value="Phase I"> Phase I </option>
              <option value="Phase II"> Phase II </option>
              <option value="Phase III"> Phase III </option>
              <option value="Phase IV"> Phase IV </option>
                </select>
          </div>

          <div class="mb-2">
                <div class="form-label">営業担当</div>
                  <select placeholder="営業" onChange={handleChange("sales_rep")} value={sales_rep} class="form-control">
                    {users && users.map((c, i) => (
                        <option key={i} value={c._id}>
                      
                              {c.name}
                        </option>))}
                    </select>
                    </div>


          <div class="mb-3">
              <div class="form-label">Special Plan</div>
              <select placeholder="Plan" onChange={handleChange("specialPlan")} value={specialPlan}　class="form-control">
              <option value=""> Select </option>
              <option value="true"> True </option>
              <option value="false"> False </option>
                </select>
          </div>

          

          </div>
          <div class="card-footer text-right">
              <div class="d-flex">
                <a class="btn btn-link" onClick={() => history.goBack()}>Cancel</a>
              <button type="submit" onClick={clickSubmit} class="btn btn-primary ml-auto">Submit</button>
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
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created!
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/users" />;
            }
        }
    };

    return (
      <SiteWrapper>
      <Page.Content>
      <Grid.Row>
      <Grid.Col width={12}>
            {showSuccess()}
            {showError()}
            {signUpForm()}
            </Grid.Col>
            </Grid.Row>
            </Page.Content>
        </SiteWrapper>
    );
};

export default withRouter(AddUser);
