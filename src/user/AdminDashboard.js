import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent, getStudents } from "../core/apiCore";
import LikedStudents from "./LikedStudents";
import { Link } from "react-router-dom";
import  AdminMenu from "./AdminMenu";
import { getUsers } from "../admin/apiAdmin";
import { MdHelpOutline } from "react-icons/md";

import "../styles.css";

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const { user } = isAuthenticated();

    const [ likedstudents, setLikedstudents ] =  useState([]);

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

    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        getUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };

    const init = userId => {
        getUser(userId).then(data => {
            setLikedstudents(data.liked_students);
        });
        loadStudents();
        loadUsers();
    };

    useEffect(() => {
        init(user._id);
    }, []);

    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };

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
      <AdminMenu>
      <div class="ph3 ph4-ns pv4 mb3 bb b--black-10 black-70">
        <div class="f3 f2-ns dim black-70 lh-solid">Dashboard</div>
      </div>
      <article class="pa4 pa4-ns" data-name="slab-stat">
          <dl class="dib mr5">
            <dd class="f6 f5-ns b ml0">Liked Students</dd>
            <dd class="f3 f2-ns b ml0">{likedstudents.length}</dd>
          </dl>
          <dl class="dib mr5">
            <dd class="f6 f5-ns b ml0">学生</dd>
            <dd class="f3 f2-ns b ml0">{students.length}</dd>
          </dl>
          <dl class="dib mr5">
            <dd class="f6 f5-ns b ml0">Users</dd>
            <dd class="f3 f2-ns b ml0">{users.length}</dd>
          </dl>

        </article>
      <div class="ph4-ns">
      <div class="flex">

        <div class="w-30 mr2">
          <article class="mw6 br2 bg-white ba b--black-10 h75">
          <div class="tc">
            <h1 class="f5 pt2">User Details</h1>
          </div>
            <article class="center mw5 mw6-ns hidden bb bt b--black-10">
            <dl class="lh-title pa4 mt0">
            <dt class="f6 b">Name</dt>
            <dd class="ml0">{name}</dd>
            <dt class="f6 b mt2">Email</dt>
            <dd class="ml0">{email}</dd>
            <dt class="f6 b mt2">Role</dt>
            <dd class="ml0">{role === 1 ? "Admin" : "Registered User"}</dd>
          </dl>

            </article>
            </article>
          </div>

          <div class="w-30 mr2 h75">
            <article class="mw6 br2 bg-white ba b--black-10 h75">
            <div class="tc">
              <h1 class="f5 pt2 f6 ml3 pr2 ">Help <MdHelpOutline/></h1>
            </div>
              <article class="center mw5 mw6-ns hidden bb bt b--black-10">
              <div class="mw9 center ph3-ns">
                <div class="cf ph2-ns">
                <div class="fl w-100 w-50-ns pa2">
                  <div class="tc"> Help </div>
                </div>
                <div class="fl w-100 w-50-ns pa2">
                  <div class="tc"> Support </div>
                </div>
                </div>
                </div>
              </article>
              </article>
            </div>
              </div>
        </div>


      </AdminMenu>
    );
};

export default AdminDashboard;
