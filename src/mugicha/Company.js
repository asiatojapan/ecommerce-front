import React, { useState, useEffect } from 'react';
import NavMugicha from "./nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { getGroupInterviewList } from "../core/apiCore"
import { read, update, updateUser } from '../user/apiUser';
import { isAuthenticates } from "../auth";
import Accordion from 'react-bootstrap/Accordion';

import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';

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
          <div class="alert clearfix">
           <div class="align-middle"><h4> {values.name} </h4> </div>  
           <a href={`/mugicha/companyprofile/${match.params.userId}`} > {values.name} Profile </a>
           </div>

           <hr/>
            <div class="table-responsive-sm">
            <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>企業</th>
                    <th>学生</th>
                    <th>時間</th>
                    <th style={{width: "10%"}}>日</th>
                    <th style={{width: "10%"}}>Type</th>
                    <th style={{width: "10%"}}>結果</th>
                    <th style={{width: "30%"}}> ATOJコメント</th>
                    <th style={{width: "8%"}}> </th>
                    </tr>
                </thead>
                <tbody>
                {interviews.map((interview, i) =>  
                    <>{interview.interviewItems.map((item, ii) => 
                   <> 
                    <UpdateInterviewItem companyName={interview.company.name} studentId={interview.student.studentid}
                    studentName={interview.student.name} interviewItemId={item._id} interviewId={interview._id} />
                </>
                 )}
                 </>)}
                </tbody>
        </table>    
        </div>
        </NavMugicha>
      </>
    );
  }
  
  export default Company;