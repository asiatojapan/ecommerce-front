import React, { Component, useState }  from 'react';
import { forgotPassword } from './apiUser';

import SiteWrapper from '../templates/SiteWrapper'

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: 'lumjiahui@asiatojapan.com',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false });
            }
        });
    };

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}
                    placeholder="Type your email"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">Send password reset link</button>
            </div>
        </form>
    );

    return (
        <SiteWrapper>
            <div className="container">
                <h2>Forgot password</h2>
                {showError()}
                {showMessage()}
                {showForm && passwordForgotForm()}
            </div>
      </SiteWrapper>
    );
};

export default ForgotPassword;