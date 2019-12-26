import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent } from "./apiCore";
import Layout2 from "./Layout";
import LikedStudents from "./LikedStudents";
import { Link } from "react-router-dom";
import { Descriptions, Badge, Card, Col, Row  } from 'antd';
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

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/create/student">
                            Create Student
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/students">
                            View Students
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };


    return (
      <Layout2>
              <div style={{ paddingTop: '5rem' }}>
              <Card title="Liked Students">
              {likedstudents.map((s, i) => (
                    <Card.Grid style={gridStyle}>
                    <LikedStudents id={likedstudents[i]}/>
                    </Card.Grid>
              ))}
             </Card>
          </div>
          </Layout2>
    );
};

export default LikedStudentsList;
