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
          display: flex;
          flex-direction: column;
          min-width: 0;
          word-wrap: break-word;
          background-color: #f9f9f9;
          background-clip: border-box;
          border-radius: 0px;
      `;

    const CardFailed = styled.div`
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #eee;
            background-clip: border-box;
            border-radius: 0px;
        `;

    const children = (
                <div class="card-body p-2 d-flex align-items-center">
                  <span class="avatar mr-3 rounded"></span>
                  <div class="mr-3 lh-sm">
                  <h3 class="mb-0">
                      <strong> {item.time}</strong>
                    <Link class="text-blue ml-3"
                    to={`/student/${interview.student._id}`} target="_blank">
                    {interview.student.name} ({interview.student.studentid}) </Link></h3>
                    <div class="text-muted">{item.category}</div>
                  </div>
                  <div class="ml-auto">
                   {item.company_form === true ?
                      <span class="bg-green text-white stamp mr-3"> {item.result} </span>  :
                     <UpdateInterviewItem interviewId={interview._id} interviewItemId={item._id} /> }
                    </div>
                </div>
    )

    const display = () => {
        if (item.result === "合格")  {
          return (
              <Card>
               {children}
             </Card>
           ) }
        else if (item.result === "不合格")  {
          return (
          <CardFailed>
           {children}
         </CardFailed>
          )
       }
    }

    return (
            <div>
                {display()}
            </div>
    );
};

export default InterviewItemByDay;
