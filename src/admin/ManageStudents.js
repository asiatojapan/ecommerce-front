import React, { useState, useEffect } from 'react';
import Layout2 from "../core/Layout";
import { isAuthenticated } from "../auth";
import { List } from 'antd';
import { getStudents } from '../core/apiCore';
import { deleteStudent } from "./apiAdmin";
import { Button } from 'antd';

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

  useEffect(() => {
      loadStudents();
  }, []);

    return (
      <Layout2>
        {students.map((student, i) => (
          <List itemLayout="horizontal">
          <div key={i}>
          <List.Item>
          <List.Item.Meta title= {`${student.studentid} ${student.name}`}
          description={student.comments} />
          <div>
          <Button onClick={() => destroy(student._id)} type="danger">
                Delete
            </Button>
            </div>
          </List.Item>
          </div>
        </List>
          ))}
      </Layout2>
    );
};

export default ManageStudent;
