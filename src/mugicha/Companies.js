import React, { useState, useEffect } from 'react';
import NavMugicha from "./nav"

import { Link } from 'react-router-dom';
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { getInterviews  } from "../admin/apiAdmin";
import { getParticipatingUsers } from './apiMugicha';
import { isAuthenticates } from "../auth";
import _ from 'lodash';

const Companies = ({ match }) => {
    const [interviews, setInterviews] = useState([]);
    const { darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([]);

    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });
  
    const loadInterviews = () => {
        getInterviews(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoading(false);
                setInterviews(data);
                // console.log(data)
            }
        });
    };

    const loadUsers = userId => {
        getParticipatingUsers(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
                setLoading(false)
            }
        });
    };

    const unique = [...new Set(interviews.map(interview => interview.company))];


    var companyData = _.uniqBy(interviews, 'company');
    var studentData = _.uniqBy(interviews, 'student');


    useEffect(() => {
       // loadInterviews();
        loadUsers();
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
                    <th>企業</th>
                    <th>学生</th>
                
                    </tr>
                </thead> {users.map((user, i) => 
                <tbody>
                    
              
                <td>
               {user.name}
                </td>
                <td>
                <Link to={`/mugicha/company/${user._id}`} >  Interview List  </Link>  <br/>
                <Link to={`/mugicha/companyprofile/${user._id}`} >  Profile  </Link>  
                </td>
              
       
         </tbody>)}
        </table>    
        </div>

              {companyData.map((interview) =>
              <><a href={"/mugicha/company/" + interview.company } >{interview.companies[0].name} </a>
              <br/>
              </>)}

              <br/>

              {studentData.map((interview) =>
              <><a href={"/mugicha/student/" + interview.student } >{interview.students[0].studentid} {interview.students[0].name} </a>
               <br/>
              </>)}
  
        </NavMugicha>
      </>
    );
  }
  
  export default Companies;