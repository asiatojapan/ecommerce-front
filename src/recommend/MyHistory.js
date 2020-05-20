import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getMyRecommendHistory } from './apiRecommend';
import { Link } from 'react-router-dom';

import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const MyHistory = ({match}) => {
  const [recommends, setRecommends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darwin_uid, darwin_myTk } = isAuthenticates();

  const loadRecommends = () => {
    getMyRecommendHistory(match.params.userId, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setRecommends(data);
              setLoading(false)
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

      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item"><a className="link" href="/admin/users">All Users</a></li>
        <li className="breadcrumb-item"><a className="link" href={`/admin/profile/${match.params.userId}`}> Profile </a></li>
      </ol>   
        
      <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>Period </th>
                    <th>Type</th>
                    <th>User</th>
                    <th>学生</th>
                    <th>Count</th>
                    </tr>
                </thead> <tbody>{recommends.map((recommend,i) => 
           <tr>
               <td>
                  {recommend.period}
                </td>
                <td>
                  {recommend.type}
                </td>
                <td>
                {recommend.user.name}
                </td>
                <td>
                {recommend.interviews.map((interview, i)=> <> <Link to={`/mugicha/company/${interview._id}`} className="badge badge-danger">  {interview.student} </Link>  </>)}
                {recommend.students.map((student, i)=> <> <Link to={`/mugicha/company/${student._id}`} className="badge badge-danger">  {student.studentid} </Link>  </>)}
                </td>
                <td>
                {recommend.students.length}
                </td>
         </tr>)}</tbody>
        </table>    
        </div>
      </Container>
      </SiteWrapper>
    );
};

export default MyHistory;
