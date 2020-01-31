import React, { useState, useEffect } from "react";
import { isAuthenticated, getUser } from "../auth";
import { Link } from "react-router-dom";
import { createRec, destroyRec } from "./apiAdmin";
import { list, readStudent, getStudents } from "../core/apiCore";
import { read } from "../user/apiUser"
import { Button } from 'antd';

const AddRec = ({student, userIdFromTable, handleUpdate})  => {
    const [rec, setRec] = useState(false);

    const [ recUsers, setRecUsers ] =  useState([]);

    const { token } = isAuthenticated();

    const [user, setUser] = useState([]);

    const init = userIdFromTable => {
        // console.log(userId);
        read(userIdFromTable).then(data => {
            if (data.error) {
                setUser({ _id: data._id});
            } else {
                setUser({  _id: data._id });
            }
        });
        setRecUsers([student.rec_users]);
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
        createRec(student._id, user, token);
    };

    const clickDelete = e => {
        e.preventDefault();
        setRec(false);
        // make request to api to create category
        destroyRec(student._id, user, token);
    };

    const text = rec ? ' 推薦' : ' 推薦'

    const newLikeForm = () => {
      if (rec) {
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

export default AddRec;
