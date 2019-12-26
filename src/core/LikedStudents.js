import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent } from "./apiCore";
import { Link } from "react-router-dom";
import { Descriptions, Badge, Card, Col, Row  } from 'antd';
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
         {student.name}
        {console.log({student})}
      </div>
    );
};

export default LikedStudents;
