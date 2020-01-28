import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent } from "../core/apiCore";
import { Link } from "react-router-dom";
import  AdminMenu from "./AdminMenu";
import { Descriptions, Badge, Card, Col, Row  } from 'antd';
import "../styles.css";

const AdminProfile = () => {
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

    return (
      <AdminMenu>
        <Descriptions title="User Profile" bordered>
             <Descriptions.Item label="Name" span={3}>{name}</Descriptions.Item>
             <Descriptions.Item label="Email" span={3}>{email}</Descriptions.Item>
             <Descriptions.Item label="Role" span={3}>{role === 1 ? "Admin" : "Registered User"}</Descriptions.Item>
             </Descriptions>
      </AdminMenu>
    );
};

export default AdminProfile;
