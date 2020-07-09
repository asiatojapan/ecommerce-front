import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getAllCurrentRecommends } from './apiRecommend';
import { Link } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
 
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const AllRecommends = () => {
  const [recommends, setRecommends] = useState([]);
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


  useEffect(() => {
    loadRecommends();
  }, []);

  const headers = [
    { label: 'User', key: 'user[0].name' },
    { label: 'Student ID', key: 'studentid' },
    { label: 'Name', key: 'name' },
  ];

   
    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>
      <div class="list-list">
          <div class="card-title">推薦　リスト</div>
          <CSVLink headers={headers} data={recommends}>CSV Download</CSVLink>
       </div>
            
      <div class="list-list">
      <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>User</th>
                    <th>推薦ID</th>
                    <th>推薦学生</th>
                    </tr>
                </thead> <tbody>{recommends.map((recommend,i) => 
           <tr>
               <td>
               <Link to={`/admin/profile/${recommend.user[0]._id}`}>{recommend.user[0].name}</Link> 
                </td>
                <td>
                <Link to={`/student/${recommend._id}`}>  {recommend.studentid} </Link> 
                </td>
                <td>
                ■ID：{recommend.studentid}<br/>
                {recommend.comments}<br/>
                ■日本語力：{recommend.japanese}　　 ■英語力：{recommend.english}　　■性別：{recommend.gender}　　■国籍・地域：{recommend.country}　<br/>
                ■大学：{recommend.university}<br/>
                ■学歴：{recommend.education_bg}　　■学部：{recommend.faculty}<br/>
                ■卒業：{recommend.grad_year}/{recommend.grad_month}
                ■IT スキル：{recommend.it_skills}
                </td>
         </tr>)}</tbody>
        </table>    
        </div></div>
      </Container>
      </SiteWrapper>
    );
};

export default AllRecommends;
