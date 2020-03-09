import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {signin, authenticate, isAuthenticates} from "../auth"
import Logo from '../templates/Logo.png'

const Signin = () => {
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
        <div class="login-form-errors" style={{ display: error ? "" : "none" }}>
              {error}
       </div>
    );

    const forms = () => (
        <div class="page-single">
            <div class="container">
                <div class="row">
                    <div class="col col-login mx-auto">
                            <form class="list-list" autocomplete="off" style={{padding: "0em"}}>
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
                                            lumjiahui@asiatojapan.com <br/>
                                            atoJ2018<br/>
                                            Unregistered User:<br/>
                                            tester@a.com<br/>
                                            password1

                                        <div class="form-footer"><button class="unlikeBtn resumeGradient fullWidth" type="submit"  onClick={clickSubmit}>Login</button>
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
     return <Redirect to="/" />
    }
  };

  return (
      <div className="page" style={{height: "100vh"}}>
               <div class="loading" style={{ display: loading ? "" : "none" }}>
            <div class="loaderSpin"></div>
        </div>
       {showError()}
       {forms()}
       {redirectUser()}
      </div>
  );
};

export default Signin;
