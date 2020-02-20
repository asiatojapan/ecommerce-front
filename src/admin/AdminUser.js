import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { updateUser, deleteUser,readUser } from './apiAdmin';
import { getStudents, getMyInterviews, getFavStudents,getGroupInterviewList  } from '../core/apiCore';
import AddRec from "./AddRec";
import AddInterview from "./AddInterview";
import SiteWrapper from '../templates/SiteWrapper'
import Modal from 'react-bootstrap/Modal';
import {
  Page,
  Dropdown,
  Icon,
  Grid,
  Card,
  Text,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import { Button } from 'antd';
import { Table } from "./ManageStudents";
import { FaDove } from 'react-icons/fa';



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

    const { user, token } = isAuthenticated();

    const [ favStudents, setFavStudents ] =  useState([]);

    const [run, setRun] = useState(false);

    const [ interviewstudents, setInterviewstudents ] =  useState([]);

    const loadSingleUser = (userId) => {
        readUser(userId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setUser1(data);
            }
        });
    };


    const loadFavStudents = userId => {
        getFavStudents(userId).then(data => {
            setFavStudents(data);
        });
    };

    const loadStudents = () => {
        getStudents().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStudents(data);
            }
        });
    };

    function handleUpdate(userId) {
        loadFavStudents(userId);
    }

    useEffect(() => {
        loadSingleUser(props.match.params.userId);
    }, []);

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        loadFavStudents(props.match.params.userId);
    }, []);

    useEffect(() => {
      setInterviewstudents(getGroupInterviewList(props.match.params.userId));
    }, [run]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  


    const columns = React.useMemo(
     () => [
       // Let's make a column for selection

       {
             Header: 'StudentID',
             accessor: 'studentid',
             id: 'sid',
             sortType: 'basic'
           },
       {
             Header: 'Name',
             accessor: 'name',
             id: 'name',
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
           Header: 'おすすめ', 
           Filter: "",
           accessor: (text, i) =>
           <div>
           <AddRec student={text} userIdFromTable={props.match.params.userId} />
           </div>
         },
         {
           Header: 'Liked',
           Filter: "",
           accessor: (text, i) =>
           <div>
           {text.favorites.map((c,i) =>
             <div>
             {c == props.match.params.userId ? "●" : ""}
             </div>
           )}
           </div>
         },
         {
           Header: '面接',
           Filter: "",
           accessor: (text, i) =>
           <div>
             <AddInterview student={text} userIdFromTable={props.match.params.userId} run={run} />
           </div>
         },

         {
          Header: '面接status',
          Filter: "",
          accessor: (text, i) =>
          <div>
             {text.interviews.map((c,i) =>
             <div>
              {c.status}
             </div>
           )}
          </div>
        },
    ],
      []
    );

    const destroy = userId => {
        deleteUser(userId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

            }
        });
    };

    const [selectedRows, setSelectedRows] = useState([]);

    const selectedRowKeys = Object.values(selectedRows);

    const interviewCard= interviewstudents => {
      return (
      <div class="card">
        {console.log(interviewstudents)}
    </div>)
    }

    const favStudentsCard = () => (
    <div class="card">
        <div class="card-header"> <h3 class="card-title"> Fav </h3></div>
                  <div class="card-body ">
                  <div class="row mb-n3">
                  {favStudents.map((c, i) =>
                  <div class="col-6 row row-sm mb-3 align-items-center">
          <div class="col text-truncate">
          <Link className="text-body d-block text-truncate" to={`/student/${c._id}`}> {c.studentid}</Link>
            <small class="d-block text-muted text-truncate mt-n1">{c.name}</small>
          </div>
        </div>)}
        </div>
      </div>
  </div>
)
    return (
      <SiteWrapper>
      <Page.Content>
      <Grid.Row>
      <Grid.Col width={12} lg={3} sm={12}>
      <div class="card">
                    <div class="card-body ">
                      <h2 class="mb-3">{user1.name}</h2>
                      <p class="mb-4">
                        <b>Email: </b> {user1.email}<br/>
                        <b>Role: </b> {user1.role === 1 ? "Admin" : "User"}<br/>
                         <b>営業担当: </b>{user1.salesrep }<br/>
                         <b>フェーズ: </b>{user1.round} <br/>
                         <b>フェーズメモ: </b>{user1.phase}
                      </p> <Button href={`/admin/user/update/${user1._id}`} >Update</Button>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-body ">
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
                            <Button variant="primary" onClick={handleClose}>
                              Save Changes
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
