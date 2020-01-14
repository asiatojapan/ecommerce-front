import React, { useState, useEffect } from "react";
import { isAuthenticated, getUser } from "../auth";
import { Link } from "react-router-dom";
import { createRec, createUnRec } from "./apiAdmin";
import { list, readStudent, getStudents } from "../core/apiCore";
import { read } from "../user/apiUser"
import { Button } from 'antd';

const AddRec = ({student, userIdFromTable})  => {
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
        const found = student.rec_users.some(el => el._id === userIdFromTable)
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
        console.log(student)
        console.log(user)
        // make request to api to create category
        createRec(student._id, user, token);
    };

    const clickDelete = e => {
        e.preventDefault();
        setRec(false);
        // make request to api to create category
        createUnRec(student._id, user, token);
    };

    const text = rec ? ' - おすすめ' : '+おすすめ'

    const newLikeForm = () => {
      if (rec) {
        return  <a className="f6 link dim ph3 pv1 mb dib white bg-black" onClick={ clickDelete } href="#0">{text}</a>
      } else {
        return  <a className="f6 link dim ba ph3 pv1 mb dib black" onClick={ clickSubmit } href="#0">{text}</a>
      };
    };

    return (
            <div>
              {newLikeForm()}
            </div>
    );
};

export default AddRec;
