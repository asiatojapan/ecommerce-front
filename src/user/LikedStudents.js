import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent } from "../core/apiCore";
import Card2 from '../core/Card';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'
import  AddLike  from '../core/AddLike';
import { PageHeader, Menu, Dropdown, Icon, Button, Tag, Typography, Row, Descriptions } from 'antd';
import "../styles.css";

const LikedStudents = ({id}) => {

    const [student, setStudent] = useState({});
    const [error, setError] = useState(false);

    const loadSingleStudent = studentId => {
        readStudent(studentId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setStudent(data);
            }
        });
    };

    useEffect(() => {
        loadSingleStudent(id);
    }, []);

    return (
      <div>
      <article class="center mw5 mw6-ns hidden bb bt b--black-10">
      <h1 class="f6 mv0 pv2 ph3 ">{student.studentid} : {student.name}</h1>
      </article>
      </div>
    );
};

export default LikedStudents;
