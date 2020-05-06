import React, { useState, useEffect } from "react";
import { isAuthenticates } from "../auth";
import { createFav, destroyFav,readStudent } from "./apiCore";

const AddFav2 = ({ student })  => {
    const [ fav, setFav ] = useState(false);
    
    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const findFound = () => {
      readStudent(student, darwin_myTk).then(data => {
        const found = data.favorites.some(el => el._id === darwin_uid)
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
        destroyFav(student, darwin_uid, darwin_myTk);
    };

    const text = fav ? '検討リスト追加済' : '検討リスト追加'

    const newLikeForm = () => {
          return (
            <div>
              {fav && (
           <button className="unlikeBtn fixedWidth" onClick={ clickDelete } href="#0"> 
          <i className="fa fa-star" style={{marginRight: "5px"}}></i> {text} </button>
        )}
        {!fav && (
           <button className="likeBtn fixedWidth" onClick={ clickSubmit } href="#0"> 
           <i className="fa fa-star-o" style={{marginRight: "5px"}}></i> {text} </button>
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
