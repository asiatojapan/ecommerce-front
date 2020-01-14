import React, { useState, useEffect } from 'react';
import  AdminMenu from "../user/AdminMenu";
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { updateUser, deleteUser,readUser  } from './apiAdmin';
import { getStudents } from '../core/apiCore';
import LikedStudents from "../user/LikedStudents";
import AddRec from "./AddRec";
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

    const columns =
    [
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
          Header: 'Age',
          accessor: (text, i) =>
          <div>
          <AddRec student={text} userIdFromTable={props.match.params.userId}/>
          </div>
        },
    ];

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

    const userList = () => (

      <Descriptions bordered size="small">
             <Descriptions.Item label="User ID" span={3}>{user1._id}</Descriptions.Item>
             <Descriptions.Item label="Email" span={3}>{user1.email}</Descriptions.Item>
        </Descriptions>
    )

    return (
      <AdminMenu>
      <PageHeader
          style={{
            borderBottom: '2px solid rgb(235, 237, 240)',
            marginBottom: 20,
          }} onBack={() => window.history.back() }
          title={user1.name}
          extra={[
              <Link to={`/admin/student/update/${user1._id}`}>
            <Button type="primary">
                編集
              </Button>
            </Link >,
             <Button onClick={() => destroy(user1._id)} type="danger">
                Delete
            </Button>
          ]}
            />
      {userList()}
      <main class="pa3 pa5-ns">
        <Table columns={columns} data={data} />
      </main>
      </AdminMenu>
    );
};

export default AdminUser;
