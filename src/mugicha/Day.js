import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { list } from "./apiMugicha"
import { getInterviews } from "../admin/apiAdmin";
import { isAuthenticates } from "../auth";
import _ from 'lodash'
import { Link } from 'react-router-dom';;

const DayOne = () => {
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


    const { category, search, results  } = data;
  
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

    var result = _.flatMap(interviews, function (interview) { 
      return _.map(interview.interviewItems, function (item) { 
          return { interview: interview, ...item  };
      });
    });

    const arr = _.sortBy(result, "time")
  



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
                <h1 class="jumbotron-heading mb-0">Welcome to Mugicha! </h1>
                <p>
                <Link to={`/mugicha/students`}  className="btn btn-secondary my-2">  View by Student </Link>   
                    <Link to={`/mugicha/companies`} className="btn btn-secondary my-2" >  View by Company </Link> 
            
                </p>
              </div>
            </section>

        
            <div class="table-responsive-sm">
                <table class="table table-bordered">
                <thead>
                    <tr>
                    <th style={{width: "10%"}}>企業</th>
                    <th style={{width: "10%"}}>学生</th>
                    <th style={{width: "10%"}}>時間</th>
                    <th style={{width: "10%"}}>日</th>
                    <th style={{width: "10%"}}>結果</th>
                    <th style={{width: "20%"}}>ATOJコメント</th>
                    <th style={{width: "20%"}}>企業コメント</th>
                    <th style={{width: "10%"}}></th>
                     <th style={{width: "10%"}}></th>
        
                    </tr>
                </thead>
                <tbody>

                {arr.map((item, i)=> 
     <div>
        { item.time_period === "1日"　?
       
                <tr>
                         </tr> :
        
        null }
        </div>
     )}
       
 
        </tbody>
        </table>    
        </div>
        </NavMugicha>
      
      </>
    );
  }
  
  export default DayOne;