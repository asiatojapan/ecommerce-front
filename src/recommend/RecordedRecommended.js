import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getRecordedRecommends, deleteRecommend } from './apiRecommend';
import { Link } from 'react-router-dom';
import moment from "moment";
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const RecordedRecommended = () => {
  const [recommends, setRecommends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darwin_uid, darwin_myTk } = isAuthenticates();

  const loadRecommends = () => {
    getRecordedRecommends(darwin_uid, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setRecommends(data);
              setLoading(false)
          }
      });
  };

  const destroy = recommendId => {
    setLoading(true)
    deleteRecommend(recommendId, darwin_uid, darwin_myTk).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
          setLoading(false)
          loadRecommends();
        }
    });
};


  useEffect(() => {
    loadRecommends();
  }, []);


    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>
        
      <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>Date Sent</th>
                    <th>Last Login Date</th>
                    <th>User</th>
                    <th>学生</th>
                    <th>Date Difference</th>
                    <th>Delete</th>
                    </tr>
                </thead> <tbody>{recommends.map((recommend,i) => 
           <tr>
               <td>
               {moment(recommend.eventPeriod).format("YY/MM/DD hh:mm")}
                </td>

                <td>
               {moment(recommend.users.last_login_date).format("YY/MM/DD")}
                </td>
                <td>
                <Link to={`/admin/profile/${recommend.users._id}`}> {recommend.users.name} </Link>
                </td>
                <td>
                {recommend.students.map((student, index)=> 
                 index ? ', ' + student.studentid : '' + student.studentid )}
                </td>
                <td>
                  
                {recommend.loginDiff > 6 ? <span style={{color: "red", fontWeight: 600}}>{recommend.loginDiff}</span>: <span>{recommend.loginDiff}</span>}
                </td>
                <td>
                <button class="likeBtn smaller" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(recommend._id) } } >
                Delete
              </button>
                </td>
         </tr>)}</tbody>
        </table>    
        </div>
      </Container>
      </SiteWrapper>
    );
};

export default RecordedRecommended;
