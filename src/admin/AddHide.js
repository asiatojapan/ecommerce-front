import React, { useState, useEffect } from "react";
import { isAuthenticated, isAuthenticates } from "../auth";
import { createHide, destroyHide } from "./apiAdmin";

const AddHide = ({student, userIdFromTable})  => {
    const [hide, setHide] = useState(false);
    const { darwin_myTk } = isAuthenticates();

    const init = userIdFromTable => {
        const found = student.hide_users.some(el => el === userIdFromTable)
        if (found) {
          setHide(true)
           }
        else {
          setHide(false)
        };
    };

    useEffect(() => {
        init(userIdFromTable);
    }, []);


    const clickSubmit = e => {
        e.preventDefault();
        setHide(true);
        // make request to api to create category
        createHide(student._id, userIdFromTable, darwin_myTk);
    };

    const clickDelete = e => {
        e.preventDefault();
        setHide(false);
        // make request to api to create category
        destroyHide(student._id, userIdFromTable, darwin_myTk);
    };

    const text = hide ? 'x' : 'x '

    const newLikeForm = () => {
      if (hide) {
        return  <a className="btn btn-sm btn-dark" onClick={ clickDelete } href="#0"> {text}</a>
      } else {
        return  <a className="btn btn-sm btn-outline-secondary" onClick={ clickSubmit } href="#0">{text}</a>
      };
    };

    return (
            <div>
              {newLikeForm()}
            </div>
    );
};

export default AddHide;
