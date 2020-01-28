import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { updateUser, deleteUser,readUser } from './apiAdmin';
import { getStudents, getMyInterviews  } from '../core/apiCore';
import AddRec from "./AddRec";
import AddInterview from "./AddInterview";
import SiteWrapper from '../templates/SiteWrapper'
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
import { Form, Select, Input, Button, DatePicker, Descriptions,Divider } from 'antd';
import { PageHeader } from 'antd';
import { Table } from "./ManageStudents";
const { Option } = Select;
const { TextArea } = Input;



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

    const loadStudents = () => {
        getStudents().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStudents(data);
            }
        });
    };
    const data = students

    const [user1, setUser1] = useState({});
    const [error, setError] = useState(false);

    const { user, token } = isAuthenticated();

    const [ likedstudents, setLikedstudents ] =  useState([]);

    const [ interviewstudents, setInterviewstudents ] =  useState([]);

    const loadSingleUser = userId => {
        readUser(userId).then(data => {
          setLikedstudents(data.liked_students);
            if (data.error) {
                setError(data.error);
            } else {
                setUser1(data);
            }
        });
    };

    const loadMyInteviews = userId => {
        getMyInterviews(userId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setInterviewstudents(data);
            }
        });
    };

        function handleUpdate(userId) {
            loadMyInteviews(userId);
        }

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
               },
           {
             Header: '面接社数',
             accessor: (text, i) =>
             <div>　
             {text.interviews.length}
             </div>
           },
         {
           Header: 'おすすめ',
           accessor: (text, i) =>
           <div>
           <AddRec student={text} userIdFromTable={props.match.params.userId} handleUpdate={handleUpdate(props.match.params.userId)}/>
           </div>
         },
         {
           Header: 'Liked',
           accessor: (text, i) =>
           <div>
           {text.liked_users.map((c,i) =>
             <div>
             {c._id == props.match.params.userId ? "Yes" : ""}
             </div>
           )}
           </div>
         },
         {
           Header: '面接',
           accessor: (text, i) =>
           <div>
           <AddInterview student={text} userIdFromTable={props.match.params.userId} handleUpdate={handleUpdate(props.match.params.userId)}/>
           </div>
         },
    ],
      []
    );

    useEffect(() => {
        loadStudents();
        const userId = props.match.params.userId;
        loadSingleUser(userId);
        loadMyInteviews(userId);
    }, [props]);

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


    const interviewCard = () => (
      <div class="card">
          <div class="card-header"> <h3 class="card-title">  面接　({interviewstudents.length === 0 ? "0": interviewstudents.length}) </h3></div>
                    <div class="card-body ">
                    <div class="row mb-n3">
                    {interviewstudents.map((c, i) =>
                    <div class="col-6 row row-sm mb-3 align-items-center">
                    <div class="col text-truncate">
                    <Link className="text-body d-block text-truncate" to={`/student/${c.student._id}`}> {c.student.studentid}</Link>
                    <small class="d-block text-muted text-truncate mt-n1">{c.student.name}</small>
                    </div>
          </div>)}
          </div>
        </div>
    </div>
    )

    const likedstudentsCard = () => (
    <div class="card">
        <div class="card-header"> <h3 class="card-title"> Liked ({likedstudents.length === 0 ? "0": likedstudents.length}) </h3></div>
                  <div class="card-body ">
                  <div class="row mb-n3">
                  {likedstudents.map((c, i) =>
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
      <Grid.Col lg={4} >
      <div class="card">
                    <div class="card-body ">
                      <h2 class="mb-3">{user1.name}</h2>
                      <p class="mb-4">
                        <b>Email: </b> {user1.email}<br/>
                        <b>Role: </b> {user1.role === 1 ? "Admin" : "User"}<br/>
                         <b>営業担当: </b>{user1.salesrep }<br/>
                         <b>フェーズ: </b>{user1.round} <br/>
                         <b>フェーズメモ: </b>{user1.phase}
                      </p>
                    </div>
                  </div>
                  {likedstudentsCard()}
                  {interviewCard()}
  </Grid.Col>
  <Grid.Col lg={8}>
  <Card>
    <Table columns={columns} data={data} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows}/>
    </Card>
    </Grid.Col>

      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
    );
};

export default AdminUser;
