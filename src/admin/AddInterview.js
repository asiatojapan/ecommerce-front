import React, { useState, useEffect } from "react";
import { isAuthenticated, getUser } from "../auth";
import { Link } from "react-router-dom";
import { read } from "../user/apiUser"
import { createInterview, deleteInterview } from "./apiAdmin";

const AddInterview = ({student, userIdFromTable, handleUpdate })  => {

    const [interview, setInterview] = useState(false);

    const { user, token } = isAuthenticated();

    const init = userIdFromTable => {
      const found = student.interviews.some(el => el.company === userIdFromTable)
      if (found) {
        setInterview(true)
         }
      else {
        setInterview(false)
      };
    };

    useEffect(() => {
        init(userIdFromTable);
    }, []);


    const clickSubmit = e => {
        e.preventDefault();
        setInterview(true)
        // make request to api to create category
        createInterview(student, userIdFromTable, token)

    };

    const clickDelete = e => {
        e.preventDefault();
        setInterview(false);
    };


    const text = interview ? '面接' : ' 面接'

    const newLikeForm = () => {
      if (interview) {
        return  <a className="btn btn-sm btn-danger" href="#0"> <i class="fe fe-check"></i> {text}</a>
      } else {
        return  <a className="btn btn-sm btn-outline-danger" onClick={ clickSubmit } href="#0">{text}</a> }
    };

    return (
      <div>
        {newLikeForm()}
    </div>
    );
};

export default AddInterview;
