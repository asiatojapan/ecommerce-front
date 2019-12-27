import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createStudent } from './apiAdmin';
import {Form, Select, Input, Button, DatePicker, PageHeader, Tag, Table, Divider } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const AddStudent = () => {
  useEffect(() => {
      window.scrollTo(0, 0)
  });
  const [values, setValues] = useState({
      name: '',
      studentid: '',
      gender: '',
      age: '',
      country: '',
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
      error: ""
      });

  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();


  const handleChange = name => event => {
      const value = name === 'it_skills' ? event.target.value.split(",") : event.target.value;
      setValues({ ...values, [name]: value });
  };



  const clickSubmit = e => {
      e.preventDefault();
      setSuccess(false);
      // make request to api to create category
      createStudent(user._id, token, values).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
              setSuccess(true);
          }
      });
  };

  const newCategoryFom = () => (
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

      <Form.Item label="Country">
      <Input type="text" onChange={handleChange("country")} value={values.country} name="country"
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

      <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 2 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
    </Form.Item>

  </Form>
  );

  const showSuccess = () => {
      if (success) {
          return <h3 className="text-success">{values.name} is created</h3>;
      }
  };

  const showError = () => (
      <div className="alert alert-danger" style={{ display: values.error ? '' : 'none' }}>
          {values.error}
      </div>
  );

  const goBack = () => (
      <div className="mt-5">
          <Link to="/admin/dashboard" className="text-warning">
              Back to Dashboard
          </Link>
      </div>
  );

  return (
      <AdminMenu>
      <PageHeader title="Add Student" onBack={() => window.history.back() }/>
                  {showSuccess()}
                  {showError()}
                  {newCategoryFom()}
                  {goBack()}

      </AdminMenu>
  );
};

export default AddStudent;
