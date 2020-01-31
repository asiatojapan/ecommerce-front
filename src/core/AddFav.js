import React, { useState, useEffect } from "react";
import { isAuthenticated, getUser } from "../auth";
import { Link } from "react-router-dom";
import { createFav, destroyFav } from "./apiCore";
import { read } from "../user/apiUser"

const AddFav = ({student, handleUpdate})  => {
    const [ fav, setFav ] = useState(false);

    const [ favUsers, setFavUsers ] =  useState([]);

    const { user, token } = isAuthenticated();

    const {
        user: { round }
    } = isAuthenticated();

    const init = () => {
        const found = student.favorites.some(el => el === user._id)
        if (found) {
          setFav(true)
           }
        else {
          setFav(false)
        };
    };

    useEffect(() => {
        init();
    }, []);

    const clickSubmit = e => {
        e.preventDefault();
        setFav(true)
        createFav(student._id, user, token);
    };

    const clickDelete = e => {
        e.preventDefault();
        setFav(false)
        // make request to api to create category
        destroyFav(student._id, user, token);
    };

    const text = fav ? 'Saved' : 'Save'

    const newLikeForm = () => {
          return (
      <div>
        {fav && user.round === "Phase II" && (
           <button className="btn btn-sm btn-danger disabled" disabled onClick={ clickDelete } href="#0"><i class="fe fe-check"></i> {text} </button>
        )}

        {fav && user.round !== "Phase II" && (
           <button className="btn btn-sm btn-danger" onClick={ clickDelete } href="#0"> <i class="fe fe-check"></i> {text} </button>
        )}

        {!fav && user.round === "Phase II" && (
           <button className="btn btn-sm btn-outline-danger disabled" disabled onClick={ clickSubmit } href="#0"> {text} </button>
        )}

        {!fav && user.round !== "Phase II" && (
           <button className="btn btn-sm btn-outline-danger" onClick={ clickSubmit } href="#0"> {text} </button>
        )}

      </div>)
    };

    return (
            <div>
              {newLikeForm()}
            </div>
    );
};

export default AddFav;
