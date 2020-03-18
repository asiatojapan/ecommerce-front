import React from 'react';
import { Link } from 'react-router-dom';
import InterviewItem from "./InterviewItem";
import {
  Icon
} from "tabler-react";

const CardStudent = ({interview, student, i}) => {
  function _calculateAge(dateString) { // birthday is a date
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  return (
    <div key={i} className="list-list" style={{backgroundColor: "#fff", padding: "0"}}>
    <div className="d-flex flex-column">
    <div className="d-flex align-items-center mt-auto"> 
    <img src={student.videoImg} alt="img" style={{height: "140px", marginRight: "1rem"}}/> 
    <div className="ml-3">
      <div>
      {student.status === "来日決定" ? <div> <span style={{color: "#659c2d"}}>●</span> <span style={{color: "#659c2d"}}> 来日決定 </span> </div>　: ""} 
      <Link to={`/interview/student/${interview.student._id}`} target="_blank" className="link"  style={{fontSize: "16px"}}>
        <b> {interview.student.studentid} </b> {interview.student.name} </Link>
      
     <div style={{marginBottom: "0px"}}>
        <div>
        <Icon prefix="fe" name="user" /><strong> 性別・年齢: </strong> {student.gender === "Male" ? "男性": "女性"}・{_calculateAge(student.dob)}
        </div>
        <div>
        <Icon prefix="fe" name="globe" /> <strong>国籍・地域: </strong>{student.country}
        </div>
        </div>
    </div>
    </div>
    <div className="ml-auto" style={{marginRight: "10px"}}> 
    </div>
    </div>
    { interview.interviewItems.length ? interview.interviewItems.map((item, i) =>
   <div>
        <InterviewItem interview={interview} key={i} item={item}/>
      </div>
    ) : ""}
    </div>
  </div>


);
};

export default CardStudent;
