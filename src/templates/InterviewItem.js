import React from "react";
import { isAuthenticated } from "../auth";
import UpdateInterviewItem from "../user/UpdateInterviewItem";
import "../styles.css";

const InterviewItem = ({item, interview}) => {
  const resultInNice = (result) => {
    if (result === "Nil") {
        return "Nil"
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
      <div className="d-flex justify-content-between align-items-center" style={{borderTop: "1px solid #eee"}}>
        <div className="col-3 col-md-3 ml-5">
       <span style={{fontSize: "24px"}}> {item.time} ({item.time_period})</span>
       </div>
        <div className="col-md-6 text-right">

        <table className="table table-borderless">

      <tbody>
        <tr>
          <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", fontColor: "#eee"}}> 日本語力 </span><br/>{item.japanese_level}</td>
          <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", fontColor: "#eee"}}> スキルマッチ </span><br/>{item.skill_match}</td>
          <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", fontColor: "#eee"}}> 人物マッチ </span><br/>{item.character_match}</td>
          <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", fontColor: "#eee"}}> 結果 </span><br/>{resultInNice(item.result)}</td>
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
