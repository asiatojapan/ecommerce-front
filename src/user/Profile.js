import React, { useState, useEffect } from 'react';
import SiteWrapper from '../templates/SiteWrapper';
import { isAuthenticates } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import {Select, Input } from 'antd';
import {
    Container,
    Grid, Form, Avatar
  } from "tabler-react";
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { darwin_uid, darwin_myTk } = isAuthenticates();
    const { name, email, password, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, darwin_myTk, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const profile = () => (
        <Grid.Row>
            <Grid.Col width={12} lg={3} sm={12}>
            <div class="list-list"> 
            <div class="card-body text-center">
            <Avatar color="blue"> {name.charAt(0)} </Avatar>
                <h3 class="h3 mt-0 mb-4 mb-3">{name}</h3>
                <p class="mb-4"></p>
                <ul class="list list-inline social-links">
                    <li class="list-inline-item">
                        <button class="btn btn-sm btn-twitter">
                           Follow</button>
                            </li></ul></div>
            </div>
            </Grid.Col>
            <Grid.Col width={12} lg={9} sm={12}>
            <div class="list-list"> 
            
            <h2 class="card-title"> Profile</h2>
            <Form.Group label="Name">
                <Form.Input
                    disabled
                    name="example-disabled-text-input"
                    value={name}
                />
                </Form.Group>
                <Form.Group label="Email">
                <Form.Input
                    disabled
                    name="example-disabled-text-input"
                    value={email}
                />
                </Form.Group>
            </div>
            </Grid.Col>
            </Grid.Row>
    )

    return (
        <SiteWrapper>
            <Container>
            {profile()}
            {redirectUser(success)}
          
            </Container>
        </SiteWrapper >
    );
};

export default Profile;
