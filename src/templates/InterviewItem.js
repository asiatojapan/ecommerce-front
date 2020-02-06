import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getMyInterviews, getGroupInterviewList, getGroupInterviewPerson, readStudent } from "../core/apiCore";
import { Link } from "react-router-dom";
import CardStudent from '../templates/CardStudent';
import SiteWrapper from '../templates/SiteWrapper'
import UpdateInterviewItem from "../user/UpdateInterviewItem0"
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

const InterviewItem = ({item, interview}) => {

    const { user, token } = isAuthenticated();

    return (
      <div class="card-footer p-3 d-flex align-items-center">

                    <div class="strong">
                    <span class="bg-secondary text-white stamp px-2 mr-3">{item.category}
                    </span>
                    </div>
                    <div class="mr-3 lh-sm">
                    <div class="strong">
                      Japanese Level: {item.japanese_level} <br />
                      Character Match: {item.character_match}<br />
                      Skill Match: {item.skill_match}
                    </div>
                  </div>
                  <div class="ml-auto">
                  {item.phase}/ {item.time_period} / <strong>{item.time}</strong> /   <strong>{item.result}</strong>
                  </div>
                  <UpdateInterviewItem interviewId={interview._id} interviewItemId={item._id} />

      </div>
    );
};

export default InterviewItem;
