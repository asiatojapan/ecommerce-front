import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getMyInterviews } from "../core/apiCore";
import UserLayout from "./UserLayout";
import LikedStudents from "./LikedStudents";
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
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import "../styles.css";

const LikedStudentsList = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const { user, token } = isAuthenticated();

    const [ interviews, setInterviews] = useState([]);

    const loadInterviews = () => {
        getMyInterviews(user._id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterviews(data);
            }
        });
    };

      useEffect(() => {
            loadInterviews();
        }, []);


    return (
      <SiteWrapper>

      <Page.Content title={"My Interviews (" + interviews.length + ")"}>
      <div className="my-3 my-md-5">
      <Container>

      {interviews.map((c,i) => <div>
        <CardStudent student={c.student} /></div>)}
          </Container>
          </div>
          </Page.Content>
    </SiteWrapper>
    );
};

export default LikedStudentsList;
