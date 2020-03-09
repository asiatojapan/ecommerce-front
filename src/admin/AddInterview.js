import React, { useState, useEffect } from "react";
import { isAuthenticates } from "../auth";
import { createInterview } from "./apiAdmin";

const AddInterview = ({student, userIdFromTable, setRun = f => f,
  run = undefined })  => {

    const [interview, setInterview] = useState(false);

    const { darwin_myTk } = isAuthenticates();
    
  
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
        setRun(!run)
        // make request to api to create category
        createInterview(student, userIdFromTable, darwin_myTk )

    };

    const text = interview ? '面接' : ' 面接'

    const newLikeForm = () => {
      if (interview) {
        return  <a className="btn btn-sm btn-danger" href="#0"> <i className="fe fe-check"></i> {text}</a>
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
