import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { list, getCurrentInterviewsByStudents } from "./apiMugicha"
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';
import moment from "moment";

const ParticipatingStudents = () => {
    const [interviews, setInterviews] = useState([]);
    const { darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true)


    const loadInterviews = () => {
        getCurrentInterviewsByStudents(darwin_uid, darwin_myTk).then(data => {
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
    
        
       
            {interviews.map((interview, i) =>  
              <div className="list-list" style={{padding: "0px"}}>
              <div className="card-header">
                  <div className="card-title"> 
                  {interview._id[0].studentid} {interview._id[0].name}</div>
                </div>
                <div className="card-body">
                 <div class="table-responsive-sm">
        
                 <table class="table table-bordered">
                 <thead>
                     <tr>
                     <th style={{width: "25%"}}>企業</th>
                     <th>時間</th>
         
                     </tr>
                 </thead>
                 <tbody>
              
                
                {interview.interview.map((items, i) =>
                 <tr><td>{items.company[0].name}</td>
                 <td> {items.interviewItems.map((iItems, ii) => 
                    <>   {iItems.time_period === "1日"　? <span class="badge badge-primary mr-4">1日</span>:<span class="badge badge-danger mr-4">2日</span>} 
                     {moment(iItems.event_day).format("MM-DD")} / {iItems.time} {"   "}
                    {resultInNice(iItems.result)} 
                    {ii != (items.interviewItems.length-1) ?  <hr style={{"margin": "8px 0"}} /> : ''}
                     </>
                  )}</td>
                  </tr>
                )}
                    
               
              
        </tbody>
        </table>    
        </div> </div> </div> )}
        </NavMugicha>
      
      </>
    );
  }
  
  export default ParticipatingStudents;