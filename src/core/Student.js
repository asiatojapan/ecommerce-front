import React, { useState, useEffect } from 'react';
import Layout2 from './Layout';
import { readStudent } from './apiCore';
import SiteWrapper from '../templates/SiteWrapper'
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";

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
      <SiteWrapper>
      <Page.Content>
      <Grid.Row>
      <Grid.Col lg={9}>
      <div class="card card-sm">
          <div class="d-block">
            <div className="iframe-container">
                          <iframe src="https://player.vimeo.com/video/372553472" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe>
                        </div>
                        </div>
                        <div class="card-body">
                          <h4>{student.comments}</h4>
                        </div>
                      </div>
                      <div class="card">
                      <div class="card-header"><div class="card-title">Basic info</div>
                      </div>
                                        <div class="card-body">

                                          <div class="mb-2">
                                            <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
                                          </div>
                                          <div class="mb-2">
                                           <Icon prefix="fe" name="user" /><strong>  性別・年齢: </strong> {student.gender} | {student.age}
                                          </div>
                                          <div class="mb-2">
                                          <Icon prefix="fa" name="map-marker" />  <strong>国籍・地域: </strong>{student.country}
                                          </div>
                                          <div class="mb-2">
                                          <Icon prefix="fe" name="book" />  <strong>大学: </strong>{student.university}
                                          </div>
                                          <div class="mb-2">
                                          <Icon prefix="fe" name="book-open" />  <strong>学部: </strong>{student.faculty}
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

      </Grid.Col>
      <Grid.Col lg={3}>
      <Card>
        hello
        </Card>
        </Grid.Col>
       </Grid.Row>
     </Page.Content>
    </SiteWrapper>
    );
};

export default Student;
