import React, { useState, useEffect } from "react";
import UserLayout from "./UserLayout";
import { isAuthenticated } from "../auth";
import { Descriptions, Badge, Card, Col, Row  } from 'antd';

const Dashboard = () => {

    const {
      user: { _id, name, email, role }
      } = isAuthenticated();

      const userInfo = () => {
          return (
            <Descriptions title="User Profile" bordered>
                 <Descriptions.Item label="Name" span={3}>{name}</Descriptions.Item>
                 <Descriptions.Item label="Email" span={3}>{email}</Descriptions.Item>
                 <Descriptions.Item label="Role" span={3}>{role === 1 ? "Admin" : "Registered User"}</Descriptions.Item>

             </Descriptions>

          );
      };

      return (
      <UserLayout>
                  {userInfo()}
      </UserLayout>
)
};



export default Dashboard;
