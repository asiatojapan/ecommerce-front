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
    title: 'ID',
    dataIndex: 'studentid',
    key: 'studentid',
  },
  {
    title: '名前',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年齢',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性別',
    dataIndex: 'gender',
    key: 'gender',
    render: text => (
      <span> {(text) === "male" ? "男" : "女"} </span>)
  },
  {
    title: '国籍',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: '大学',
    dataIndex: 'university',
    key: 'university',
  },
  {
    title: '学部',
    dataIndex: 'faculty',
    key: 'faculty',
  },
  {
    title: 'Cat',
    dataIndex: 'categories.name',
    key: 'categories.name',
  },
  {
    title: '学部',
    dataIndex: 'upload_fyp',
    key: 'upload_fyp',
    render: text => {
      if (text) {
       return <a href={text}>FYP</a>
      }
    }
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
