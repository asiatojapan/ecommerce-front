import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { updateUser, deleteUser,readUser  } from './apiAdmin';
import { getStudents } from '../core/apiCore';
import LikedStudents from "../user/LikedStudents";
import AddRec from "./AddRec";
import AddInterview from "./AddInterview";
import { Form, Select, Input, Button, DatePicker, Descriptions, Badge, Divider } from 'antd';
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
           <AddRec student={text} userIdFromTable={props.match.params.userId}/>
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
           <AddInterview student={text} userIdFromTable={props.match.params.userId}/>
           </div>
         },
    ],
      []
    );

    useEffect(() => {
        loadStudents();
        const userId = props.match.params.userId;
        loadSingleUser(userId);
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

    const userList = () => (

      <Descriptions bordered size="small">
             <Descriptions.Item label="User ID" span={3}>{user1._id}</Descriptions.Item>
             <Descriptions.Item label="Email" span={3}>{user1.email}</Descriptions.Item>
        </Descriptions>
    )

    return (
      <AdminMenu>
      <main class="cf mw9 tc center">
      <header class="bg-near-white sans-serif pa3">
    <div class="center pa1 pt2-ns ph1-l">
      <h4 class="f2 f2-m dark-blue">
        {user1.name}
      </h4>
      <h5 className="dark-blue ">{user1.email}, {user1.role === 1 ? "Admin" : "User"}, {user1.salesrep } <br class="dn db-ns"/>
      {user1.round}{user1.phase}</h5>
    </div>
    <hr class="mw3 bb bw1 b--black-10"/>
    <span><Link to={`/admin/student/update/${user1._id}`}>Update</Link> </span>|
    <span><a onClick={() => destroy(user1._id)} type="danger">
       Delete
   </a></span>
  </header>
      </main>
      <main class="pa3 pa5-ns">

      <Table columns={columns} data={data} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows}/>
      </main>
      </AdminMenu>
    );
};

export default AdminUser;
