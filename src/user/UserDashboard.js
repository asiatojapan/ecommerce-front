import React, { useState, useEffect } from "react";
import UserLayout from "./UserLayout";
import { isAuthenticated, getUser } from "../auth";
import { getUsers } from "../admin/apiAdmin";
import { readStudent, getStudents } from "../core/apiCore";
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

const Dashboard = React.memo( ({value}) => {

  const {
      user: { _id, name, email, role }
  } = isAuthenticated();

  const { user } = isAuthenticated();

  const [ likedstudents, setLikedstudents ] =  useState([]);

  const [students, setStudents] = useState([]);

  const loadStudents = () => {
      getStudents().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setStudents(data);
          }
      });
  };

  const [users, setUsers] = useState([]);

  const loadUsers = () => {
      getUsers().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setUsers(data);
          }
      });
  };

  const init = userId => {
      getUser(userId).then(data => {
          setLikedstudents(data.liked_students);
      });
      loadStudents();
      loadUsers();
  };

  useEffect(() => {
      init(user._id);
  }, []);




      return (
        <SiteWrapper>

        <Page.Content title={"Dashboard"}>
        <div className="my-3 my-md-5">
        <Container>


            </Container>
            </div>
              </Page.Content>
            </SiteWrapper>
)
});



export default Dashboard;
