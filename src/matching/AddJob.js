import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { createJob } from "./apiMatching";
import SiteWrapper from '../templates/SiteWrapper'
import { isAuthenticates } from '../auth';
import {
  Page,
  Grid,
} from "tabler-react";

const AddJob = ({history}) => {
    const [values, setValues] = useState({
      name: '',
      skills: '',
      keywords: "",
      error: false,
      success: false,
      redirectToProfile: false
    });

    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const { name, skills, keywords, error, success, redirectToProfile } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        createJob(  darwin_uid, darwin_myTk, { name, skills, keywords}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    skills: '',
                    keywords: "",
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
         <h4 class="card-title">Add Job</h4>
        </div>
        <div class="card-body">

          <div class="mb-2">
            <label class="form-label">Name</label>
            <input onChange={handleChange('name')} type="text" class="form-control" value={name} />
          </div>

          <div class="mb-2">
            <label class="form-label">Skills</label>
            <input onChange={handleChange('skills')} type="text" class="form-control" value={skills} />
          </div>

          <div class="mb-2">
            <label class="form-label">Keywords</label>
            <input onChange={handleChange('keywords')} type="text" class="form-control" value={keywords} />
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
            New Job is created!
        </div>
    );


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

export default withRouter(AddJob);
