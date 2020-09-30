import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getGroupedHoldings } from './apiRecommend';
import { Link } from 'react-router-dom';
import { readUser, recordRecOne, recordPush } from '../admin/apiAdmin';
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const AllHoldings = ({ match }) => {
  const [groupedHoldings, setGroupedHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darwin_uid, darwin_myTk } = isAuthenticates();


  const loadGroupedHoldings = () => {
    getGroupedHoldings(darwin_uid, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setGroupedHoldings(data);
              setLoading(false)
          }
      });
  };

  const [user1, setUser1] = useState({});


  const loadSingleUser = () => {
    readUser(match.params.userId, darwin_myTk).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUser1(data);
        setLoading(false)
      }
    });
  };


  useEffect(() => {
    loadGroupedHoldings();
  }, []);



  return (
    <SiteWrapper>
      <div class="loading" style={{ display: loading ? "" : "none" }}>
        <div class="loaderSpin"></div>
      </div>
      <Container>

        <ol className="breadcrumb" aria-label="breadcrumbs" style={{ background: "transparent" }}>
          <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
          <li className="breadcrumb-item"><a className="link" href="/admin/users">All Users</a></li>
          <li className="breadcrumb-item"><a className="link" href={`/admin/profile/${user1._id}`}>{user1.name} </a></li>
          <li className="breadcrumb-item active" aria-current="page">{user1.name}</li>
        </ol>



        <div class="list-list" style={{ padding: "0" }}>
          <div className="card-header" style={{ justifyContent: "space-between" }}>
            <h3 className="mb-0">{user1.name} 予約リスト  </h3>
          </div>
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
                </thead> <tbody>{groupedHoldings.map((gHolding,i) => 
           <tr>
               <td>
               <Link to={`/admin/profile/${gHolding.userId}`}>   {gHolding.name}</Link> 
                 </td>
                <td>
               {gHolding.students.map((student, i) =>  <>
              {student.commonToBoth.includes(gHolding.userId) ?  <Link to={`/student/${student._id}`} > {student.studentid} </Link> : 
              <Link to={`/student/${student._id}`} style={{color: "red"}}> {student.studentid} </Link> }</>)}
                </td>
                <td>
                  {gHolding.count}
                </td>
         </tr>)}</tbody>
        </table>    
        </div></div>


      </Container>
    </SiteWrapper>
  );
};

export default AllHoldings;
