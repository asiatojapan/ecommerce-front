import React, { useState, useEffect } from "react";
import { isAuthenticates } from "../auth";
import { createFav, destroyFav,readStudent } from "./apiCore";

const AddFav2 = ({ student })  => {
    const [ fav, setFav ] = useState(false);
    
    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const findFound = () => {
      readStudent(student, darwin_myTk).then(data => {
        const found = data.favorites.some(el => el === darwin_uid)
        if (found) {
          setFav(true)
           }
        else {
          setFav(false)
        };
    })
    }

    useEffect(() => {
        findFound()
    }, []);

    const clickSubmit = e => {
        e.preventDefault();
        setFav(true)
        createFav(student, darwin_uid, darwin_myTk);
    };

    const clickDelete = e => {
        e.preventDefault();
        setFav(false)
        // make request to api to create category
        destroyFav(student, darwin_uid, darwin_myTk);
    };

    const text = fav ? '検討リスト追加済' : '検討リスト追加'

    const newLikeForm = () => {
          return (
            <div>
           {fav  && (
           <button className="unlikeBtn" onClick={ clickDelete } href="#0"><i className="fe fe-check" style={{marginRight: "10px"}}></i> {text} </button>
        )}
        {!fav && (
           <button className="likeBtn " onClick={ clickSubmit } href="#0"> {text} </button>
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
