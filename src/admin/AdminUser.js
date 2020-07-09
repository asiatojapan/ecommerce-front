import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';
import { readUser, moveFavorites } from './apiAdmin';
import { createOrder } from '../core/apiCore';
import { getInterviewsByCompany  } from '../interview/apiInterview';
import SiteWrapper from '../templates/SiteWrapper'
import {
  Page,
  Grid,
} from "tabler-react";
import moment from "moment"

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


const AdminUser = ({ logout, session, match }: Props) => {
 

    const [interviews, setInterviews] = useState([]);
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

  const loadInterviews = () => {
    getInterviewsByCompany(match.params.userId, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
            setInterviews(data);
              setLoading(false)
            }
        });
    };

    const destroyFavorites = () => {
      setLoading(true);
      moveFavorites(match.params.userId, darwin_myTk).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setLoading(false); 
              window.location.reload(false);
          }
      });
  };


    const resultInNice = (result) => {
      if (result === "Nil") {
          return ""
      }
      else if (result === "合格") {
          return "●"
      }
      else if (result === "不合格") {
          return "X"
      }
      else if (result === "三角") {
          return "▲"
      }
      else if (result === "辞退") {
          return "辞退"
      }
      else if (result === "内定") {
          return "内定"
      }
      else {
          return ""
      }
  }

  useEffect(() => {
    loadSingleUser();
    loadInterviews();
    }, []);


    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([]);


  
   
    return (
      <SiteWrapper>
        <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
     
      <Page.Content>

      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item"><a className="link" href="/admin/users">All Users</a></li>
         <li className="breadcrumb-item active" aria-current="page">{user1.name} </li>
      </ol>   

      <div className="list-list">
            <div style={{display: "flex", justifyContent: "space-between", alignItems:"center"}} >
               <div style={{fontSize: "24px"}}>{user1.name} </div>
             <a className="unlikeBtn resumeGradient smaller" href={`/admin/user/update/${user1._id}`}>編集</a> 
           </div>
           {user1.email}
      </div>
      
      <Grid.Row>
      <Grid.Col width={12} lg={3} sm={12}>

      <div className="list-list" style={{padding: "0px"}}>
        <div className="card-header">
            <div className="card-title">Profile</div>
          </div>
          <div className="card-body">
        <table>
         <tbody>
        <tr>
        <td><span class="text-muted">Role</span></td>
        <td>{user1.role === 1 ? "Admin" : user1.role === 2 ? "Unregistered User (期限切れた）" : user1.role === 0 ? "参加企業" : user1.role ===3 ? "閲覧企業" : "Mentor"}</td>
        </tr>
        <tr>
        <td><span class="text-muted">フェーズ</span></td>
        <td>{user1.round} </td>
        </tr>

        <tr>
        <td><span class="text-muted">特別プラン</span></td>
        <td>{user1.specialPlan === true ? "あり": "なし"}</td>
        </tr>

        <tr>
        <td><span class="text-muted">Login Count</span></td>
        <td>{user1.login_count}</td>
        </tr>

        </tbody>
        </table>
        </div>
        </div>

        <div className="list-list" style={{padding: "0px"}}>
          <div className="card-body">
                <p> <a href={`/admin/matching/${user1._id}`} className="likeBtn smaller fullWidth">マッチング・面接</a></p>
                <p> <a href={`/admin/recommends/${user1._id}`} className="likeBtn smaller fullWidth">推薦 データ</a></p>
                <p> <a href={`/admin/history/${user1._id}`} className="likeBtn smaller fullWidth">検討リスト・面接履歴</a></p>
                <button className="likeBtn smaller fullWidth" 
                     onClick={() => { if (window.confirm('Are you sure you wish to remove all 検討リスト? ')) destroyFavorites()} } >
                  検討リスト削除
            </button>
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
       
    <div className="list-list" style={{padding: "0px"}}>
        <div className="card-header">
            <div className="card-title">タグ</div>
          </div>
          <div className="card-body" style={{padding: "0px"}}>
        <div className="table-responsive">
        <table className="table card-table table-striped">
         <tbody>
            <tr>
            <td><span class="text-muted">タグ</span></td>
            <td>{user1.tags ? user1.tags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.tags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">国籍</span></td>
            <td>{user1.countryTags ? user1.countryTags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.countryTags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">学歴</span></td>
            <td>{user1.educationBgTags ? user1.educationBgTags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.educationBgTags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

            <tr>
            <td><span class="text-muted">日本語</span></td>
            <td>{user1.japaneseTags ? user1.japaneseTags.map((tag, i) => 
                   <span className="list-inline-item" key={i}>{tag}{i != (user1.japaneseTags.length-1) ? ',' : ''}</span>
                  ) : null} 
            </td>
            </tr>

        </tbody>
        </table>
       </div>
       </div>
       </div>

       <div className="list-list" style={{padding: "0px"}}>
          <div className="card-header">
            <div className="card-title">面接</div>
          </div>
          <div className="card-body" style={{padding: "0px"}}>
              <div class="table-responsive-sm">
                  <table class="table card-table table-striped" style={{fontSize: "10px"}}>
                        <thead>
                            <tr>
                            <th>ID </th>
                            <th>名前</th>
                            <th>Status</th>
                            <th>Event</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead> 
                        
                        <tbody>{interviews.map((interview,i) => 
                        <tr> 
                          <td>
                              <Link to={`/student/${interview.student[0]._id}`}>{interview.student[0].studentid}</Link>
                             
                          </td>
                            <td>
                              {interview.student[0].name}
                            </td>
                          <td>
                              {interview.status}
                            </td>
                            <td>{ moment(interview.eventDay).format('YYYY/MM')} </td>
                                {interview.interviewItems.length === 0 ? 
                            <> 
                            <td></td><td></td>
                            <td></td><td></td>
                            </> :
                            <> 
                            {interview.interviewItems.length === 1 ?
                            <> 
                            {interview.interviewItems.map((item,i) => <>
                                <td> {item.phase} </td>
                                <td> {resultInNice(item.result)} </td> 
                                <td></td>
                                <td></td>
                                </>)} 
                            </> : 
                            <>
                              {interview.interviewItems.map((item,i) => <>
                                <td>  {item.phase} </td>
                                <td>  {resultInNice(item.result)} </td> </>)} 
                                </>}
                          </>}
                          <td>
                          <Link to={`/admin/interview/${interview._id}`}>Details</Link>
                          </td>
                        </tr>
                    )}
                
                </tbody>
                </table>    
                </div>
             </div>
        </div>

     <div className="list-list" style={{padding: "0", whiteSpace: "pre-line"}}>
     <div className="card-header">
            <div className="card-title">Additional Information</div>
          </div>
          <div className="card-body" style={{padding: "0px"}}>
        <div className="table-responsive">
        <table className="table card-table table-striped">
         <tbody>
           <tr>
            <td><span class="text-muted">Homepage</span></td>
            <td>{user1.homepageUrl}</td>
            </tr>

            <tr>
            <td><span class="text-muted">JD</span></td>
            <td>{user1.jdLink}</td>
            </tr>

            <tr>
            <td><span class="text-muted">事業内容</span></td>
            <td>{user1.descriptionSix}</td>
            </tr>

            <tr>
            <td><span class="text-muted">選考ステップ</span></td>
            <td>{user1.descriptionOne}</td>
            </tr>

            <tr>
            <td><span class="text-muted">２次面接内容</span></td>
            <td>{user1.descriptionTwo}</td>
            </tr>

            <tr>
            <td><span class="text-muted">フェーズ</span></td>
            <td>{user1.descriptionThree}</td>
            </tr>

            <tr>
            <td><span class="text-muted">最終面接内容</span></td>
            <td>{user1.descriptionFour}</td>
            </tr>

            <tr>
            <td><span class="text-muted">参考</span></td>
            <td>{user1.descriptionFive}</td>
            </tr>
          </tbody>
        </table>
       </div>     
        </div>                  
       </div>   

      </Grid.Col>
      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
    );
};

export default AdminUser;
