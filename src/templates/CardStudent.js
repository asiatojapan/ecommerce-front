import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import InterviewItem from "./InterviewItem";
import {
  Icon
} from "tabler-react";

const CardStudent = ({interview, student, resumeLoading}) => {

  return (
    <div class="list-list" style={{backgroundColor: "#fff", padding: "0"}}>
           <div class="d-flex flex-column">
    <div class="d-flex align-items-center mt-auto"> 
    <img src={student.videoImg} style={{height: "100px", marginRight: "1rem"}}/> 
    <div class="ml-3">
      <div>
    <Link to={`/student/${student._id}`} style={{fontSize: "16px"}}> <b>{student.studentid}</b> {student.name} </Link> 
    <div  style={{marginBottom: "0px"}}>
        <div>
        <Icon prefix="fe" name="user" /><strong> 性別・年齢: </strong> {student.gender === "male" ? "男性": "女性"}・{student.age}
        </div>
        <div>
        <Icon prefix="fe" name="globe" /> <strong>国籍・地域: </strong>{student.country}
        </div>
        </div>
    </div>
    </div>
    <div class="ml-auto" style={{marginRight: "10px"}}> 
    {student.status === "来日決定" ? <div> <span class="text-success">●</span> <text class="text-success"> 来日決定 </text> </div>　: ""}   
    {<a href={interview.url} target="_blank" class="btn btn-primary btn-sm"
    >
      {resumeLoading ? 'Loading…' : student.studentid }
    </a>}
    </div>
    </div>
    { interview.interviewItems.length ? interview.interviewItems.map((item, i) =>
   <div>
        <InterviewItem interview={interview} item={item}/>
      </div>
    ) : ""}
    </div>
  </div>


);
};

export default CardStudent;
