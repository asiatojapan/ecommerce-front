import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {signin, authenticate, isAuthenticates} from "../auth"
import Logo from '../templates/Logo.png'
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
  });
  
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
  });
      
const Signin = ({ logout, session }) => {
    const [values, setValues] = useState({
        email: "2aaddd@a.com",
        password: "password6",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;

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
                    // setAuthTokens(data.user.name);
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const showError = () => (
        <div className="login-form-errors" style={{ display: error ? "" : "none" }}>
              {error}
       </div>
    );

    const forms = () => (
        <div className="page-single">
            <div className="container">
                <div className="row">
                    <div className="col col-login mx-auto">
                            <form className="list-list" autocomplete="off" style={{padding: "0em"}}>
                                <div className="card-body p-6">
                                <div className="text-center mb-6">
                                <img src={Logo} className="text-center" height="100px" alt="logo"/></div>
                                    <div className="card-title text-center">ASIA to JAPAN</div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input 
                                            placeholder="Email" onChange={handleChange("email")}
                                            type="email"
                                            className="form-control" 
                                            name="email"
                                            value={email}
                                            /></div>
                                        <div className="form-group"><label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            placeholder="Password"   onChange={handleChange("password")}
                                                type="password"
                                                className="form-control"
                                                value={password}
                                            /></div>  Admin: <br/>
                                            jiahuilum@gmail.com <br/>
                                            Password1<br/>
                                            Unregistered User:<br/>
                                            tester@a.com<br/>
                                            password1
                                          
                                        <div className="form-footer"><button className="unlikeBtn resumeGradient fullWidth" type="submit"  onClick={clickSubmit}>Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
    </div>
    )


  const redirectUser = () => {
    if (redirectToReferrer) {
     return <Redirect to="/welcome" />
    }
  };

  return (
      <div className="page" style={{height: "100vh"}}>
               <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
       {showError()}
       {forms()}
       {redirectUser()}
      </div>
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Signin);
  
