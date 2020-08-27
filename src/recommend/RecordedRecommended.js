import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getRecordedRecommends, deleteRecommend } from './apiRecommend';
import { Link } from 'react-router-dom';
import moment from "moment";
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const RecordedRecommended = (config = null) => {
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

const [sortConfig, setSortConfig] = React.useState(config);

const sortedItems = React.useMemo(() => {
  let sortableItems = [...recommends];
  if (sortConfig !== null) {
    sortableItems.sort((a, b) => {
    // console.log(a[sortConfig.key])
      //console.log(sortConfig.key)
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }
  return sortableItems;
}, [recommends, sortConfig]);

const requestSort = key => {
  let direction = 'ascending';
  if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  //console.log(key)
  setSortConfig({ key, direction });
}

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
                    <th>   
                    <button
        
              onClick={() => requestSort('eventPeriod')}
            >
              Recommended
            </button>
            
                   </th>
                    <th>   <button
           
              onClick={() => requestSort('loginDate')}
            >
              Last login
            </button>
            </th>
                    <th>User</th>
                    <th>担当</th>
                    <th>Type</th>
                    <th>学生</th>
                    <th>Date</th>
                    <th>Delete</th>
                    </tr>
                </thead> <tbody>
                  {sortedItems.map((recommend,i) => 
           <tr>
               <td>
               {moment(recommend.eventPeriod).format("YY/MM/DD")}
                </td>

                <td>
               {moment(recommend.users.last_login_date).format("YY/MM/DD")}
                </td>
                <td>
                <Link to={`/admin/profile/${recommend.users._id}`}> {recommend.users.name} </Link>
                </td>
                <td><div style={{width: "50px"}}>
                {recommend.users.tantou}</div>
                </td>
                <td> {recommend.type} </td>
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
