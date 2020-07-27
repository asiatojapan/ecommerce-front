import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getAllCurrentRecommends, getGroupedRecommends } from './apiRecommend';
import { Link } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
 
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const AllRecommends = () => {
  const [recommends, setRecommends] = useState([]);
  const [groupedRecommends, setGroupedRecommends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darwin_uid, darwin_myTk } = isAuthenticates();

  const loadRecommends = () => {
    getAllCurrentRecommends(darwin_uid, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setRecommends(data);
              setLoading(false)
          }
      });
  };

  const loadGroupedRecommends = () => {
    getGroupedRecommends(darwin_uid, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setGroupedRecommends(data);
              setLoading(false)
          }
      });
  };


  useEffect(() => {
    loadRecommends();
    loadGroupedRecommends();
  }, []);

   
    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>
      <div class="list-list">
          <div class="card-title">推薦　リスト</div>
         </div>

         <div class="list-list">
      <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>User</th>
                    <th>推薦ID</th>
                    <th></th>
                    </tr>
                </thead> <tbody>{groupedRecommends.map((gRecommend,i) => 
           <tr>
               <td>
               <Link to={`/admin/profile/${gRecommend.userId}`}>   {gRecommend.name}</Link> 
                 </td>
                <td>
               {gRecommend.students.map((student, i) => 
              <Link to={`/student/${student._id}`}> {student.studentid} </Link>)}
                </td>
                <td>
                  {gRecommend.count}
                </td>
         </tr>)}</tbody>
        </table>    
        </div></div>
            
      <div class="list-list">
      <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>User</th>
                    <th>推薦ID</th>
                    </tr>
                </thead> <tbody>{recommends.map((recommend,i) => 
           <tr>
               <td>
               <Link to={`/admin/profile/${recommend.user[0]._id}`}>   {recommend.user[0].name}</Link> 
                 </td>
                <td>
                <Link to={`/student/${recommend._id}`}>  {recommend.studentid} </Link> {recommend.name}
                </td>
         </tr>)}</tbody>
        </table>    
        </div></div>
      </Container>
      </SiteWrapper>
    );
};

export default AllRecommends;
