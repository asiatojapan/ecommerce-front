import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent, getStudents } from "../core/apiCore";
import LikedStudents from "./LikedStudents";
import { Link } from "react-router-dom";
import  AdminMenu from "./AdminMenu";
import { Table } from "../admin/ManageUsers";
import { getUsers, getMyUsers, deleteUser } from "../admin/apiAdmin";
import SiteWrapper from '../templates/SiteWrapper'
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
            accessor: 'name',
            id: 'name',
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
        <div>
        <Link to={`/admin/profile/${text._id}`}> View </Link> |
        <Link to={`/admin/user/update/${text._id}`}> Update </Link>
        <a onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(text._id) } } className="f6 link dim br2 ph2 pv1 mb1 mt1 dib white bg-dark-red">
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


    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/create/student">
                            Create Student
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/students">
                            View Students
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };


    return (
      <SiteWrapper>
      <div class="ph3 ph4-ns pv4 mb3 bb b--black-10 black-70">
        <div class="f3 f2-ns lh-solid">Your Users</div>
      </div>

      <div class="ph4-ns">
        <Table columns={columns} data={data}/>
      </div>
      </SiteWrapper>
    );
};

export default AdminDashboard;
