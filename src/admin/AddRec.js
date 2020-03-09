import React, { useState, useEffect } from "react";
import { isAuthenticates } from "../auth";
import { createRec, destroyRec } from "./apiAdmin";

const AddRec = ({student, userIdFromTable})  => {
    const [rec, setRec] = useState(false);
    const { darwin_myTk } = isAuthenticates();

    const init = userIdFromTable => {
        const found = student.rec_users.some(el => el === userIdFromTable)
        if (found) {
          setRec(true)
           }
        else {
          setRec(false)
        };
    };

    useEffect(() => {
        init(userIdFromTable);
    }, []);


    const clickSubmit = e => {
        e.preventDefault();
        setRec(true);
        // make request to api to create category
        createRec(student._id, userIdFromTable, darwin_myTk );
    };

    const clickDelete = e => {
        e.preventDefault();
        setRec(false);
        // make request to api to create category
        destroyRec(student._id, userIdFromTable, darwin_myTk );
    };

    const text = rec ? ' 推薦' : ' 推薦'

    const newLikeForm = () => {
      if (rec) {
        return  <a className="btn btn-sm btn-primary" onClick={ clickDelete } href="#0"> <i className="fe fe-check"></i> {text}</a>
      } else {
        return  <a className="btn btn-sm btn-outline-primary" onClick={ clickSubmit } href="#0">{text}</a>
      };
    };

    return (
            <div>
              {newLikeForm()}
            </div>
    );
};

export default AddRec;
