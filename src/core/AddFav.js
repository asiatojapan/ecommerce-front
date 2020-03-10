import React, { useState, useEffect } from "react";
import { isAuthenticates } from "../auth";
import { createFav, destroyFav } from "./apiCore";
import 'react-toastify/dist/ReactToastify.css';

import {notify} from 'react-notify-toast';

const AddFav = ({student, setFavCount, favCount})  => {
    const [ fav, setFav ] = useState(false);
    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const findFound = () => {
      const found = student.favorites.some(el => el === darwin_uid)
      if (found) {
        setFav(true)
         }
      else {
        setFav(false)
      };
    }

    useEffect(() => {
        findFound()
    }, []);

    
    const FavToast = () => {
    const remainder = new Number(11  - favCount)

    const text = (!(remainder < 1) )? remainder + " students left to 10% discount" : "You have reached 12 students! Congratulations!"

    function rangeToPercent(number, min, max){
      if (((number - min) / (max - min) * 100) > 100) {
        return 100
      }
      else {
        return ((number - min) / (max - min) * 100)
      }
    }

    let myColor = { width: "100%", background: '#278bfa',text: "#fff", borderRadius: "20px", boxShadow: "1px 3px 1px #9E9E9E", };
    notify.show(
        <div style={{fontSize: "16px", margin: "10px 10px",  }}>
          <b>{text}</b> 
          {/*<div className="progress">
           // <div className="progress-bar" role="progressbar" style={{width: rangeToPercent(favCount+1, 0, 12) + "%"}}> </div>
    // </div> */}
        </div>, "custom", 3000, myColor
      );
}


    const clickSubmit = e => {
        setFavCount(favCount + 1)
        FavToast(favCount)
        e.preventDefault();
        setFav(true)
        createFav(student._id, darwin_uid, darwin_myTk);
    };

    const clickDelete = e => {
        setFavCount(favCount - 1)
        e.preventDefault();
        setFav(false)
        // make request to api to create category
        destroyFav(student._id, darwin_uid, darwin_myTk);
    };

    const text = fav ? '検討リスト追加済' : '検討リスト追加'

    const newLikeForm = () => {
          return (
      <div>
        {fav && (
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

export default AddFav;
