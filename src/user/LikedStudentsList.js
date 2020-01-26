import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent } from "../core/apiCore";
import LikedStudents from "./LikedStudents";
import { Link } from "react-router-dom";
import CardMainStudent from '../templates/CardMainStudent';
import {
  Container,
  Page,
  Grid,
  Card,
  Stamp,
  ContactCard,
  Timeline, Button
} from "tabler-react";
import SiteWrapper from '../templates/SiteWrapper'
import "../styles.css";


const LikedStudentsList = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const { user } = isAuthenticated();

    const [ likedstudents, setLikedstudents ] =  useState([]);


    const init = userId => {
        getUser(userId).then(data => {
            setLikedstudents(data.liked_students);
        });
    };


    useEffect(() => {
        init(user._id);
    }, []);

    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };



    return (

      <SiteWrapper>
      <Page.Content title={"My Saved Students (" + likedstudents.length + ")"}>
      <div className="my-3 my-md-5">
      <Container>
          {likedstudents.map((s, i) => (
            <CardMainStudent student={s} />
          ))}
          </Container>
          </div>
            </Page.Content>
          </SiteWrapper>

    );
};

export default LikedStudentsList;
