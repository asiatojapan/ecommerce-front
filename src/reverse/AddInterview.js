import React, { useState, useEffect } from "react";
import { isAuthenticates } from "../auth";
import { createInterview } from "../admin/apiAdmin";

const AddInterview = ({student, userIdFromTable, setRun = f => f,
  run = undefined })  => {

    const [interview, setInterview] = useState(false);

    const { darwin_myTk } = isAuthenticates();
    
  
    const init = student => {
      const found = userIdFromTable.interview.some(el => el.student === student._id)
      if (found) {
        setInterview(true)
         }
      else {
        setInterview(false)
      };
    };

    useEffect(() => {
        init(student);
    }, []);


    const clickSubmit = e => {
        e.preventDefault();
        setInterview(true)
        setRun(!run)
        // make request to api to create category
        createInterview(student, userIdFromTable, darwin_myTk )

    };

    const text = interview ? '面接' : '面接'

    const newLikeForm = () => {
      if (interview) {
        return  <a className="btn btn-sm btn-danger" href="#0"> {text}</a>
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
