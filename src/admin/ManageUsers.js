import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from "../auth";
import { List } from 'antd';
import { deleteUser, getUsers } from "./apiAdmin";
import { PageHeader, Tag, Button, Table, Divider } from 'antd';
import { Link } from "react-router-dom";

const { Column, ColumnGroup } = Table;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();
  const loadUsers = () => {
      getUsers().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setUsers(data);
          }
      });
  };

  const destroy = userId => {
      deleteUser(user._id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              loadUsers();
          }
      });
  };

  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: text => (
      <span> {(text) === 1 ? "Admin" : "Registered User"} </span>)
  },
  {
    title: 'Action',
    dataIndex: '_id',
    key: 'id',
    render: text => (
      <span>
        <Link to={`/profile/${text}`}> View </Link>
        <Divider type="vertical" />
        <Link to={`/admin/student/update/${text}`}>
        <Button type="primary">
            編集
          </Button>
        </Link >
        <Divider type="vertical" />
        <Button onClick={() => destroy(text)} type="danger">
              Delete
          </Button>
      </span>
    ),
  },
];



  useEffect(() => {
      loadUsers();
  }, []);

    return (
    <AdminMenu>
    <PageHeader
        style={{
          borderBottom: '2px solid rgb(235, 237, 240)',
        }}
        title="Users"
          />
      <Table columns={columns} dataSource={users} />
      </AdminMenu>
    );
};

export default ManageUsers;
