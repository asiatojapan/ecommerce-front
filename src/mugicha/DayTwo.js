import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { getCurrentInterviews } from "./apiMugicha"
import { isAuthenticates } from "../auth";
import _ from 'lodash'
import { Link } from 'react-router-dom';;

const DayTwo = () => {
    const [interviews, setInterviews] = useState([]);
    const { darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true)

    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });
  
    const loadInterviews = () => {
        getCurrentInterviews(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
            
                setLoading(false);
                setInterviews(data);
            }
        });
    };


    useEffect(() => {
        loadInterviews();
    }, []);
    
    return (
        <>  
          <NavMugicha>
          
          <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
            <section class="text-center">
              <div class="container">
                <h1 class="jumbotron-heading mb-0"> Day 2</h1>
                <p>
                <Link to={`/mugicha/day1`} className="btn btn-secondary my-2" >  View Day 1</Link> 
            
                </p>
              </div>
            </section>

        
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
                {interviews.map((interview, i)=> 
                 <>
                { interview.interviewItems.time_period === "2日"　?
                 <tr>
                     <UpdateInterviewItem companyName={interview.companies[0].name} studentId={interview.students[0].studentid}
                     studentName={interview.students[0].name} interviewItemId={interview.interviewItems._id} interviewId={interview._id} />
               </tr>:
                 <tr>
                  
                 </tr> }
         </> )}
        </tbody>
        </table>    
        </div>
        </NavMugicha>
      
      </>
    );
  }
  
  export default DayTwo;