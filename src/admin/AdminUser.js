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
    const [students, setStudents] = useState([]);
    const data = students

    const [user1, setUser1] = useState({});
    const [error, setError] = useState(false);

    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const loadSingleUser = () => {
        readUser(match.params.userId, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setUser1(data);
               //  console.log(data)
            }
        });
    };


    const loadFavStudents = () => {
        getFavStudents(match.params.userId, darwin_myTk).then(data => {
            setItems(data);
            // console.log(data)
        });
    };

    const loadStudents = () => {
        getStudents(match.params.userId, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStudents(data);
                setLoading(false);
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

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        loadFavStudents();
    }, []);


    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [items, setItems] = useState([]);


    const columns = React.useMemo(
     () => [
       // Let's make a column for selection

       {
             Header: 'StudentID',
             accessor: "studentid",
             id: "studentid"
          
           },
       {
             Header: 'Name',
             accessor: (text, i) => 
             <Link to={`/student/${text._id}`} target="_blank">{text.name} </Link>,
             id: "name"
           },
           {
                 Header: 'Status',
                 accessor: 'status',
                 id: 'status',
                 Filter: SelectColumnFilter,
               },
           {
             Header: '面接社数',
             Filter: "",
             accessor: (text, i) =>
             <div>　
             {text.interviews.length}
             </div>
           },
         {
           Header: '推薦', 
           Filter: "",
           accessor: (text, i) =>
           <div>
           <AddRec student={text} userIdFromTable={match.params.userId} />
           </div>
         },
         {
          Header: '推薦2', 
          Filter: "",
          accessor: (text, i) =>
          <div>
          <AddPush student={text} userIdFromTable={match.params.userId} />
          </div>
        },
         {
          Header: 'Faved',
          Filter: "",
          accessor: (text, i) =>
          <div> {text.favUsers.length == null? "" : 
          <div> {text.favUsers.map((t, i) => <span className="badge bg-blue">{t.name}</span>)}</div> }
        </div> 
        },
         {
           Header: '面接',
           Filter: "",
           accessor: (text, i) =>
           <div>
             <AddInterview student={text} userIdFromTable={match.params.userId}  />
           </div>
         },

         {
          Header: '面接status',
          Filter: "",
          accessor: (text, i) =>
          <div>
             {text.interviews.map((c,i) =>
             <div>
             {c.company == match.params.userId ? <span>{c.status} </span>: ""} 
             </div>
           )}
          </div>
        },


        {
          Header: 'Hide',
          Filter: "",
          accessor: (text, i) =>
          <div>
          <AddHide student={text} userIdFromTable={match.params.userId} />
          </div>
        },
    ],
      []
    );

  
   
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
                      <h2 className="mb-3">{user1.name}</h2>
                      <p className="mb-4">
                        <b>Email: </b> {user1.email}<br/>
                        <b>Role: </b> {user1.role === 1 ? "Admin" : user1.role === 2 ? "Unregistered User (期限切れた）" : user1.role === 0 ? "参加企業" : user1.role ===3 ? "閲覧企業" : "Mentor"}<br/>
                         <b>営業担当: </b>{user1.salesrep }<br/>
                         <b>フェーズ: </b>{user1.round} <br/>
                         <b>フェーズメモ: </b>{user1.phase} <br/>
                         <b>特別プラン: </b>{user1.specialPlan === true ? "あり": "なし"}<br/>
                         <b>LoginCount: </b>{user1.login_count}<br/>
                         <b>Zoom Url: </b>{user1.zoomUrl}<br/>
                         <hr /> 
                         <b> Tags: </b> {user1.tags}<br/>
                         <hr/>
                      </p> 
                      <p><a href={`/admin/user/update/${user1._id}`} className="likeBtn fullWidth">Update</a></p>
                 
                      <button type="button" className="unlikeBtn resumeGradient fullWidth" 
                      onClick={() => { if (window.confirm('Are you sure you wish to submit?'))  buy()  } }
                    >
                          ASIA to JAPANに申請
                      </button>
                    </div>
                  
                  </div>

                  <div className="card">
                    <div className="card-body ">
                      <p>
                        <b>事業内容: </b> {user1.descriptionSix!== null ? "...": ""}<br/>
                        <b>選考ステップ: </b> {user1.descriptionOne !== null ? "...": ""} <br/>
                         <b>２次面接内容 : </b>{user1.descriptionTwo !== null ? "...": ""} <br/>
                         <b>フェーズ: </b>{user1.descriptionThree !== null ? "...": ""} <br/>
                         <b>最終面接内容: </b>{user1.descriptionFour !== null ? "...": ""} <br/>
                         <b>参考: </b>{user1.descriptionFive !== null ? "...": ""} <br/></p>
                         <Button variant="primary" onClick={handleShow}>
                            View More
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                           
                          </Modal.Header>
                          <Modal.Body style={{whiteSpace: "pre-wrap"}}> 
                        <b>事業内容: </b> {user1.descriptionSix}<br/><br/>
                        <b>選考ステップ: </b> {user1.descriptionOne} <br/><br/>
                         <b>２次面接内容 : </b>{user1.descriptionTwo} <br/><br/>
                         <b>フェーズ: </b>{user1.descriptionThree} <br/><br/>
                         <b>最終面接内容: </b>{user1.descriptionFour} <br/><br/>
                         <b>参考: </b>{user1.descriptionFive} <br/><br/>
                       </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                    </div>
                  </div>
                  </Grid.Col>
     
      <Grid.Col width={12} lg={9} sm={12}>
    <Table columns={columns} data={data} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows}/>
    </Grid.Col>
      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
    );
};

export default AdminUser;
