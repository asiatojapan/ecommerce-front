import React, { useState, useEffect } from 'react';
import Layout2 from './Layout';
import { readInterview } from './apiCore';
import SiteWrapper from '../templates/SiteWrapper'
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


const Interview = props => {
    const [interview, setInterview] = useState({});
    const [student, setStudent] = useState({});
    const [error, setError] = useState(false);

    const loadSingleInterview = interviewId => {
        readInterview(interviewId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setInterview(data);
                setStudent(data.student);
            }
        });
    };

    useEffect(() => {
        const interviewId = props.match.params.interviewId;
        loadSingleInterview(interviewId);
    }, [props]);

    return (
      <SiteWrapper>
      <Page.Content>
      <Grid.Row>
      <Grid.Col lg={9}>
      <div class="card">
                    <div class="card-body">
                      <h3 class="card-title">{student.name}
                      </h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima
                        neque pariatur perferendis sed suscipit velit vitae voluptatem.</p>
                      <div class="card-text">
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
                  </div>
        </Grid.Col>
       </Grid.Row>
     </Page.Content>
    </SiteWrapper>
    );
};

export default Interview;
