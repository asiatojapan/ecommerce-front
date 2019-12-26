import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from "../auth";
import { List } from 'antd';
import { getStudents } from '../core/apiCore';
import { deleteStudent } from "./apiAdmin";
import { PageHeader, Tag, Button, Table, Divider } from 'antd';
import { Link } from "react-router-dom";

const { Column, ColumnGroup } = Table;

const ManageStudent = () => {
  const [students, setStudents] = useState([]);

  const { user, token } = isAuthenticated();
  const loadStudents = () => {
      getStudents().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setStudents(data);
          }
      });
  };

  const destroy = studentId => {
      deleteStudent(studentId, user._id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              loadStudents();
          }
      });
  };

  const columns = [
  {
    title: 'Student ID',
    dataIndex: 'studentid',
    key: 'studentid',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'University',
    dataIndex: 'university',
    key: 'university',
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty',
    key: 'faculty',
  },
  {
    title: 'Action',
    dataIndex: '_id',
    key: 'id',
    render: text => (
      <span>
        <Link to={`/admin/student/${text}`}> View </Link>
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
      loadStudents();
  }, []);

    return (
    <AdminMenu>
    <PageHeader
        style={{
          borderBottom: '2px solid rgb(235, 237, 240)',
        }}
        title="Students"
        extra={[
          <Link to={`/admin/create/student`}>
          <Button type="primary">
              + 学生
            </Button>
          </Link >]}
          />
      <Table columns={columns} dataSource={students} />
      </AdminMenu>
    );
};

export default ManageStudent;
