import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
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
                if (data.length >0) {
                setStudentData(data[0].student)}
            }
        });
    };

    useEffect(() => {
        loadInterviews();
    }, []);
    
    const listBreadCrumbs = () => {
        return (
            <ol class="breadcrumb breadcrumb-arrows" aria-label="breadcrumbs">
            <li class="breadcrumb-item"><a href="/mugicha">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">{studentData.studentid} {studentData.name}</li>
            </ol>
        );
    };
    

    return (
        <>  
          <NavMugicha>
              {listBreadCrumbs()}
          <div class="alert alert-primary clearfix">
           <h4 class="float-left align-middle" style={{marginBottom: "0"}}>{studentData.studentid} {studentData.name} </h4>   
        <Link to={`/student/${studentData._id}`} target="_blank" class="btn btn-google float-right">  Profile </Link> 
        <a href={studentData.video} target="_blank" class="btn btn-vimeo float-right">  Vimeo </a> 
            </div>
            <div class="table-responsive-sm">
            <table class="table table-bordered">
                <thead>
                    <tr>
                    <th style={{width: "10%"}}>企業</th>
                    <th style={{width: "10%"}}>学生</th>
                    <th style={{width: "6%"}}>時間</th>
                    <th style={{width: "4%"}}>日</th>
                    <th style={{width: "7%"}}>結果</th>
                    <th style={{width: "30%"}}>ATOJコメント</th>
                    <th style={{width: "30%"}}>企業コメント</th>
                    <th style={{width: "10%"}}></th>
                     <th style={{width: "10%"}}></th>
        
                    </tr>
                </thead>

                <tbody>
                {interviews.map((interview, i) =>  <>
                {interview.interviewItems.length > 0 ? <> {interview.interviewItems.map((item, ii) => 
                <tr>
                     <UpdateInterviewItem companyName={interview.company.name} studentId={interview.student.studentid}
                     studentName={interview.student.name} interviewItemId={item._id} interviewId={interview._id} />
               </tr>
                  )} </> :
                 <><tr>
                    <td> <Link to={`/mugicha/company/${interview.company._id}`} >  {interview.company.name} </Link>  </td>
                    <td>  <Link to={`/mugicha/student/${interview.student._id}`} > {interview.student.studentid} {interview.student.name} </Link></td>
                    <td></td>
                    <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><Link to={`/mugicha/interview/${interview._id}`} > View </Link></td>
                 </tr> </> }
               </>
               )}
        </tbody>
        </table>    
        </div>
        </NavMugicha>
      </>
    );
  }
  
  export default Student;