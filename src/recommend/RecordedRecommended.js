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
                    <th>Period </th>
                    <th>Type</th>
                    <th>User</th>
                    <th>学生</th>
                    <th>Count</th>
                    <th>Delete</th>
                    </tr>
                </thead> <tbody>{recommends.map((recommend,i) => 
           <tr>
               <td>
               {moment(recommend.eventPeriod).format("MM/DD")}
                </td>
                <td>
                {recommend.type}
                </td>
                <td>
                {recommend.users[0].name}
                </td>
                <td>
                {recommend.students.map((student, index)=> 
                 index ? ', ' + student.studentid : '' + student.studentid )}
                </td>
                <td>
                {recommend.students.length}
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
