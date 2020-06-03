import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { getMyCurrentRecommends, getMyCurrentPushes } from './apiRecommend';
import { Link } from 'react-router-dom';
import { readUser } from '../admin/apiAdmin';
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const AllRecommends = ({match}) => {
  const [recommends, setRecommends] = useState([]);
  const [pushes, setPushes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darwin_uid, darwin_myTk } = isAuthenticates();

  const loadRecommends = () => {
      getMyCurrentRecommends(match.params.userId, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setRecommends(data);
              setLoading(false)
          }
      });
  };


  const loadPushes = () => {
    getMyCurrentPushes(match.params.userId, darwin_myTk).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setPushes(data);
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

  const reformattedData = (data) => {
     return( <> 
      ■ID：{data.studentid}<br/>
      {data.comments}<br/>
      ■日本語力：{data.japanese}　　 ■英語力：{data.english}　　■性別：{data.gender}　　■国籍・地域：{data.country}　<br/>
      ■大学：{data.university}<br/>
      ■学歴：{data.education_bg}　　■学部：{data.faculty}<br/>
      ■卒業：{data.grad_year}/{data.grad_month}
    </>)
  }

  useEffect(() => {
    loadSingleUser(match.params.userId)
    loadRecommends();
    loadPushes();
  }, []);

  const headers = [
    { label: 'User', key: 'data' },
  ];

   
    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>

      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item"><a className="link" href="/admin/users">All Users</a></li>
        <li className="breadcrumb-item"><a className="link" href={`/admin/profile/${user1._id}`}>{user1.name} </a></li>
         <li className="breadcrumb-item active" aria-current="page">{user1.name}</li>
      </ol>   

      <div className="list-list">
            <div style={{display: "flex", justifyContent: "space-between", alignItems:"center"}} >
               <div style={{fontSize: "24px"}}>{user1.name} 推薦リスト ({recommends.length}) </div>
           </div>
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
                  {reformattedData(recommend)}
                
                </td>
         </tr>)}</tbody>
        </table>    
        </div>
        </div>

        <div className="list-list">
            <div style={{display: "flex", justifyContent: "space-between", alignItems:"center"}} >
               <div style={{fontSize: "24px"}}>{user1.name} 推薦2 リスト ({recommends.length}) </div>
           </div>
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
                </thead> <tbody>{pushes.map((push,i) => 
           <tr>
               <td>
               <Link to={`/admin/profile/${push.user[0]._id}`}>{push.user[0].name}</Link> 
                </td>
                <td>
                <Link to={`/student/${push._id}`}>  {push.studentid} </Link> 
                </td>
                <td>
                  {reformattedData(push)}
                
                </td>
         </tr>)}</tbody>
        </table>    
        </div>
        </div>
      </Container>
      </SiteWrapper>
    );
};

export default AllRecommends;
