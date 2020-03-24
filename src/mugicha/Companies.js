import React, { useState, useEffect } from 'react';
import NavMugicha from "./nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { getInterviews } from "../admin/apiAdmin";
import { read, update, updateUser } from '../user/apiUser';
import { isAuthenticates } from "../auth";
import _ from 'lodash';

const Companies = ({  match }) => {
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

    const unique = [...new Set(interviews.map(interview => interview.company))];


    var companyData = _.uniqBy(interviews, 'company');
    var studentData = _.uniqBy(interviews, 'student');


    useEffect(() => {
        loadInterviews();
    }, []);

    return (
        <>  
          <NavMugicha>
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