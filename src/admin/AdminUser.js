import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';
import { deleteUser,readUser } from './apiAdmin';
import { getStudents, getFavStudents, createOrder } from '../core/apiCore';
import AddRec from "./AddRec";
import AddPush from "./AddPush";
import AddHide from "./AddHide";
import AddInterview from "./AddInterview";
import SiteWrapper from '../templates/SiteWrapper'
import Modal from 'react-bootstrap/Modal';
import {
  Page,
  Grid,
} from "tabler-react";
import { Button } from 'antd';
import { Table } from "./ManageStudents";

import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
session
});

const mapDispatchToProps = dispatch => ({
logout: () => dispatch(logout())
});

interface RouterProps {
  match: any;
}

type Props = RouterProps;


function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}



const AdminUser = ({ logout, session, match }: Props) => {
 

    const [user1, setUser1] = useState({});
    const [error, setError] = useState(false);

    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const loadSingleUser = () => {
        readUser(match.params.userId, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setUser1(data);
                setLoading(false)
               //  console.log(data)
            }
        });
    };


    const buy = () => { 
      var d = new Date();
      const month = d.toLocaleString('default', { month: 'long' });
      var y = d.getFullYear() 
        const createOrderData = {
          students: items,
          transaction_id: y + month + " " + user1.name,
        };
        createOrder(match.params.userId, darwin_myTk, createOrderData).then(data => {
          if (data.error) {
            console.log(data.error);
            setError(true)
          } else {
            window.location.reload();
          }
      });
  };



  useEffect(() => {
    loadSingleUser();
    }, []);


    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false);

  
    const [items, setItems] = useState([]);


  
   
    return (
      <SiteWrapper>
        <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
     
      <Page.Content>
      <Grid.Row>
      <Grid.Col width={12} lg={3} sm={12}>
      <div className="card">
                    <div className="card-body ">
                      <h2 className="mb-3">{user1.name} 
                     
                       </h2> 
                      <p className="mb-4">
                        <b>Email: </b> {user1.email}<br/>
                        <b>Role: </b> {user1.role === 1 ? "Admin" : user1.role === 2 ? "Unregistered User (期限切れた）" : user1.role === 0 ? "参加企業" : user1.role ===3 ? "閲覧企業" : "Mentor"}<br/>
                         <b>営業担当: </b>{user1.salesrep}<br/>
                         <b>フェーズ: </b>{user1.round} <br/>
                         <b>特別プラン: </b>{user1.specialPlan === true ? "あり": "なし"}<br/>
                         <b>LoginCount: </b>{user1.login_count}<br/>
                         <b>Homepage: </b>{user1.homepageUrl} <br/>
                         <b>Zoom Url: </b>{user1.zoomUrl}<br/>
                       
                      </p> 
                         <p>　<a href={`/admin/user/update/${user1._id}`} className="likeBtn smaller fullWidth"> Update Profile Details </a></p>
                        <p> <a href={`/admin/matching/${user1._id}`} className="likeBtn smaller fullWidth"> Matching 推薦・面接　</a></p>
                        <p> <a href={`/admin/myrecommend/${user1._id}`} className="likeBtn smaller fullWidth"> History </a></p>
                   
                      <span style={{fontSize: "11px"}}> * Click only if the company is unable to 申請 * </span>
                      <button type="button" className="unlikeBtn resumeGradient smaller fullWidth" 
                      onClick={() => { if (window.confirm('Are you sure you wish to submit?'))  buy()  } }
                           >
                          ASIA to JAPANに申請
                      </button>
                    </div>
                  
                  </div>

                  </Grid.Col>
     
                  <Grid.Col width={12} lg={9} sm={12}>

                   <div className="card">
                
                    <div className="card-body" style={{whiteSpace: "pre-line"}}>

                    <p>
                  <b>タグ</b>: {user1.tags ? user1.tags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.tags.length-1) ? ',' : ''}</span>
                  ) : null} 
                  
                </p>

                <p>
                 <b>国籍</b> : {user1.countryTags ? user1.countryTags.map((tag, i) => 
                   <span className="list-inline-item">{tag}{i != (user1.countryTags.length-1) ? ',' : ''}</span>
                  ) : null} 
                </p>

                <p>
                 <b>学歴</b> : {user1.countryTags ? user1.educationBgTags.map((tag, i) => 
                   <span className="list-inline-item">{tag}{i != (user1.educationBgTags.length-1) ? ',' : ''}</span>
                  ) : null} 
                </p>

                <p>
                 <b> 日本語</b> : {user1.japaneseTags ? user1.japaneseTags.map((tag, i) => 
                   <span className="list-inline-item">{tag}{i != (user1.japaneseTags.length-1) ? ',' : ''}</span>
                  ) : null} 
                </p>
                
                        <hr/>
                        <b>JD: </b> {user1.jdLink}<br/><br/>
                       <b>事業内容: </b> {user1.descriptionSix}<br/><br/>
                        <b>選考ステップ: </b> {user1.descriptionOne} <br/><br/>
                         <b>２次面接内容 : </b>{user1.descriptionTwo} <br/><br/>
                         <b>フェーズ: </b>{user1.descriptionThree} <br/><br/>
                         <b>最終面接内容: </b>{user1.descriptionFour} <br/><br/>
                         <b>参考: </b>{user1.descriptionFive} <br/><br/>
                         </div>
                         </div>
                    
    </Grid.Col>
      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
    );
};

export default AdminUser;
