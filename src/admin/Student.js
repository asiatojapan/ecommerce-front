import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { readStudent } from '../core/apiCore';
import { updateStudent, deleteStudent } from './apiAdmin';
import { Form, Select, Input, Button, DatePicker, Descriptions, Badge, Divider } from 'antd';
import { PageHeader } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const Student = props => {
    const [student, setStudent] = useState({});
    const [error, setError] = useState(false);

    const { user, token } = isAuthenticated();

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
        const studentId = props.match.params.studentId;
        loadSingleStudent(studentId);
    }, [props]);

    const destroy = studentId => {
        deleteStudent(studentId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

            }
        });
    };

    const studentList = () => (

      <Descriptions bordered size="small">
             <Descriptions.Item label="Student ID" span={3}>{student.studentid}</Descriptions.Item>
             <Descriptions.Item label="Name" span={3}>{student.name}</Descriptions.Item>
             <Descriptions.Item label="Country" span={1}>{student.country}</Descriptions.Item>
             <Descriptions.Item label="Gender" span={1}>{student.gender}</Descriptions.Item>
             <Descriptions.Item label="Age" span={1}>{student.age}</Descriptions.Item>
             <Descriptions.Item label="University" span={1}>{student.university}</Descriptions.Item>
             <Descriptions.Item label="Faculty" span={1}>{student.faculty}</Descriptions.Item>
             <Descriptions.Item label="Major" span={1}>{student.major}</Descriptions.Item>
             <Descriptions.Item label="Degree" span={1}>{student.degree}</Descriptions.Item>
             <Descriptions.Item label="卒業" span={1}>{student.grad_year} / {student.grad_month}</Descriptions.Item>
             <Descriptions.Item label="Arts" span={1}>{student.arts}</Descriptions.Item>
             <Descriptions.Item label="Comments" span={3}>{student.comments}</Descriptions.Item>
             <Descriptions.Item label="Entry" span={3}>{student.entry_timing}</Descriptions.Item>
             <Descriptions.Item label="Japanese" span={1}>{student.japanese}</Descriptions.Item>
             <Descriptions.Item label="JLPT" span={1}>{student.jlpt}</Descriptions.Item>
             <Descriptions.Item label="English" span={1}>{student.english}</Descriptions.Item>
             <Descriptions.Item label="IT Skills" span={3}>{student.it_skills}</Descriptions.Item>
             <Descriptions.Item label="Github" span={3}>{student.github}</Descriptions.Item>
             <Descriptions.Item label="Video" span={3}>{student.video}</Descriptions.Item>
             <Descriptions.Item label="学歴" span={3}>{student.education_bg}</Descriptions.Item>
             <Descriptions.Item label="日本で働きたい理由" span={3}>{student.why_work_in_japan}</Descriptions.Item>
             <Descriptions.Item label="FYP" span={3}>{student.research}</Descriptions.Item>
             <Descriptions.Item label="インターンシップ" span={3}>{student.internship}</Descriptions.Item>
             <Descriptions.Item label="その他PR" span={3}>{student.other_pr}</Descriptions.Item>
             <Descriptions.Item label="FYP" span={3}>{student.upload_fyp}</Descriptions.Item>
        </Descriptions>
    )

    return (
      <AdminMenu>
      <PageHeader
          style={{
            borderBottom: '2px solid rgb(235, 237, 240)',
            marginBottom: 20,
          }} onBack={() => window.history.back() }
          title={student.name}
          extra={[
              <Link to={`/admin/student/update/${student._id}`}>
            <Button type="primary">
                編集
              </Button>
            </Link >,
             <Button onClick={() => destroy(student._id)} type="danger">
                Delete
            </Button>
          ]}
            />

      {studentList()}
      </AdminMenu>
    );
};

export default Student;
