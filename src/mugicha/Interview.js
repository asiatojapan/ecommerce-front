import React, { useState, useEffect } from 'react';
import NavMugicha from "./nav"
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
    
    return (
        <>  
          <NavMugicha>
          <div class="card">
          <div class="card-body">
          <Link to={`/student/${studentData._id}`} target="_blank" >  {studentData.studentid} {studentData.name} </Link> 
           </div>
            </div>
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>企業</th>
                    <th>学生</th>
                    <th>時間</th>
                    <th>日</th>
                    <th>Type</th>
                    <th style={{width: "10%"}}>Type</th>
                    <th style={{width: "10%"}}>結果</th>
                    <th style={{width: "30%"}}> ATOJコメント</th>
                    <th style={{width: "30%"}}> 企業コメント</th>
                    <th style={{width: "13%"}}> </th>
                    </tr>
                </thead>
                <tbody>
                    


                <td>
                <Link to={`/mugicha/company/${companyData}`} >  {companyData.name} </Link>
                </td>
                <td>
                <Link to={`/mugicha/student/${studentData}`} >  {studentData.studentid} {studentData.name}  </Link>  
                </td>
                <td>{console.log(interviewItem)}
                {interviewItem.map((i) => <>
                {i.character_match}
                {i.skill_match}
                </>)}

                </td>
                </tbody>
        </table>    
        </NavMugicha>
      </>
    );
  }
  
  export default Interview;