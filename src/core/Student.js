import React, { useState, useEffect } from 'react';
import Layout2 from './Layout';
import { readStudent } from './apiCore';
import SiteWrapper from '../templates/SiteWrapper'
import  AddFav2  from './AddFav2';
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Tag,
  Table,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";

import {PdfDocument} from "../pdf/PdfDocument";

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
            {student.video == null?  "" : <div><iframe src={"https://player.vimeo.com/video/" + student.video.slice(-9) + "?autoplay=1&loop=1&autopause=0"} ></iframe> </div> }

                        </div>
                        </div>
                        <div class="card-body">
                          <h4>{student.comments}</h4>
                        </div>
                        <div class="card-footer">
                        <Tag.List>
                            <Tag color="black">{student.categories}</Tag>
                        </Tag.List>
                        </div>
                      </div>
                      <div class="card">
                      <div class="card-header"><div class="card-title">Basic Info</div>
                      </div>
                      <div class="card-body">

                      <div class="mb-2">
                      <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="user" /><strong>  性別・年齢: </strong> {student.gender} | {student.age}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="book" />  <strong>大学: </strong>{student.university}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>学部: </strong>{student.faculty}
                      </div>
                      </div>
                      </div>

                      <div class="card">
                      <div class="card-header"><div class="card-title">Education</div>
                      </div>
                      <div class="card-body">

                      <div class="mb-2">
                      <strong>{student.university}  </strong>
                      </div>
                      <div class="mb-2">
                      {student.faculty} - {student.major}
                      </div>
                      <div class="mb-2 text-muted">
                      {student.grad_year} - {student.grad_month}
                      </div>
                      <div class="hr-text">研究テーマ</div>
                      <div class="mb-2">
                      {student.research}
                      </div>
                      <div class="hr-text">学歴備考</div>
                      <div class="mb-2">
                      {student.education_bg}
                      </div>
                      </div>
                      </div>

                      <div class="card">
                      <div class="card-header"><div class="card-title">IT Skills</div>
                      </div>
                      <div class="card-body">
                      <Tag.List>
                          <Tag color="blue">{student.it_skills}</Tag>
                      </Tag.List>
                      </div>
                      </div>

                      <div class="card">
                      <div class="card-header"><div class="card-title">言語</div>
                      </div>
                      <div class="card-body">
                      <div class="mb-2">
                      <strong>日本語: </strong> {student.japanese}
                      </div>
                      <div class="mb-2">
                      <strong>英語: </strong> {student.english}
                      </div>
                      </div>
                      </div>

                      <div class="card">
                      <div class="card-header"><div class="card-title">その他PR</div>
                      </div>
                      <div class="card-body">
                      {student.other_pr}
                      </div>
                      </div>


      </Grid.Col>
      <Grid.Col lg={3}>
      <div class="card">
      <div class="card-body">
        <AddFav2 student={props.match.params.studentId} />
      </div>
      </div>

      <div class="card">
      <div class="card-header"><div class="card-title">Downloads</div>
      </div>
      <div class="card-body">
      <div class="mb-2">
      <PdfDocument student={student}/>
      <button href={student.upload_fyp} class="btn btn-bitbucket ml-2">
        FYP
        </button>
      </div>
      </div>
      </div>
        </Grid.Col>
       </Grid.Row>
     </Page.Content>
    </SiteWrapper>
    );
};

export default Student;
