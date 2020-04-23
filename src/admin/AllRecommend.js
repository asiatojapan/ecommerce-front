import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getAllRecommends } from './apiAdmin';
import { Link } from 'react-router-dom';

import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const AllRecommend = () => {
  const [recommends, setRecommends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darwin_uid, darwin_myTk } = isAuthenticates();

  const loadRecommends = () => {
      getAllRecommends(darwin_uid, darwin_myTk).then(data => {
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
                {recommend.type === "推薦1" ? <span className="badge badge-danger"> {recommend.type} </span> : <> {recommend.type === "推薦2" ?  <span className="badge bg-yellow"> {recommend.type} </span> :  <span className="badge bg-blue"> {recommend.type} </span> }</>}
                </td>
                <td>
                {recommend.user.name}
                </td>
                <td>
                {recommend.students.map((student, i)=> <> <Link to={`/mugicha/company/${student._id}`}>  {student.studentid} </Link>  </>)}
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

export default AllRecommend;
