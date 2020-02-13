import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { updateUser, deleteUser,readUser } from './apiAdmin';
import { getStudents, getMyInterviews, getFavStudents,getGroupInterviewList  } from '../core/apiCore';
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
           <AddRec student={text} userIdFromTable={props.match.params.userId} />
           </div>
         },
         {
           Header: 'Liked',
           accessor: (text, i) =>
           <div>
           {text.favorites.map((c,i) =>
             <div>
             {c == props.match.params.userId ? <span class=" badge badge-warning">●</span> : ""}
             </div>
           )}
           </div>
         },
         {
           Header: '面接',
           accessor: (text, i) =>
           <div>
             <AddInterview student={text} userIdFromTable={props.match.params.userId} />
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
                  {favStudentsCard()}
                  {interviewCard()}
      </Grid.Row>
      <Grid.Row>
    <Card>
    <Table columns={columns} data={data} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows}/>
    </Card>
      </Grid.Row>
      </Page.Content>
    </SiteWrapper>
    );
};

export default AdminUser;
