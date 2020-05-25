import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { readInterview } from './apiInterview';
import { Link } from 'react-router-dom';
import moment from "moment"
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const StudentInterviews = ({match}) => {
  const [interview, setInterview] = useState({});
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState();
  const [studentId, setStudentId] = useState();
  const { darwin_uid, darwin_myTk } = isAuthenticates();

  const loadInterview = () => {
    readInterview(match.params.interviewId, darwin_uid, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setInterview(data);
              setCompanyId(data.company._id)
              setStudentId(data.student._id)
              setLoading(false)
            }
        });
    };


    useEffect(() => {
      loadInterview();
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
        <li className="breadcrumb-item"><a className="link" href="/admin/interviews">All Interviews</a></li>
        <li className="breadcrumb-item"><a className="link" href={`/student/${studentId}`} > {interview.student ? <> {interview.student.name} </> : null} </a></li>
        <li className="breadcrumb-item"><a className="link" href={`/admin/profile/${companyId}`} > {interview.company ? <> {interview.company.name} </> : null} </a></li>
      </ol>   
      <div className="list-list">
            <div style={{display: "flex", justifyContent: "space-between", alignItems:"center"}} >
               <div style={{fontSize: "24px"}}>{interview.student ? <> {interview.student.studentid} {interview.student.name} </> : null} 
              / {interview.company ? <> {interview.company.name} </> : null}</div>
            
           </div>
           { moment(interview.eventDay).format('YYYY/MM')}
      </div>
      <div class="row row">
      <div class="col col-4">
      <div className="list-list" style={{padding: "0px"}}>
            <div className="card-header"><div className="card-title">学生</div>
                      </div>
                  <div className="card-body">
                      <div className="mb-0">
                      <strong>Rate: </strong> {interview.companyRate} 
                      </div>
                      <div className="mb-0">
                      <strong>Rank: </strong> {interview.companyRank} 
                      </div>

                      <div className="mb-0">
                      <strong>Reason: </strong> {interview.reason} 
                      </div>
              </div>
        </div>

      </div>
      <div class="col col-8">
      {interview.interviewItems ? <> {interview.interviewItems.map((item, i) => 
      
      <div className="list-list" style={{padding: "0px"}}>
            <div className="card-header"><div className="card-title">{ moment(interview.event_day).format('YYYY/MM/DD')}  -  {item.phase} </div>
            <div class="card-options"><span class="stamp stamp-md bg-red">編集</span></div>
             </div>
                  <div className="card-body">
                       <div class="row row">
                         <div class="col col-3">
                         <h6 class="h6 mt-0">日本語力</h6>
                           <p>{item.japanese_level} </p>
                           </div>
                           <div class="col col-3">
                           <h6 class="h6 mt-0">人物マッチ</h6>
                             <p>{item.character_match} </p>
                          </div>
                          <div class="col col-3">
                             <h6 class="h6 mt-0">スキルマッチ</h6>
                             <p>{item.skill_match} </p>
                          </div>
                          <div class="col col-3">
                          <h6 class="h6 mt-0">結果</h6>
                             <p>{resultInNice(item.result)} </p>
                          </div>
                        </div>
                      <h6 class="h6 mt-0 mb-4">AtoJコメント</h6>
                      <p>{item.atojComment} </p>
                    
                      <h6 class="h6 mt-0 mb-4">企業コメント</h6>
                      <p>{item.companyComment} </p>

              </div>
        </div>

      )} </> : null }

      </div>

      </div>

     
      </Container>
      </SiteWrapper>
    );
};

export default StudentInterviews;
