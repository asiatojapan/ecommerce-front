import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent, getStudents } from "../core/apiCore";
import { Link } from "react-router-dom";
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
      <SiteWrapper>
      <Page.Content title="Dashboard">

       <Grid.Row>
       <div class="col-sm-6 col-lg-3">
                 <div class="card">
                   <div class="card-body">
                     <div class="d-flex">
                       <div>Sales</div>
                       <div class="ml-auto">
                         <div class="dropdown">
                           <a class="dropdown-toggle text-muted" href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             Last 7 days
                           </a>
                           <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                             <a class="dropdown-item active" href="#">Last 7 days</a>
                             <a class="dropdown-item" href="#">Last 30 days</a>
                             <a class="dropdown-item" href="#">Last 3 months</a>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div class="h1 mb-3">75%</div>

                     <div class="progress progress-sm">
                       <div class="progress-bar bg-blue" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                         <span class="sr-only">75% Complete</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
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
