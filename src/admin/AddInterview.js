import React, { useState, useEffect } from "react";
import { isAuthenticated, getUser } from "../auth";
import { Link } from "react-router-dom";
import { createInterview } from "./apiAdmin";
import { Button } from 'antd';

const AddInterview = ({student, userIdFromTable })  => {


    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();


    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createInterview(student, userIdFromTable, token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newLikeForm = () => {
        return  <a className="f6 link dim ba ph3 pv2 mb2 dib black" onClick={ clickSubmit } href="#0">Add to Interview</a>
    };

    return (
            <div>
                    {newLikeForm()}
            </div>
    );
};

export default AddInterview;
