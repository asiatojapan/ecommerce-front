import React from "react";
import { isAuthenticated } from "../auth";
import UpdateInterviewItem from "../user/UpdateInterviewItem";
import "../styles.css";

const InterviewItem = ({item, interview}) => {


    return (
      <div className="d-flex justify-content-between align-items-center" style={{borderTop: "1px solid #eee"}}>
        <div className="col-3 col-md-3 ml-5">
          {item.time_period} 
              <h3> {item.time}</h3>
       </div>
        <div className="col-md-6 text-right">

        <table className="table table-borderless">

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
<div className="col text-right">
<UpdateInterviewItem interviewId={interview._id} interviewItemId={item._id} /></div>
</div>
    );
};

export default InterviewItem;
