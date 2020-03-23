import React, { useState, useEffect } from 'react';
import NavMugicha from "./nav"
import { Link } from 'react-router-dom';
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { readStudentInterview } from './apiMugicha';
import { isAuthenticates } from "../auth";

const Student = ({  match }) => {
    const [interviews, setInterviews] = useState([]);
    const {darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState({})
 
  
    const loadInterviews = () => {
        readStudentInterview(match.params.studentId, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterviews(data);
                setLoading(false)
                setStudentData(data[0].student)
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
                    <th style={{width: "10%"}}>日</th>
                    <th style={{width: "10%"}}>Type</th>
                    <th style={{width: "10%"}}>結果</th>
                    <th style={{width: "30%"}}> ATOJコメント</th>
                    <th style={{width: "13%"}}> </th>
                    </tr>
                </thead>
                <tbody>
                {interviews.map((interview, i) =>  
                    <>{interview.interviewItems.map((item, ii) => 
                   <> 
                    <UpdateInterviewItem companyName={interview.company.name} studentId={interview.student.studentid}
                    studentName={interview.student.name} interviewItemId={item._id} interviewId={interview._id} />
                </>
                 )}
                 </>)}
                </tbody>
        </table>    
        </NavMugicha>
      </>
    );
  }
  
  export default Student;