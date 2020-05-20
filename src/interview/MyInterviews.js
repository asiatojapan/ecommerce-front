import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import {  getInterviewsByCompany  } from './apiInterview';
import { Link } from 'react-router-dom';
import moment from "moment"
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const MyInterviews = ({match}) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darwin_uid, darwin_myTk } = isAuthenticates();

  const loadInterviews = () => {
    getInterviewsByCompany(match.params.userId, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
            setInterviews(data);
              setLoading(false)
            }
        });
    };


    useEffect(() => {
      loadInterviews();
    }, []);


    const resultInNice = (result) => {
      if (result === "Nil") {
          return ""
      }
      else if (result === "合格") {
          return "●"
      }
      else if (result === "不合格") {
          return "X"
      }
      else if (result === "三角") {
          return "▲"
      }
      else if (result === "辞退") {
          return "辞退"
      }
      else if (result === "内定") {
          return "内定"
      }
      else {
          return ""
      }
  }

    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>

      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item"><a className="link" href="/admin/users">All Users</a></li>
        <li className="breadcrumb-item"><a className="link" href={`/admin/profile/${match.params.userId}`}> Profile </a></li>
      </ol>   
        
      <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>ID </th>
                    <th>名前</th>
                    <th>Status</th>
                    <th>Event</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead> 
                
                <tbody>{interviews.map((interview,i) => 
                <tr> 
                  <td>
                      <Link to={`/student/${interview.student[0]._id}`}>{interview.student[0].studentid}</Link>
                  </td>
                    <td>
                      {interview.student[0].name}
                    </td>
                  <td>
                      {interview.status}
                    </td>
                    <td> { moment(interview.eventPeriod).format('YYYY/MM')} </td>
                   {interview.interviewItems.length === 0 ? 
                    <> 
                    <td></td><td></td>
                    <td></td><td></td>
                    </> :
                     <> 
                    {interview.interviewItems.length === 1 ?
                    <> 
                    {interview.interviewItems.map((item,i) => <>
                        <td> {item.phase} </td>
                        <td> {resultInNice(item.result)} </td> 
                        <td></td>
                        <td></td>
                        </>)} 
                    </> : 
                    <>
                      {interview.interviewItems.map((item,i) => <>
                        <td>  {item.phase} </td>
                        <td>  {resultInNice(item.result)} </td> </>)} 
                        </>}
                   </>}
                  
                </tr>
            )}
         
         </tbody>
        </table>    
        </div>
      </Container>
      </SiteWrapper>
    );
};

export default  MyInterviews;
