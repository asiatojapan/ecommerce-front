import React, { useState, useEffect } from 'react';
import Layout2 from './Layout';
import { readStudent } from './apiCore';
import Card from './Card';

const Student = props => {
    const [student, setStudent] = useState({});
    const [error, setError] = useState(false);

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

    return (
        <Layout2>
        <div className="indiv-left">
          <div className="indiv-card">
            <div className="iframe-container">
              <iframe src="https://player.vimeo.com/video/372553472" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe>
            </div>
            <h4> {student.comments} </h4>
          </div>

          <div className="indiv-card">
            <dl className="indiv-header">About</dl>
            <p> {student.why_work_in_japan} </p>

            <div className="profile">
              <div className="profile-info">
                <dt> ID </dt>
                <dd> {student.studentid} </dd>
              </div>
              <div className="profile-info">
                <dt> 性別・年齢 </dt>
                <dd> {student.gender} | {student.age} </dd>
              </div>
              <div className="profile-info">
                <dt> 国籍・地域 </dt>
                <dd> {student.university} </dd>
              </div>
              <div className="profile-info">
                <dt> 大学 </dt>
                <dd> {student.university} </dd>
              </div>

              <div className="profile-info">
                <dt> 入社タイミング </dt>
                <dd> {student.it_skills} </dd>
              </div>

          </div>
        </div>

          <div className="indiv-card">
            <dl className="indiv-header">Education</dl>
            <ul className="indiv-entry">
              <div className="profile-entry-title"> {student.university} </div>
              <div className="profile-entry-title"> {student.faculty} - {student.major} </div>
              <div className="profile-entry-title"> {student.grad_year} - {student.grad_month} </div>


              <div className="profile-info">
              <dt> 研究テーマ　</dt>
              <dd style={{ color: "#666", fontSize: "1rem" }}> {student.research} </dd>
              </div>

              <div className="profile-info">
              <dt> 学歴備考　</dt>
              <dd> {student.education_bg} </dd>
              </div>

            </ul>
          </div>

          <div className="indiv-card">
            <dl className="indiv-header">IT Skills</dl>
            <div className="profile-info">
            {student.it_skills}
            </div>
          </div>

          <div className="indiv-card">
            <dl className="indiv-header">言語</dl>
            <ul className="profile-entries">
                <li>
                日本語：{student.japanese}
                </li>
                <li>
                英語：{student.english}
                </li>
              </ul>
          </div>

          <div className="indiv-card">
            <dl className="indiv-header">その他PR</dl>
            <h4> {student.other_pr} </h4>
          </div>

      </div>
      </Layout2>
    );
};

export default Student;
