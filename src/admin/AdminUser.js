import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { Link } from 'react-router-dom';
import { deleteUser,readUser } from './apiAdmin';
import { getStudents, getFavStudents   } from '../core/apiCore';
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



const AdminUser = props => {
    const [students, setStudents] = useState([]);
    const data = students

    const [user1, setUser1] = useState({});
    const [error, setError] = useState(false);

    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const [ favStudents, setFavStudents ] =  useState([]);

    const loadSingleUser = (darwin_uid) => {
        readUser(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setUser1(data);
                console.log(data)
            }
        });
    };


    const loadFavStudents = userId => {
        getFavStudents(darwin_uid, darwin_myTk).then(data => {
            setFavStudents(data);
        });
    };

    const loadStudents = () => {
        getStudents(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStudents(data);
                setLoading(false);
            }
        });
    };


    useEffect(() => {
        loadSingleUser(props.match.params.userId);
    }, []);

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        loadFavStudents(props.match.params.userId);
    }, []);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  


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
           <AddRec student={text} userIdFromTable={props.match.params.userId} />
           </div>
         },
         {
          Header: '推薦2', 
          Filter: "",
          accessor: (text, i) =>
          <div>
          <AddPush student={text} userIdFromTable={props.match.params.userId} />
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
             <AddInterview student={text} userIdFromTable={props.match.params.userId}  />
           </div>
         },

         {
          Header: '面接status',
          Filter: "",
          accessor: (text, i) =>
          <div>
             {text.interviews.map((c,i) =>
             <div>
             {c.company == props.match.params.userId ? <span>{c.status} </span>: ""} 
             </div>
           )}
          </div>
        },


        {
          Header: 'Hide',
          Filter: "",
          accessor: (text, i) =>
          <div>
          <AddHide student={text} userIdFromTable={props.match.params.userId} />
          </div>
        },
    ],
      []
    );

    const destroy = userId => {
        deleteUser(userId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

            }
        });
    };

    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(true)

    const selectedRowKeys = Object.values(selectedRows);

    const interviewCard= interviewstudents => {
      return (
      <div className="card">
        {console.log(interviewstudents)}
    </div>)
    }

    const favStudentsCard = () => (
    <div className="card">
        <div className="card-header"> <h3 className="card-title"> Fav </h3></div>
                  <div className="card-body ">
                  <div className="row mb-n3">
                  {favStudents.map((c, i) =>
                  <div className="col-6 row row-sm mb-3 align-items-center">
          <div className="col text-truncate">
          <Link className="text-body d-block text-truncate" to={`/student/${c._id}`}> {c.studentid}</Link>
            <small className="d-block text-muted text-truncate mt-n1">{c.name}</small>
          </div>
        </div>)}
        </div>
      </div>
  </div>
)
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
                        <b>Role: </b> {user1.role === 1 ? "Admin" : "User"}<br/>
                         <b>営業担当: </b>{user1.salesrep }<br/>
                         <b>フェーズ: </b>{user1.round} <br/>
                         <b>フェーズメモ: </b>{user1.phase} <br/>
                         <b>Special Plan: </b>{user1.specialPlan === true ? "True": "False"}<br/>
                         <b>LoginCount: </b>{user1.login_count}<br/>
                         
                      </p> <a href={`/admin/user/update/${user1._id}`} >Update</a>
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
