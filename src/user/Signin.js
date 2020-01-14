import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { Link } from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from "../auth"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const Signin = () => {
    const [values, setValues] = useState({
        email: "2aaddd@a.com",
        password: "password6",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signInForm = () => (
  <div class="cover bg-left bg-center-l" >
  <article class="vh-100 dt w-100 bg-near-white">
  <div class="dtc v-mid mid-gray ph3 ph4-l">
  <form class="measure center">
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend class="f2 fw6 ph0 mh0">Sign In</legend>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" for="email-address">Email</label>
        <input
               prefix={<Icon type="user"/>}
               placeholder="Username" onChange={handleChange("email")}
               type="email"
               class="pa2 input-reset ba bg-transparent w-100"
               value={email}
             />
        </div>
      <div class="mv3">
        <label class="db fw6 lh-copy f6" for="password">Password</label>
        <input
               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
               type="password"
               placeholder="Password"   onChange={handleChange("password")}
                 type="password"
                 className="b pa2 input-reset ba bg-transparent w-100"
                 value={password}
             />
      </div>
    </fieldset>
    <div class="">
    <button block type="primary" htmlType="submit" className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={clickSubmit}>
     ログイン
   </button>
    </div>
  </form>
  </div>
</article>
  </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Logging In...</h2>
            </div>
        );

  const redirectUser = () => {
    if (redirectToReferrer) {
        if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard" />;
        } else {
            return <Redirect to="/user/dashboard" />;
        }
    }
    if (isAuthenticated()) {
        return <Redirect to="/" />;
    }
  };

  return (
      <div className="full-height">
       {showLoading()}
       {showError()}
       {signInForm()}
       {redirectUser()}
      </div>
  );
};

export default Signin;
