import React from "react";
import moment from "moment"
import UpdateInterviewItem from "../user/UpdateInterviewItem";
import "../styles.css";

const InterviewItem = ({item, interview, showUpdateButton}) => {
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


    const showUpdate = showUpdateButton => {
        return (
            showUpdateButton && (
                <div className="col text-right">
                <UpdateInterviewItem interviewId={interview._id} interviewItemId={item._id} />
                </div>
          )
        )
      }
    


    return (
        <>
      <div className="d-flex justify-content-between align-items-center" style={{borderTop: "1px solid #eee"}}>
        <div className="col-3 col-md-3 ml-5">
       <span style={{color: "#278bfa" }} >{moment(item.event_day).format('YYYY/MM/DD')}</span>
       <div style={{fontSize: "20px"}} > {item.time} </div>
       </div>
        <div className="col-md-7 col-7">

        <table className="table table-borderless ">

      <tbody>
        <tr>
          <td style={{borderTop: "none", fontSize: "19px"}}> 
          <span style={{fontSize: "12px", color: "#278bfa"}}> 日本語力 </span>
          <br/>{item.japanese_level}</td>
          <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", color: "#278bfa"}}> スキルマッチ </span><br/>{item.skill_match}</td>
          <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", color: "#278bfa"}}> 人物マッチ </span><br/>{item.character_match}</td>
          <td style={{borderTop: "none", fontSize: "19px"}}> <span style={{fontSize: "12px", color: "#278bfa"}}> 結果 </span><br/>{resultInNice(item.result)}</td>
        </tr>
      </tbody>
    
    </table>
    <table className="table table-borderless ">
    <tbody>
        <tr>
          <td style={{borderTop: "none"}}> 
            <span style={{fontSize: "12px", color: "#278bfa"}}> コメント </span>
            <br/>
                {item.companyComment}</td>
          </tr>
      </tbody>
    
    </table>
</div>
    {showUpdate(showUpdateButton)}
</div>
</>
    );
};

export default InterviewItem;
