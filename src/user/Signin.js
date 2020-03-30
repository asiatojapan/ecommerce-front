import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {signin, authenticate, isAuthenticates, isAuthenticated} from "../auth"
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
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });


    const { user } = isAuthenticates();
    const [role, setRole] = useState()
    const { email, password, loading, error, redirectToReferrer, welcomePage } = values;

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
                    // console.log(data)
                    setRole(data.user.role);
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
                                            /></div> 
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
        if (role === 4) {
            // console.log(role)
            return <Redirect to="/mugicha" />; 
        } else {
            return <Redirect to="/" />;
        }
    }
  };

  return (
      <div className="page" style={{height: "100vh"}}>
               <div className="loading" style={{ display: welcomePage ? "" : "none" }}>
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
  
