import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getMyInterviews } from "../core/apiCore";
import UserLayout from "./UserLayout";
import LikedStudents from "./LikedStudents";
import { Link } from "react-router-dom";
import CardInterview from './CardInterview';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Descriptions, Badge, Card, Col, Row, Statistic } from 'antd';
import "../styles.css";

const LikedStudentsList = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const { user, token } = isAuthenticated();

    const [ interviews, setInterviews] = useState([]);

    const loadInterviews = () => {
        getMyInterviews(user._id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterviews(data);
            }
        });
    };

      useEffect(() => {
            loadInterviews();
        }, []);
      

    return (
      <UserLayout>
      <div class="pv4">
        <div class="f3 f3-ns b black">Interviews ({interviews.length})</div>
      </div>


      {interviews.map((c,i) => <div>
        <CardInterview student={c.student} /></div>)}
      </UserLayout>
    );
};

export default LikedStudentsList;
