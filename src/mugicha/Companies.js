import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import { Link } from 'react-router-dom';
import { getInterviews  } from "../admin/apiAdmin";
import { getParticipatingUsers } from './apiMugicha';
import { isAuthenticates } from "../auth";

import Table from 'react-bootstrap/Table';
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
        <div class="card">
            <div class="table-responsive">
        <table class="table table-vcenter card-table">
                <thead>
                    <tr>
                    <th>企業</th>
                    <th>Interview List</th>
                    <th>Profile</th>
                    </tr>
                </thead> {users.map((user, i) => 
                <tbody>
                    
              
                <td>
               {user.name}
                </td>
                <td>
                <Link to={`/mugicha/company/${user._id}`} >  Interview List  </Link> </td>
                <td>
                <Link to={`/mugicha/companyprofile/${user._id}`} >  Profile  </Link>  
                </td>
              
       
         </tbody>)}
        </table>    
        </div>
        </div>
        
        </NavMugicha>
      </>
    );
  }
  
  export default Companies;