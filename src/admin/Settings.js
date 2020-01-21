import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent, getStudents } from "../core/apiCore";
import LikedStudents from "../user/LikedStudents";
import { Link } from "react-router-dom";
import  AdminMenu from "../user/AdminMenu";
import { getUsers } from "./apiAdmin";
import { MdHelpOutline } from "react-icons/md";

import "../styles.css";

const Settings = () => {
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



    return (
      <AdminMenu>
      <div class="ph3 ph4-ns pv4 mb3 bb b--black-10 black-70">
        <div class="f3 f2-ns dim black-70 lh-solid">Settings</div>
      </div>

        <div class="w-100 mr2">
          <article class="br2 bg-white ba b--black-10 h75">
          <div class="tc">
            <h1 class="f5 pt2">User Details</h1>
          </div>
            <article class="center hidden bb bt b--black-10">
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

          <div class="w-100 mt2">
            <article class="br2 bg-white ba b--black-10 h75">
            <div class="tc">
              <h1 class="f5 pt2">Admin Details</h1>
            </div>
              <article class="center hidden bb bt b--black-10">
              <dl class="lh-title pa4 mt0">
              <dt class="f6 b">Like Buttons</dt>
              <dd class="ml0">{name}</dd>
              <dt class="f6 b mt2">Email</dt>
              <dd class="ml0">{email}</dd>
              <dt class="f6 b mt2">Role</dt>
              <dd class="ml0">{role === 1 ? "Admin" : "Registered User"}</dd>
            </dl>

              </article>
              </article>
            </div>
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


      </AdminMenu>
    );
};

export default Settings;
