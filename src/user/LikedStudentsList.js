import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent } from "../core/apiCore";
import UserLayout from "./UserLayout";
import LikedStudents from "./LikedStudents";
import { Link } from "react-router-dom";
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
      <div style={{ background: '#fff', paddingBottom: '30px' }}>
       <Row gutter={16}>
         <Col span={12}>
           <Card style={{ background: '#eee'}}>
             <Statistic title="Total" value={likedstudents.length} />
           </Card>
         </Col>
        
       </Row>
     </div>

              {likedstudents.map((s, i) => (
                    <LikedStudents id={likedstudents[i]}/>
              ))}
      </UserLayout>
    );
};

export default LikedStudentsList;
