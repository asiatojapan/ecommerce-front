import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import { Link } from 'react-router-dom';
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { readInterview } from './apiMugicha';
import { isAuthenticates } from "../auth";

const Interview = ({ match }) => {
    const [interview, setInterview] = useState([]);
    const {darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState({})
    const [companyData, setCompanyData] = useState({})
    const [interviewItem, setInterviewItem] = useState([])
 
  
    const loadInterviews = () => {
        readInterview(match.params.interviewId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterview(data);
                setStudentData(data.student)
                setCompanyData(data.company)
                setInterviewItem(data.interviewItems)
                console.log(data)
            }
        });
    };

    useEffect(() => {
        loadInterviews();
    }, []);
    
    const listBreadCrumbs = () => {
        return (
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/mugicha">Home</a></li>
              <li class="breadcrumb-item"><a href={'/mugicha/student/' + studentData._id}> {studentData.studentid} {studentData.name} </a></li>
              <li class="breadcrumb-item active" aria-current="page"> {companyData.name}</li>
            </ol>
          </nav>
        );
    };

    return (
        <>  
          <NavMugicha>
            
        {listBreadCrumbs()}
        
          <div class="alert alert-primary clearfix">{companyData.name}
           <h4 style={{marginBottom: "0"}}>{studentData.studentid} {studentData.name} </h4>   
         <br/>
        <Link to={`/student/${studentData._id}`} target="_blank" class="btn btn-google">  Profile </Link> 
        <a href={studentData.video} target="_blank" class="btn btn-vimeo">  Vimeo </a> 
            </div>

            <div class="card">
            <div class="card-body">
               <p> Company Rank: {interview.companyRank} 　<br/>
                Company Rate: {interview.companyRate} 　<br/>
                Company Reason: {interview.reason} 　<br/>
                </p>
            </div>
            </div>
    
    <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>企業</th>
                    <th>学生</th>
                    <th style={{width: "15%"}}></th>
                    <th　style={{width: "5%"}}>日</th>
                    <th style={{width: "7%"}}>時間</th>
                    <th style={{width: "7%"}}>結果</th>
                    <th style={{width: "30%"}}> ATOJコメント</th>
                    <th style={{width: "30%"}}> 企業コメント</th>
                    </tr>
                </thead> {interviewItem.map((i) => 
                <tbody>
                    
              
                <td>
                <Link to={`/mugicha/company/${companyData._id}`} >  {companyData.name} </Link>
                </td>
                <td>
                <Link to={`/mugicha/student/${studentData._id}`} >  {studentData.studentid} {studentData.name}  </Link>  
                </td>
                    <td> Character match: {i.character_match} <br/> 
                         Skill match: {i.skill_match} <br/> 
                         Skill match: {i.skill_match} <br/> 
                    </td>
                    <td> {i.time_period}</td>
                    <td> {i.time}</td>
                    <td> {i.result}</td>
                    <td> {i.atojComment}</td>
                    <td> {i.companyComment}</td>
       
         </tbody>)}
        </table>    
        </div>
        </NavMugicha>
      </>
    );
  }
  
  export default Interview;