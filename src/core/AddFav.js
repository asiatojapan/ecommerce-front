import React, { useState, useEffect } from "react";
import { isAuthenticated, getUser } from "../auth";
import { Link } from "react-router-dom";
import { createFav, destroyFav } from "./apiCore";
import { read } from "../user/apiUser"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Notifications, {notify} from 'react-notify-toast';

const AddFav = ({student, setFavCount,
  favCount})  => {
    const [ fav, setFav ] = useState(false);
    const { user, token } = isAuthenticated();

    const {
        user: { round }
    } = isAuthenticated();


    useEffect(() => {
      const found = student.favorites.some(el => el === user._id)
      if (found) {
        setFav(true)
         }
      else {
        setFav(false)
      };
    }, []);

    
  const FavToast = (getCount) => {
    const remainder = new Number(11  - favCount)

    const text = (!(remainder < 1) )? remainder + " student left to 10% discount" : "You have reached 12 students! Congratulations!"

    function rangeToPercent(number, min, max){
      if (((number - min) / (max - min) * 100) > 100) {
        return 100
      }
      else {
        return ((number - min) / (max - min) * 100)
      }
    }

    let myColor = { width: "100%", background: '#000',text: "#fff", borderRadius: "20px", boxShadow: "1px 3px 1px #9E9E9E", };
    notify.show(
        <div style={{fontSize: "16px", margin: "10px 100px",  }}>
         <b>{text}</b> 
         <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width: rangeToPercent(favCount+1, 0, 12) + "%"}}> </div>
          </div>
        </div>, "custom", 3000, myColor
      );
}



    const clickSubmit = e => {
        setFavCount(favCount + 1)
        FavToast(favCount)
        e.preventDefault();
        setFav(true)
        createFav(student._id, user, token);
    };

    const clickDelete = e => {
        setFavCount(favCount - 1)
        e.preventDefault();
        setFav(false)
        // make request to api to create category
        destroyFav(student._id, user, token);
    };

    const text = fav ? 'Saved' : 'Save'

    const newLikeForm = () => {
          return (
      <div>
        {fav  && (
           <button className="btn btn-sm btn-danger" onClick={ clickDelete } href="#0"><i class="fe fe-check"></i> {text} </button>
        )}
        {!fav && (
           <button className="btn btn-sm btn-outline-danger " onClick={ clickSubmit } href="#0"> {text} </button>
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
