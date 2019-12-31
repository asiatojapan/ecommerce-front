import React, { useState, useEffect } from "react";
import Layout2 from "./Layout";
import { isAuthenticated, getUser } from "../auth";
import { Link } from "react-router-dom";
import { createLike, createUnlike, list, readStudent } from "./apiCore";
import { Button } from 'antd';

const AddLike = ({student, id })  => {
    const [liked, setLiked] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();
    const [ likedstudents, setLikedstudents ] =  useState([]);

    const init = userId => {
        getUser(userId).then(data => {
            setLikedstudents([data.liked_students]);
            const found = data.liked_students.some(el => el._id === id)
            if (found) {
              setLiked(true)
               }
            else {
              setLiked(false)
            };
        });
    };

    useEffect(() => {
        init(user._id);
    }, []);


    const clickSubmit = e => {
        e.preventDefault();
        setLiked(true);
        // make request to api to create category
        createLike(user._id, student, token);
    };

    const clickDelete = e => {
        e.preventDefault();
        setLiked(false);
        // make request to api to create category
        createUnlike(user._id, student, token);
    };

    const text = liked ? 'Unlike' : 'Like'

    const newLikeForm = () => {
      if (liked) {
        return    <Button onClick={ clickDelete } type="primary"> {text}</Button>
      } else {
        return  <Button onClick={ clickSubmit } type="dashed"> {text} </Button>
      };
    };

    return (
            <div>
                    {newLikeForm()}
            </div>
    );
};

export default AddLike;
