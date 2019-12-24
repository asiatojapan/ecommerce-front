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
       <Form className="login-form">
        <Title　style={{ textAlign: "center"}}>Login to
        ASIA to JAPAN
        </Title>
       <Form.Item>
       <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username" onChange={handleChange("email")}
              type="email"
              className="form-control"
              value={email}
            />
      </Form.Item>
      <Form.Item>
      <Input
             prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
             type="password"
             placeholder="Password"   onChange={handleChange("password")}
               type="password"
               className="form-control"
               value={password}
           />
      </Form.Item>
      <Button block type="primary" htmlType="submit" className="login-form-button" onClick={clickSubmit}>
       ログイン
     </Button>
    </Form>
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
      <Row type="flex" justify="space-around" align="middle" height="100vw" className="full-height">

       <Col span={8} offset={0}>
       {showLoading()}
       {showError()}
       {signInForm()}
       {redirectUser()}
       </Col>

      </Row>
      </div>
  );
};

export default Signin;
