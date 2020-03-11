import React  from "react";
import { Link } from "react-router-dom";
import UpdateInterviewItem from "../user/UpdateInterviewItem";
import {
  Icon,
} from "tabler-react";
import "../styles.css";

const InterviewItemByDay = ({item, interview, resumeLoading}) => {
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
    const children = (

      <div class="list-list" style={{backgroundColor: "#fff", padding: "0"}}>
        <div class="d-flex justify-content-between align-items-center"> 
        <img src={interview.student.videoImg} alt="img" style={{height: "140px", marginRight: "1rem"}}/> 
        <div class="ml-3">
        <div>
        {interview.student.status === "来日決定" ? <div> <span style={{color: "#659c2d"}}>●</span> <span style={{color: "#659c2d"}}> 来日決定 </span> </div>　: ""} 
  
        <Link to={`/interview/student/${interview.student._id}`} target="_blank"  style={{fontSize: "16px"}} className="link" >
                            <b> {interview.student.studentid} </b> {interview.student.name} </Link>
        <div style={{marginBottom: "0px"}}>
          <div>
          <Icon prefix="fe" name="user" /><strong> 性別・年齢: </strong> {interview.student.gender === "male" ? "男性": "女性"}・{_calculateAge(interview.student.dob)}
          </div>
          <div>
          <Icon prefix="fe" name="globe" /> <strong>国籍・地域: </strong>{interview.student.country}
          </div>
          </div>
        </div>
        </div>

        <div class="ml-auto align-items-center"> 
               <div class="row align-items-center">
                 <div class="col">
                 <table class="table table-borderless">
   
         <tbody>
         <tr>
           <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", fontColor: "#eee"}}> 日本語力 </span><br/>{item.japanese_level}</td>
           <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", fontColor: "#eee"}}> Skill level </span><br/>{item.skill_match}</td>
           <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", fontColor: "#eee"}}> Character </span><br/>{item.character_match}</td>
           <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", fontColor: "#eee"}}> Result </span><br/>{item.result}</td>
         </tr>
         </tbody>
         </table>
         </div>
         <div class="col-auto m-3">
         <UpdateInterviewItem interviewId={interview._id} interviewItemId={item._id} />
         </div>
         </div>
         </div>
</div>
</div>
              
    )

    const display = () => {
       
          return (
              <div>
               {children}
             </div>
           ) 
       
    }

    return (
            <div>
                {display()}
            </div>
    );
};

export default InterviewItemByDay;
