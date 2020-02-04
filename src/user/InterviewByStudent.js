import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getMyInterviews, getGroupInterviewList, getGroupInterviewPerson, readStudent } from "../core/apiCore";
import UserLayout from "./UserLayout";
import { Link } from "react-router-dom";
import CardStudent from '../templates/CardStudent';
import SiteWrapper from '../templates/SiteWrapper'
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  List,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import "../styles.css";

const InterviewByStudent = props => {

    const { user, token } = isAuthenticated();

    const [ interviews, setInterviews] = useState([]);

    const [ student, setStudent] = useState([]);

    const loadInterviews = () => {
        getGroupInterviewPerson(props.match.params.studentId, user._id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterviews(data);
            }
        });
    };

    const loadSingleStudent = studentId => {
        readStudent(props.match.params.studentId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStudent(data);
            }
        });
    };

      useEffect(() => {
            const studentId = props.match.params.studentId;
            loadInterviews();
            loadSingleStudent(props.match.params.studentId);
        }, [props]);

        const interviewList = () => (
          <div class="card">
          <div class="table-responsive">
                        <table class="table card-table table-striped table-vcenter">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Commit</th>
                              <th>Result</th>
                            </tr>
                          </thead>
                          <tbody>
                              {interviews.map((interview, i) =><tr>
                              <td>{interview.time_period}</td>
                              <td>{interview.time}</td>
                              <td class="w-1">{interview.result}</td>
                            </tr>  )}
                          </tbody>
                        </table>
                  </div>
                </div>
        )


    return (
      <SiteWrapper>
      <Page.Content>
      <Grid.Row>
      <Grid.Col lg={3}>
      <div class="card">
                <div class="card-body">
                <h2 class="mb-3"><strong>{student.studentid}</strong></h2>
                  <h3>{student.name}</h3>
                  <div class="mb-2">
                  <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
                  </div>
                  <div class="mb-2">
                  <Icon prefix="fe" name="user" /><strong>  性別: </strong> {student.gender? "男性": "女性"}
                  </div>
                  <div class="mb-2">
                  <Icon prefix="fe" name="user" /><strong>  年齢: </strong> {student.age}
                  </div>
                  <div class="mb-2">
                  <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
                  </div>
                  <div class="mb-2">
                  <Icon prefix="fe" name="book" />  <strong>大学: </strong>{student.university}
                  </div>
                  <div class="mb-2">
                  <Icon prefix="fe" name="book-open" />  <strong>学部: </strong>{student.faculty} ({student.education_bg})
                  </div>
                </div>
                <div class="card-footer">
                <button href={student.upload_fyp} class="btn btn-bitbucket">
                  FYP
                  </button>
                </div>
              </div>
      </Grid.Col >
      <Grid.Col lg={9}>
      {interviewList()}

      </Grid.Col >
      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
    );
};

export default InterviewByStudent;
