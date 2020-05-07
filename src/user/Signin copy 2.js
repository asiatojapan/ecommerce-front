import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {signin, authenticate, isAuthenticates, isAuthenticated} from "../auth"
import Logo from '../templates/Logo.png'
import { connect } from "react-redux";
import { login } from "../actions/session";

const mapStateToProps = ({ errors }) => ({
    errors
}); 

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
  });
  
const Signin = ({ login, errors }) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        loading: false,
    });

    const { email, password, loading  } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        login({ email, password })
        
    };

    const showError = () => (
        <div>
        { errors ? <div className="login-form-errors" >
              {errors.message}
     </div> : null } 
       </div>
    )

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



  return (
      <div className="page" style={{height: "100vh"}}>
               <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
        {showError()}
       {forms()}
      </div>
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Signin);
  
