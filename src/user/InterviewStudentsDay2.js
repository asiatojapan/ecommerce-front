import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getMyInterviews, getGroupInterviewList } from "../core/apiCore";
import UserLayout from "./UserLayout";
import { Link } from "react-router-dom";
import CardStudent from '../templates/CardStudent';
import SiteWrapper from '../templates/SiteWrapper'
import InterviewNav from '../templates/InterviewNav'
import InterviewItemByDay from "../templates/InterviewItemByDay";
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Tab,
  Tabs,
  Table,
  Alert,
  Nav,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import "../styles.css";

const InterviewStudents = () => {
    const {
        user: { _id, name, email, role, round }
    } = isAuthenticated();

    const { user, token } = isAuthenticated();

    const [ interviews, setInterviews] = useState([]);
    const [ loading, setLoading] = useState(true)

    const loadInterviews = () => {
        getGroupInterviewList(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
              setLoading(false)
              setInterviews(data);
            }
        });
    };



      useEffect(() => {
            loadInterviews();
        }, []);


    return (
      <InterviewNav>
          <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      {interviews.map((interview,i) => <div>
        { interview.interviewItems.length ? interview.interviewItems.map((item, i) =>
          <div>
          { item.time_period === "2日"　?
          <div class="mt-6">
            <InterviewItemByDay item={item} interview={interview}/> </div>
            : "" }
          </div>
        ) : ""} </div> )}
      </InterviewNav>
    );
};

export default InterviewStudents;
