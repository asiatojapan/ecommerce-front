import React, { useState, useEffect } from "react";
import { isAuthenticates } from "../auth";
import { createRec, destroyRec } from "../admin/apiAdmin";

const AddRec = ({student, userIdFromTable})  => {
    const [rec, setRec] = useState(false);
    const { darwin_myTk } = isAuthenticates();

    const init = () => {
      // console.log("student",student.rec_users)

       console.log("user",userIdFromTable._id)
        const found = student.rec_users.some(el =>el._id === userIdFromTable._id)
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
        createRec(student._id, userIdFromTable, darwin_myTk );
    };

    const clickDelete = e => {
        e.preventDefault();
        setRec(false);
        // make request to api to create category
        destroyRec(student._id, userIdFromTable, darwin_myTk );
    };

    const text = rec ? '推薦' : ' 推薦'

    const newLikeForm = () => {
      if (rec) {
        return  <a className="btn btn-sm btn-primary" onClick={ clickDelete } href="#0"> {text}</a>
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
