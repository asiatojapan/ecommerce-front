import React, { useState, useEffect } from "react";
import { isAuthenticated} from "../auth";
import { createPush, destroyPush } from "./apiAdmin";

const AddPush = ({student, userIdFromTable})  => {
    const [push, setPush] = useState(false);

    const { token } = isAuthenticated();

    const init = userIdFromTable => {
        const found = student.push_users.some(el => el === userIdFromTable)
        if (found) {
          setPush(true)
           }
        else {
          setPush(false)
        };
    };

    useEffect(() => {
        init(userIdFromTable);
    }, []);


    const clickSubmit = e => {
        e.preventDefault();
        setPush(true);
        // make request to api to create category
        createPush(student._id, userIdFromTable, token);
    };

    const clickDelete = e => {
        e.preventDefault();
        setPush(false);
        // make request to api to create category
        destroyPush(student._id, userIdFromTable, token);
    };

    const text = push ? ' 推薦2' : ' 推薦2'

    const newLikeForm = () => {
      if (push) {
        return  <a className="btn btn-sm btn-primary" onClick={ clickDelete } href="#0"> <i class="fe fe-check"></i> {text}</a>
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

export default AddPush;
