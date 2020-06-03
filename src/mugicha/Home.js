import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { list, getCurrentInterviews } from "./apiMugicha"
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';

const Home = () => {
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
        getCurrentInterviews(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoading(false);
                setInterviews(data);
            }
        });
    };

  
    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
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
          <h1 class="jumbotron-heading mb-0">Welcome to Mugicha! </h1>
          <p>
          　
          <Link to={`/mugicha/day`}  className="btn btn-secondary my-2">  View by Day </Link>   
          <Link to={`/mugicha/students`}  className="btn btn-secondary my-2">  View by Student </Link>   
        　<Link to={`/mugicha/companies`} className="btn btn-secondary my-2" >  View by Company </Link> 
        <Link to={`/mugicha/past`}  className="btn btn-secondary my-2">  View Past Interviews</Link>   
        
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
                {interviews.map((interview, i) =>  
                
              
                <tr>
                     <UpdateInterviewItem companyName={interview.companies[0].name} studentId={interview.students[0].studentid}
                     studentName={interview.students[0].name} interviewItemId={interview.interviewItems._id} interviewId={interview._id} />
               </tr>
               
               )}
        </tbody>
        </table>    
        </div>
        </NavMugicha>
      
      </>
    );
  }
  
  export default Home;