import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent, getStudents } from "../core/apiCore";
import { Link } from "react-router-dom";
import { Table } from "../admin/ManageUsers";
import { getUsers, getMyUsers, deleteUser } from "../admin/apiAdmin";
import SiteWrapper from '../templates/SiteWrapper';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
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
  Dropdown
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
            accessor: "name",
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
        <DropdownButton id="btn-sm dropdown-primary-button" title="Actions" size="sm" variant="secondary">
          <Dropdown.Item to={`/admin/profile/${text._id}`}>View </Dropdown.Item>
          <Dropdown.Item to={`/admin/user/update/${text._id}`} >Update</Dropdown.Item>
          <Dropdown.Item >  <a onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(text._id) } } >
                  Delete
              </a></Dropdown.Item>
        </DropdownButton>,
        filterable : true
      }
  ];

   const data = users


    useEffect(() => {
        loadUsers();
    }, []);




    return (
      <SiteWrapper>
      <Page.Content title="Dashboard">

       <Grid.Row>

       <Grid.Col width={12}>
          <Card>
            <Table columns={columns} data={data}/>
          </Card>
      </Grid.Col>
       </Grid.Row>
      </Page.Content>
      </SiteWrapper>
    );
};

export default AdminDashboard;
