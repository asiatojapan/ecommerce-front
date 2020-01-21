import React, { useState, useEffect } from 'react';
import Layout2 from '../core/Layout';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { readStudent } from '../core/apiCore';
import { updateStudent, getCategories } from './apiAdmin';
import {Form, Select, Input, Button, DatePicker } from 'antd';
import { PageHeader } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const UpdateStudent = ({ match }) => {
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
      categories_list: [],
      categories: [],
      loading: false,
      error: false,
      createdStudent: '',
      redirectToProfile: false,
      formData: ''
    });

    const [categories_list, setCategoriesList] = useState([]);
    const [defaultChecked, setDefaultChecked] = useState(false);

    const {
        name,
        studentid,
        loading,
        error,
        categories,
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
                    country: data.country,
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
                    categories: data.categories,
                    upload_fyp: data.upload_fyp,
                    formData: new FormData()
                });
                initCategories();
            }
        });
    };

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategoriesList(data);
            }
        });
    };


    useEffect(() => {
        init(match.params.studentId);
    }, []);

    const handleChange = name => event => {
          const value = name === 'upload_fyp' ? event.target.files[0] : event.target.value;
          console.log(value)
          formData.set(name, value);
          setValues({ ...values, [name]: value });
    };

    const [checked, setCheked] = useState([]);

    const defaultChecking = c => () => {
      const v = checked.indexOf(c._id === -1)
      const currentCategoryId = v;
      const newCheckedCategoryId = [...checked];

      if (currentCategoryId === -1) {
          newCheckedCategoryId.push(c);
      } else {
          newCheckedCategoryId.splice(currentCategoryId, 1);
      }
    }

    const handleToggle = c => () => {
        // return the first index or -1
        const v = checked.indexOf(c._id === -1)

        const currentCategoryId = v;
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state > push
        // else pull/take off
        //  console.log(newCheckedCategoryId)
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        setValues({
            ...values,
            categories: newCheckedCategoryId
        });
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
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdStudent: data.name
                });
            }
        });
    };

    const newPostForm = () => (
      <form onSubmit={clickSubmit}>

  <div>
    <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-50-ns pa2">
         <label for="name" class="f6 b db mb2">Name <span class="normal black-60"></span></label>
         <input type="text" onChange={handleChange("name")} value={name} name="name" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"/>
      </div>
      <div class="fl w-100 w-25-ns pa2">
        <label for="name" class="f6 b db mb2">Student Id <span class="normal black-60"></span></label>
        <input type="text" onChange={handleChange("studentid")} value={values.studentid} name="studentid" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="studentid-desc"/>
      </div>
      <div class="fl w-100 w-25-ns pa2">
        <label for="age" class="f6 b db mb2">Age <span class="normal black-60"></span></label>
        <input type="text" onChange={handleChange("age")} value={values.age} name="age" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="age-desc"/>
      </div>
    </div>
  </div>
  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-20-ns pa2">
        <label for="country" class="f6 b db mb2">Country<span class="normal black-60"></span></label>
        <input type="text" onChange={handleChange("country")} value={values.country} name="country" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="country-desc"/>
      </div>
      <div class="fl w-100 w-20-ns pa2">
         <label for="gender" class="f6 b db mb2">Gender<span class="normal black-60"></span></label>
         <select placeholder="Select Gender" onChange={handleChange("gender")} value={values.gender} name="gender">
         <option value=""> Select </option>
         <option value="male"> Male </option>
         <option value="female">  Female </option>
         </select>
      </div>
      <div class="fl w-100 w-20-ns pa2">
        <label for="japanese" class="f6 b db mb2">Japanese<span class="normal black-60"></span></label>
        <select placeholder="Select Japanese level" onChange={handleChange("japanese")} value={values.japanese} name="japanese">
        <option value=""> Select </option>
        <option value="A"> A </option>
        <option value="B"> B </option>
        <option value="C"> C </option>
        <option value="D"> D </option>
        <option value="E"> E </option>
        </select>
      </div>

      <div class="fl w-100 w-20-ns pa2">
        <label for="jlpt" class="f6 b db mb2">JLPT<span class="normal black-60"></span></label>
        <select placeholder="Select JLPT" onChange={handleChange("jlpt")} value={values.jlpt} name="jlpt">
        <option value=""> Select </option>
        <option value="N1"> N1 </option>
        <option value="N2"> N2 </option>
        <option value="N3"> N3 </option>
        <option value="N4"> N4 </option>
        <option value="N5"> N5 </option>
        <option value="None"> None </option>
        </select>
      </div>

      <div class="fl w-100 w-20-ns pa2">
        <label for="english" class="f6 b db mb2">English<span class="normal black-60"></span></label>
        <select placeholder="Select English level" onChange={handleChange("english")} value={values.english} name="english">
        <option value=""> Select </option>
        <option value="A"> A </option>
        <option value="B"> B </option>
        <option value="C"> C </option>
        <option value="D"> D </option>
        <option value="E"> E </option>
        </select>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-50-ns pa2">
         <label for="university" class="f6 b db mb2">University<span class="normal black-60"></span></label>
         <input type="text" onChange={handleChange("university")} value={values.university} name="university" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="university-desc"/>
      </div>
      <div class="fl w-100 w-25-ns pa2">
        <label for="faculty" class="f6 b db mb2">Faculty<span class="normal black-60"></span></label>
        <input type="text" onChange={handleChange("faculty")} value={values.faculty} name="faculty" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="faculty-desc"/>
      </div>
      <div class="fl w-100 w-25-ns pa2">
        <label for="major" class="f6 b db mb2">Major<span class="normal black-60"></span></label>
        <input type="text" onChange={handleChange("major")} value={values.major} name="major" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="major-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-50-ns pa2">
         <label for="itskills" class="f6 b db mb2">IT Skills<span class="normal black-60"></span></label>
         <input type="text" onChange={handleChange("it_skills")} value={values.it_skills} name="it_skills" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="itskills-desc"/>
      </div>
      <div class="fl w-100 w-50-ns pa2">
        <label for="faculty" class="f6 b db mb2">Entry Timing<span class="normal black-60"></span></label>
        <input type="text" onChange={handleChange("entry_timing")} value={values.entry_timing} name="entry_timing" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="faculty-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="comments" class="f6 b db mb2">Comments<span class="normal black-60"></span></label>
         <input type="text" onChange={handleChange("comments")} value={values.comments} name="comments" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="comments-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="video" class="f6 b db mb2">Video URL<span class="normal black-60"></span></label>
         <input type="text" onChange={handleChange("video")} value={values.video} name="video" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="video-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="github" class="f6 b db mb2">Github URL <span class="normal black-60"></span></label>
         <input type="text" onChange={handleChange("github")} value={values.github} name="github" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="github-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="educationbg" class="f6 b db mb2">学歴備考<span class="normal black-60"></span></label>
         <textarea type="text" onChange={handleChange("education_bg")} value={values.education_bg} name="education_bg" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="educationbg-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="research" class="f6 b db mb2">研究テーマ<span class="normal black-60"></span></label>
         <textarea type="text" onChange={handleChange("research")} value={values.research} name="research" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="research-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="internship" class="f6 b db mb2">インターンシップ<span class="normal black-60"></span></label>
         <textarea type="text" onChange={handleChange("internship")} value={values.internship} name="internship" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="internship-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="why_work_in_japan" class="f6 b db mb2">日本で働きたい理由<span class="normal black-60"></span></label>
         <textarea type="text" onChange={handleChange("why_work_in_japan")} value={values.why_work_in_japan} name="why_work_in_japan" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="whyworkinjapan-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="other_pr" class="f6 b db mb2">その他PR<span class="normal black-60"></span></label>
         <textarea type="text"  onChange={handleChange("other_pr")} value={values.other_pr} name="other_pr" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="other_pr-desc"/>
      </div>
    </div>
  </div>

  <div class="mw9 center ph3-ns">
    <div class="cf ph2-ns">
      <div class="fl w-100 w-100-ns pa2">
         <label for="other_pr" class="f6 b db mb2">FYP PDF<span class="normal black-60"></span></label>
         <input onChange={handleChange('upload_fyp')} type="file" name="upload_fyp"/>
         {values.upload_fyp}
        </div>
    </div>
    </div>
  </div>

<button className="btn btn-outline-primary">Create Student</button>
      </form>
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
