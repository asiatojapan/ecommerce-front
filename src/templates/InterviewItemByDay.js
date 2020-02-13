import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getMyInterviews, getGroupInterviewList, getGroupInterviewPerson, readStudent } from "../core/apiCore";
import { Link } from "react-router-dom";
import CardStudent from '../templates/CardStudent';
import SiteWrapper from '../templates/SiteWrapper'
import UpdateInterviewItem from "../user/UpdateInterviewItem"
import "../styles.css";
import styled from 'styled-components';

const InterviewItemByDay = ({item, interview}) => {

    const { user, token } = isAuthenticated();

    const passed = item.result === "合格"
    const failed = item.result === "不合格"

    const Card = styled.div`
          position: relative;
          background: #fff;
          padding: 20px 20px;
          margin-bottom: 20px;
          border-radius: 20px;
          position: relative;
          background: #fff;
          margin-bottom: 20px;
          border: 0;
          border-radius: 12px;
          color: #323232;
          overflow: hidden;
          text-align: left;
          transition: all .2s ease-out;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,.11);
      `;

    const CardFailed = styled.div`
          position: relative;
          background: #fff;
          padding: 20px 20px;
          margin-bottom: 20px;
          border-radius: 20px;
          position: relative;
          background: #fff;
          margin-bottom: 20px;
          border: 0;
          border-radius: 12px;
          color: #323232;
          overflow: hidden;
          text-align: left;
          transition: all .2s ease-out;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,.11);
        `;

    const children = (
                <div class="card-body p-2 d-flex align-items-center">
                  <span class="bg-secondary text-white stamp px-2 mr-3">{item.category}
                    </span>
                  <div class="mr-3 lh-sm">
                  <h3 class="mb-0">
                      <strong> {item.time}</strong>
                    <Link class="text-blue ml-3"
                    to={`/student/${interview.student._id}`} target="_blank">
                    {interview.student.name} ({interview.student.studentid}) </Link></h3>
                    <div> {item.result} / 日本語 {item.japanese_level} / Character {item.character_match} / スキル {item.skill_match} </div>
                  </div>
                  <div class="ml-auto">
                   {item.company_form === true ?
                      <div>
                      <UpdateInterviewItem interviewId={interview._id} interviewItemId={item._id} /> 
                      </div>:
                     <UpdateInterviewItem interviewId={interview._id} interviewItemId={item._id} /> }
                    </div>
                </div>
    )

    const display = () => {
       
          return (
              <Card>
               {children}
             </Card>
           ) 
       
    }

    return (
            <div>
                {display()}
            </div>
    );
};

export default InterviewItemByDay;
