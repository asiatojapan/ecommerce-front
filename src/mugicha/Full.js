import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { list } from "./apiMugicha"
import { getInterviews } from "../admin/apiAdmin";
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';

const Full = () => {
    const [interviews, setInterviews] = useState([]);
    const { darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true)
  
    const loadInterviews = () => {
        getInterviews(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoading(false);
                setInterviews(data);
            }
        });
    };


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



    useEffect(() => {
        loadInterviews();
    }, []);
    
    return (
        <>  
          <NavMugicha>
          
          <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
 

        
<div class="table-responsive-sm">
                <table class="table table-bordered">
                <thead>
                    <tr>
                    <th style={{width: "10%"}}>企業</th>
                    <th style={{width: "4%"}}>ID</th>
                    <th style={{width: "10%"}}>学生</th>
                    <th style={{width: "6%"}}>時間</th>
                    <th style={{width: "4%"}}>日</th>
                    <th style={{width: "7%"}}>結果</th>
                    <th style={{width: "30%"}}>ATOJコメント</th>
                    <th style={{width: "30%"}}>企業コメント</th>
                    <th style={{width: "10%"}}>日本語</th>
                    <th style={{width: "10%"}}>人物</th>
                     <th style={{width: "10%"}}>スキル</th>
                     <th style={{width: "10%"}}></th>
                    </tr>
                </thead>
                <tbody>
                {interviews.map((interview, i) =>  <>
                {interview.interviewItems.length > 0 ? <> {interview.interviewItems.map((item, ii) => 
                <tr>
              <td>
                 <Link to={`/mugicha/company/${interview.company}`} >  {interview.companies[0].name} </Link> 
                </td>

                <td>
                <Link to={`/mugicha/student/${interview.student}`} > {interview.students[0].studentid}  </Link> 
                </td>

                <td>
                <Link to={`/mugicha/student/${interview.student}`} > {interview.students[0].name}   </Link> 
                </td>

                <td>
                     {item.time}
                </td>

                <td>
                    {item.time_period === "1日"　? <span class="badge badge-primary">1日</span>:<span class="badge badge-danger">2日</span>}
                </td>
                <td>
                    {resultInNice
                    (item.result)}
                </td>
                <td>
                    {item.atojComment} 
                </td>
                <td className="pre-line">
                    {item.companyComment} 
                </td>
                <td>
                    {item.japanese_level} 
                </td>
                <td>
                    {item.character_match} 
                </td>
                <td>
                    {item.skill_match} 
                </td>
                <td>
                    {item.company_form === true? "済"　: null } 
                </td>
             
                 </tr>
                  )} </> : null  }
               </>
               )}
        </tbody>
        </table>    
        </div>
        </NavMugicha>
      
      </>
    );
  }
  
  export default Full;