import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent, getStudents } from "../core/apiCore";
import LikedStudents from "./LikedStudents";
import { Link } from "react-router-dom";
import { Table } from "../admin/ManageUsers";
import { getUsers, getMyUsers, deleteUser } from "../admin/apiAdmin";
import AdminSiteWrapper from '../templates/AdminSiteWrapper'
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import "../styles.css";


const AdminDashboard = () => {

    const [users, setUsers] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const { user, token } = isAuthenticated();

    const [ likedstudents, setLikedstudents ] =  useState([]);


    const loadUsers = () => {
        getMyUsers(user._id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };


      const destroy = userId => {
          deleteUser(user._id, token).then(data => {
              if (data.error) {
                  console.log(data.error);
              } else {
                  loadUsers();
              }
          });
      };


    const columns = [
      {
        Header: 'Name',
            accessor: (text, i) =>
            <div>
            <Link to={`/admin/profile/${text._id}`}> {text.name} </Link>
            </div>,
          },
      {
        Header: 'Email',
        accessor: 'email',
        id: 'email',
        sortType: 'basic',
      },
      {
        Header: 'Role',
        accessor: (text) =>
        <div>
        {text.role === 1 ? "Admin" : "User"}
        </div>,
        id: 'role',
        sortType: 'basic',
      },
      {
        Header: 'Phase',
        accessor: "round"
      },
      {
        Header: 'Phase Memo',
        accessor: "phase"
      },
      {
        Header: 'Liked Students',
        accessor: (text, i) =>
        <div> {text.liked_students.length} </div>
      },
      {
        Header: "Actions",
        accessor: (text, i) =>
        <div className="btn-list">
        <Link className="btn-sm btn btn-success" to={`/admin/user/update/${text._id}`}> Update </Link>
        <a onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(text._id) } } className="btn btn-sm btn-secondary">
              Delete
          </a>
        </div>,
        filterable : true
      }
  ];

   const data = users


    useEffect(() => {
        loadUsers();
    }, []);




    return (
      <AdminSiteWrapper>
      <Page.Content title="Dashboard">
       <Grid.Row>
       <Grid.Col width={12}>
          <Card>
            <Table columns={columns} data={data}/>
          </Card>
      </Grid.Col>
       </Grid.Row>
      </Page.Content>
      </AdminSiteWrapper>
    );
};

export default AdminDashboard;
