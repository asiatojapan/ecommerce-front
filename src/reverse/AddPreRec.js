import React, { useState, useEffect } from "react";
import { isAuthenticates } from "../auth";
import { createPreRec, destroyPreRec } from "../admin/apiAdmin";

const AddPreRec = ({student, userIdFromTable})  => {
    const [rec, setRec] = useState(false);
    const { darwin_myTk } = isAuthenticates();

    const init = () => {
        const found = student.prerec_users.some( el => el === userIdFromTable._id)
        if (found) {
          setRec(true)
           }
        else {
          setRec(false)
        };
    };

    useEffect(() => {
        init();
    }, []);


    const clickSubmit = e => {
        e.preventDefault();
        setRec(true);
        // make request to api to create category
        createPreRec(student._id, userIdFromTable, darwin_myTk );
    };

    const clickDelete = e => {
        e.preventDefault();
        setRec(false);
        // make request to api to create category
        destroyPreRec(student._id, userIdFromTable, darwin_myTk );
    };

    const text = rec ? '予約' : '予約'

    const newLikeForm = () => {
      if (rec) {
        return  <a className="btn btn-sm btn-warning" onClick={ clickDelete } href="#0"> {text}</a>
      } else {
        return  <a className="btn btn-sm btn-outline-warning" onClick={ clickSubmit } href="#0">{text}</a>
      };
    };

    return (
            <div>
              {newLikeForm()}
            </div>
    );
};

export default AddPreRec;
