import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { Link } from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from "../auth"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import Logo from '../templates/Logo.png'

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
      <main>
  <div class="cover bg-left bg-center-l" >

  <div class="login dt w-100 dib v-mid">
  <div class="dtc v-mid mid-gray ph3 ph4-l">
  <form class="measure center ">
    <fieldset id="sign_up" class="bb b--transparent ph0 mh0">
      <legend class="f2 fw6 ph0 mh0 center tc">Sign In</legend>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" for="email-address">Email</label>
        <input
               prefix={<Icon type="user"/>}
               placeholder="Username" onChange={handleChange("email")}
               type="email"
               class="pa2 ba br2 bg-transparent b--black-20 w-100"
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
                 className="b--black-20 pa2 input-reset ba br2 bg-transparent w-100"
                 value={password}
             />
      </div>
    </fieldset>
    <div class="center tc">

    <button block type="primary" htmlType="submit" className="f6 link dim br2 ph4 pv2 mb2 dib white bg-dark-blue pointer" onClick={clickSubmit}>
     Log In
   </button>
    </div>
    Admin: <br/>
    a@a2.com <br/>
    password1
  </form>
  </div>
  </div>
  </div>
  </main>
    );

    const showError = () => (
        <div class="login-form-errors" style={{ display: error ? "" : "none" }}>
              {error}
              </div>
    );

    const formss = () => (
        <div class="page-single">
            <div class="container">
                <div class="row">
                    <div class="col col-login mx-auto">
                            <form class="card" autocomplete="off">
                                <div class="card-body p-6">
                                <div class="text-center mb-6">
                                <img src={Logo} class="text-center" height="100px" alt="logo"/></div>
                                    <div class="card-title text-center">ASIA to JAPAN</div>
                                    <div class="form-group">
                                        <label class="form-label">Email Address</label>
                                        <input 
                                            placeholder="Email" onChange={handleChange("email")}
                                            type="email"
                                            class="form-control" 
                                            name="email"
                                            value={email}
                                            /></div>
                                        <div class="form-group"><label class="form-label">Password</label>
                                        <input
                                            type="password"
                                            placeholder="Password"   onChange={handleChange("password")}
                                                type="password"
                                                class="form-control"
                                                value={password}
                                            /></div>  Admin: <br/>
                                            a@a2.com <br/>
                                            password1
                                        <div class="form-footer"><button class="btn btn-block btn-primary" type="submit"  onClick={clickSubmit}>Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
    </div>
    )
 

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
            return <Redirect to="/" />;
        }
    }
    if (isAuthenticated()) {
        return <Redirect to="/" />;
    }
  };

  return (
      <div className="page" style={{height: "100vh"}}>
               <div class="loading" style={{ display: loading ? "" : "none" }}>
            <div class="loaderSpin"></div>
        </div>
       {showError()}
       {formss()}
       {redirectUser()}
      </div>
  );
};

export default Signin;
