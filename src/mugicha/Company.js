import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { getGroupInterviewList } from "../core/apiCore"
import { read} from '../user/apiUser';
import { isAuthenticates } from "../auth";

import { Link } from 'react-router-dom';

const Company = ({  match }) => {
    const [interviews, setInterviews] = useState([]);
    const { darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });


  
    const loadInterviews = () => {
        getGroupInterviewList(match.params.userId, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterviews(data);
                setLoading(false)
            }
        });
    };

    const init = userId => {
        // console.log(userId);
        read(userId, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };



    useEffect(() => {
        loadInterviews();
        init(match.params.userId);
    }, []);


    const listBreadCrumbs = () => {
        return (
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/mugicha">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page"> {values.name}</li>
            </ol>
          </nav>
        );
    };
    
    return (
        <>  
          <NavMugicha>
              {listBreadCrumbs()}
         
           <section class="text-center">
        <div class="container">
          <h1 class="jumbotron-heading mb-0">{values.name} </h1>
          <p>
          <a href={`/mugicha/companyprofile/${match.params.userId}`}class="btn btn-primary my-2"　> {values.name} Profile </a>
          <a href={`/mugicha/company/${match.params.userId}`} className="btn btn-secondary my-2"> {values.name} 面接リスト </a>
      
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
                {interviews.map((interview, i) =>  <>
                {interview.interviewItems.length > 0 ? <> {interview.interviewItems.map((item, ii) => 
                <tr>
                     <UpdateInterviewItem companyName={interview.company.name} studentId={interview.student.studentid}
                     studentName={interview.student.name} interviewItemId={item._id} interviewId={interview._id} />
               </tr>
                  )} </> :
                 <><tr>
                    <td> <Link to={`/mugicha/company/${interview.company._id}`} >  {interview.company.name} </Link>  </td>
                    <td>  <Link to={`/mugicha/student/${interview.student._id}`} > {interview.student.studentid} {interview.student.name} </Link></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td><Link to={`/mugicha/interview/${interview._id}`} > View </Link></td>
                 </tr> </> }
               </>
               )}
        </tbody>
        </table>    
        </div>
        </NavMugicha>
      </>
    );
  }
  
  export default Company;