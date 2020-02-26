import React, { useState, useEffect } from "react";
import { isAuthenticated, getUser } from "../auth";
import { Link } from "react-router-dom";
import { createFav, destroyFav,readStudent } from "./apiCore";
import { read } from "../user/apiUser"

const AddFav2 = ({student, handleUpdate })  => {
    const [ fav, setFav ] = useState(false);
    const { user, token } = isAuthenticated();

    const {
        user: { round }
    } = isAuthenticated();

    useEffect(() => {
          readStudent(student).then(data => {
              const found = data.favorites.some(el => el === user._id)
              if (found) {
                setFav(true)
                 }
              else {
                setFav(false)
              };
          })
    }, []);

    const clickSubmit = e => {
        e.preventDefault();
        setFav(true)
        createFav(student, user, token);
    };

    const clickDelete = e => {
        e.preventDefault();
        setFav(false)
        // make request to api to create category
        destroyFav(student, user, token);
    };

    const text = fav ? 'Saved' : 'Save'

    const newLikeForm = () => {
          return (
            <div>
              {fav && (
                 <button className="saveBtn" onClick={ clickDelete } href="#0"><i class="fe fe-check"></i> {text}  </button>
              )}

              {!fav && (
                 <button className="saveBtn outline " onClick={ clickSubmit } href="#0"> {text}</button>
              )}
            </div>)
    };

    return (
            <div>
              {newLikeForm()}
            </div>
    );
};

export default AddFav2;
