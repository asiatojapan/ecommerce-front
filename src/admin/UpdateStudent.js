import React, { useState, useEffect } from 'react';
import Layout2 from '../core/Layout';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { readStudent } from '../core/apiCore';
import { updateStudent } from './apiAdmin';
import {Form, Select, Input, Button, DatePicker } from 'antd';
import { PageHeader } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const UpdateStudent = ({ match }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    });
    const [values, setValues] = useState({
      name: '',
      studentid: '',
      gender: '',
      age: '',
      japanese: '',
      english: '',
      comments: '',
      university: '',
      major: '',
      faculty: '',
      it_skills: '',
      entry_timing: '',
      jlpt: '',
      github: '',
      education_bg: '',
      research: '',
      why_work_in_japan: '',
      internship: '',
      other_pr: '',
      video: '',
      loading: false,
      error: false,
      createdStudent: '',
      redirectToProfile: false,
      formData: ''
    });

    const {
        name,
        loading,
        error,
        createdStudent,
        redirectToProfile,
        formData
    } = values;

    const { user, token } = isAuthenticated();


    const init = studentId => {
        readStudent(studentId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    studentid: data.studentid,
                    gender: data.gender,
                    age: data.age,
                    japanese: data.japanese,
                    english: data.english,
                    comments: data.comments,
                    university: data.university,
                    major: data.major,
                    faculty: data.faculty,
                    it_skills: data.it_skills,
                    entry_timing: data.entry_timing,
                    jlpt: data.jlpt,
                    github: data.github,
                    education_bg: data.education_bg,
                    research: data.research,
                    why_work_in_japan: data.why_work_in_japan,
                    internship: data.internship,
                    other_pr: data.other_pr,
                    video: data.video,
                    formData: new FormData()
                });
            }
        });
    };


    useEffect(() => {
        init(match.params.studentId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'it_skills' || "entry_timing" ? event.target.value.split(",") : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
        console.log(values)
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateStudent(match.params.studentId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    studentid: '',
                    gender: '',
                    age: '',
                    japanese: '',
                    english: '',
                    comments: '',
                    university: '',
                    major: '',
                    faculty: '',
                    it_skills: '',
                    jlpt: '',
                    github: '',
                    education_bg: '',
                    research: '',
                    why_work_in_japan: '',
                    internship: '',
                    other_pr: '',
                    video: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdStudent: data.name
                });
            }
        });
    };

    const newPostForm = () => (
      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 12 }} onSubmit={clickSubmit}>
        <Form.Item label="Name">
          <Input type="text" onChange={handleChange("name")} value={values.name} name="name"
         />
        </ Form.Item >

        <Form.Item label="Student ID">
          <Input type="text" onChange={handleChange("studentid")} value={values.studentid} name="studentid"
          />
        </ Form.Item >

        <Form.Item label="Gender">
        <select placeholder="Select Gender" onChange={handleChange("gender")} value={values.gender} name="gender">
        <option value=""> Select </option>
        <option value="male"> Male </option>
        <option value="female">  Female </option>
        </select>
        </ Form.Item >

        <Form.Item label="Age">
        <Input type="text" onChange={handleChange("age")} value={values.age} name="age"
        />
        </ Form.Item >

        <Form.Item label="Japanese">
        <select placeholder="Select Japanese level" onChange={handleChange("japanese")} value={values.japanese} name="japanese">
        <option value=""> Select </option>
        <option value="A"> A </option>
        <option value="B"> B </option>
        <option value="C"> C </option>
        <option value="D"> D </option>
        <option value="E"> E </option>
        </select>
        </ Form.Item >

        <Form.Item label="English">
        <select placeholder="Select English level" onChange={handleChange("english")} value={values.english} name="english">
        <option value=""> Select </option>
        <option value="A"> A </option>
        <option value="B"> B </option>
        <option value="C"> C </option>
        <option value="D"> D </option>
        <option value="E"> E </option>
        </select>
        </ Form.Item >

        <Form.Item label="University">
        <Input type="text" onChange={handleChange("university")} value={values.university} name="university"
         />
        </ Form.Item >

        <Form.Item label="ATJ　コメント">
        <TextArea type="text" onChange={handleChange("comments")} value={values.comments} name="comments"
        rows={2}/>
        </ Form.Item >

        <Form.Item label="Faculty">
        <Input type="text" onChange={handleChange("faculty")} value={values.faculty} name="faculty"
        />
        </ Form.Item >

        <Form.Item label="Major">
        <Input type="text" onChange={handleChange("major")} value={values.major} name="major"
        />
        </ Form.Item >

        <Form.Item label="JLPT">
        <select placeholder="Select JLPT" onChange={handleChange("jlpt")} value={values.jlpt} name="jlpt">
        <option value=""> Select </option>
        <option value="N1"> N1 </option>
        <option value="N2"> N2 </option>
        <option value="N3"> N3 </option>
        <option value="N4"> N4 </option>
        <option value="N5"> N5 </option>
        <option value="None"> None </option>
        </select>
        </ Form.Item >

        <Form.Item label="IT Skills">
        <Input type="text" onChange={handleChange("it_skills")} value={values.it_skills} name="it_skills"
        />
        </ Form.Item >

        <Form.Item label="IT Skills">
        <Input type="text" onChange={handleChange("entry_timing")} value={values.entry_timing} name="entry_timing"
        />
        </ Form.Item >

        <Form.Item label="Github URL">
        <Input type="text" onChange={handleChange("github")} value={values.github} name="github"
        />
        </ Form.Item >

        <Form.Item label="学歴備考">
        <TextArea type="text" onChange={handleChange("education_bg")} value={values.education_bg} name="education_bg"
        rows={3}/>
        </ Form.Item >

        <Form.Item label="研究テーマ">
        <TextArea type="text" onChange={handleChange("research")} value={values.research} name="research"
        rows={3}/>
        </ Form.Item >

        <Form.Item label="インターンシップ">
        <TextArea type="text" onChange={handleChange("internship")} value={values.internship} name="internship"
        rows={3}/>
        </ Form.Item >

        <Form.Item label="日本で働きたい理由">
        <TextArea type="text" onChange={handleChange("why_work_in_japan")} value={values.why_work_in_japan} name="why_work_in_japan"
        rows={3}/>
        </ Form.Item >

        <Form.Item label="その他PR">
        <TextArea type="text" onChange={handleChange("other_pr")} value={values.other_pr} name="other_pr"
        rows={3}/>
        </ Form.Item >

        <Form.Item label="Video PR">
        <Input type="text" onChange={handleChange("video")} value={values.video} name="video"
        />
        </ Form.Item >

            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
    </Form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdStudent ? '' : 'none' }}>
            <h2>{`${createdStudent}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/students" />;
            }
        }
    };

    const Style = {
      style: {
        borderBottom: "3px solid rgb(212, 212, 212)"
      }
    };

    return (
            <AdminMenu>
            <PageHeader style={Style} title="Edit Student" onBack={() => window.history.back() }/>
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
            </AdminMenu>
    );
};

export default UpdateStudent;
