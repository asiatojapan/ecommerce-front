import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent } from "../core/apiCore";
import UserLayout from "./UserLayout";
import LikedStudents from "./LikedStudents";
import { Link } from "react-router-dom";
import Card2 from '../core/Card';
import { Descriptions, Badge, Card, Col, Row, Statistic } from 'antd';
import "../styles.css";

const LikedStudentsList = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const { user } = isAuthenticated();

    const [ likedstudents, setLikedstudents ] =  useState([]);


    const init = userId => {
        getUser(userId).then(data => {
            setLikedstudents(data.liked_students);
        });
    };


    useEffect(() => {
        init(user._id);
    }, []);

    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };



    return (
      <UserLayout>
      <div class="pv4">
        <div class="f3 f3-ns b black">Saved Students ({likedstudents.length})</div>
      </div>
        {likedstudents.map((s, i) => (
          <Card2 student={s} />
        ))}
      </UserLayout>
    );
};

export default LikedStudentsList;
