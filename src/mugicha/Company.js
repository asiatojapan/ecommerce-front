import React, { useState, useEffect } from 'react';
import NavMugicha from "./nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { getGroupInterviewList } from "../core/apiCore"
import { read, update, updateUser } from '../user/apiUser';
import { isAuthenticates } from "../auth";

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
    
    return (
        <>  
          <NavMugicha>
          <div class="card">
            <div class="card-body">
                 <h5 class="card-title">{values.name}</h5>
            </div>
            </div>
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
                    <th style={{width: "13%"}}> </th>
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
        </NavMugicha>
      </>
    );
  }
  
  export default Company;