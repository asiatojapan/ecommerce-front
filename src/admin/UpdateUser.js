import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect, withRouter } from 'react-router-dom';
import {Form, Select, Input, Button, DatePicker } from 'antd';
import { PageHeader } from 'antd';
import { getSalesRep } from "./apiAdmin";
import { read, update, updateUser } from '../user/apiUser';
import SiteWrapper from '../templates/SiteWrapper';

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

const UpdateUser = ({ match, history }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        phase: "",
        round: "",
        sales_rep: "",
        users: [],
        logo: "",
        descriptionOne: "",
        descriptionTwo: "",
        descriptionThree: "",
        descriptionFour: "",
        descriptionFive: "",
        descriptionSix: "",
        homepageUrl: "",
        error: false,
        success: false,
        redirectUser: false
    });

    const [users, setUsers] = useState([]);
    const { token } = isAuthenticated();
    const { name, email, password, role, phase, round, sales_rep,  error, success,
      logo, descriptionOne,
      descriptionTwo, descriptionThree, descriptionFour, descriptionFive, descriptionSix, homepageUrl } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email, role: data.role, phase: data.phase,
                round: data.round, sales_rep: data.sales_rep,
                logo: data.logo,
                descriptionOne: data.descriptionOne,
                descriptionTwo: data.descriptionTwo,
                descriptionThree: data.descriptionThree,
                descriptionFour: data.descriptionFour,
                descriptionFive: data.descriptionFive,
                descriptionSix: data.descriptionSix,
                homepageUrl: data.homepageUrl });
            }
        });
    };


    const initUsers = () => {
        getSalesRep().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setUsers(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
        initUsers();
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, role, phase, round, sales_rep, password,
          logo, descriptionOne,
          descriptionTwo, descriptionThree, descriptionFour, descriptionFive, descriptionSix, homepageUrl }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
              setValues({
                  ...values,
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  phase: data.phase,
                  round: data.round,
                  sales_rep: data.sales_rep,
                  success: true
              });
            }
        });
    };

    const redirectUser = () => {
        if (success) {
              window.scrollTo(0, 0);

        }
    };


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

    const profileUpdate = (name, email, password, role, round, phase, sales_rep ) => (

        <form>
        <div class="card">
          <div class="card-header">
           <h4 class="card-title">Update User</h4>
          </div>
          <div class="card-body">

          <div class="row">

            <div class="col-md-6 col-xl-6">
              <div class="mb-2">
                <label class="form-label">Name</label>
                <input onChange={handleChange('name')} type="text" class="form-control" value={name} />
              </div>
              <div class="mb-2">
                <label class="form-label">Email</label>
                <input onChange={handleChange('email')} type="text" class="form-control" value={email} />
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
              <div class="mb-2">
                  <div class="form-label">Role</div>
                  <select placeholder="Role" onChange={handleChange("role")} value={role}  class="form-control">
                    <option value=""> Select </option>
                    <option value="0"> User </option>
                    <option value="1"> Admin </option>
                    </select>
                  </div>
            </div>


            <div class="col-md-6 col-xl-6">
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
                  <label class="form-label">Phase Memo</label>
                  <input onChange={handleChange("phase")} value={phase} name="phase" class="form-control"/>
                </div>

                <div class="mb-2">
                  <label class="form-label">Logo</label>
                  <input onChange={handleChange("logo")} value={logo} name="logo" class="form-control"/>
                </div>

                <div class="mb-2">
                  <label class="form-label">Homepage Url</label>
                  <input onChange={handleChange("homepageUrl")} value={homepageUrl} name="homepageUrl" class="form-control"/>
                </div>

              </div>
            </div>

          <div class="mb-2">
            <label class="form-label"> 事業内容/Business Field	</label>
            <textarea onChange={handleChange("descriptionSix")} value={descriptionSix} rows="5" name="descriptionSix" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">選考ステップ / Steps	</label>
            <textarea onChange={handleChange("descriptionOne")} value={descriptionOne} rows="5" name="descriptionOne" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> １次面接内容 / First Interview Details	</label>
            <textarea onChange={handleChange("descriptionTwo")} value={descriptionTwo} rows="5" name="descriptionTwo" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> ２次面接内容 / Second Interview Details		</label>
            <textarea onChange={handleChange("descriptionThree")} value={descriptionThree} rows="5" name="descriptionThree" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> 最終面接内容 / Final Interview Details </label>
            <textarea onChange={handleChange("descriptionFour")} value={descriptionFour} rows="5" name="descriptionFour" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> 参考/Please refer to this website in advance.		</label>
            <textarea onChange={handleChange("descriptionFive")} value={descriptionFive} rows="5" name="descriptionFive" class="form-control"/>
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

    return (
      <SiteWrapper>
      <Page.Content>
      <Grid.Row>
      <Grid.Col width={12}>
      {showSuccess()}
      {showError()}
      {redirectUser()}
          {profileUpdate(name, email, password, role, round, phase, sales_rep, logo, descriptionOne,
          descriptionTwo, descriptionThree, descriptionFour, descriptionFive, descriptionSix, homepageUrl)}
          </Grid.Col>
          </Grid.Row>
          </Page.Content>
      </SiteWrapper>
    );
};

export default withRouter(UpdateUser);
