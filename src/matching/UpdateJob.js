import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { readJob, updateJob } from "./apiMatching"
import SiteWrapper from '../templates/SiteWrapper'
import { isAuthenticates } from '../auth';
import {
  Page,
  Grid,
} from "tabler-react";

const UpdateJob = ({match, history}) => {
    const [values, setValues] = useState({
      name: '',
      skills: '',
      error: false,
      success: false,
      redirectToProfile: false
    });

    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const { name, skills, error, success, redirectToProfile } = values;

    const init = jobId => {
        // console.log(userId);
        readJob(jobId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, skills: data.skills });
            }
        });
    };

    useEffect(() => {
        init(match.params.jobId);
    }, []);


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        updateJob(match.params.jobId, darwin_uid, darwin_myTk, { name, skills}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    skills: data.skills,
                    redirectToProfile: true,
                    success: true
                });
            }
        });
    };

    const form = () => (
        <form>
        <div class="card">
        <div class="card-header">
         <h4 class="card-title">Update Job</h4>
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
            Job is updated!
        </div>
    );

    const redirectBack = () => {
        if (redirectToProfile) {
            if (!error) {
                history.goBack();
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
            {form()}
            {redirectBack()}
            </Grid.Col>
        </Grid.Row>
        </Page.Content>
    </SiteWrapper>
    );
};

export default withRouter(UpdateJob);