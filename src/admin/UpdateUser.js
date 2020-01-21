import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import {Form, Select, Input, Button, DatePicker } from 'antd';
import { PageHeader } from 'antd';
import { getSalesRep } from "./apiAdmin";
import { read, update, updateUser } from '../user/apiUser';
import  AdminMenu from "../user/AdminMenu";
const { Option } = Select;
const { TextArea } = Input;

const UpdateUser = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        phase: "",
        round: "",
        sales_rep: "",
        users: [],
        error: false,
        success: false
    });

    const [users, setUsers] = useState([]);
    const { token } = isAuthenticated();
    const { name, email, password, role, phase, round, sales_rep, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email, role: data.role, phase: data.phase,
                round: data.round, sales_rep: data.sales_rep });
            }
        });
    };


    const initUsers = () => {
        getSalesRep().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setUsers(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
        initUsers();
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, role, phase, round, sales_rep, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
              setValues({
                  ...values,
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  phase: data.phase,
                  round: data.round,
                  sales_rep: data.sales_rep,
                  success: true
              });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/admin/users" />;
        }
    };

    const Style = {
      style: {
        borderBottom: "3px solid rgb(212, 212, 212)"
      }
    };

    const profileUpdate = (name, email, password, role) => (

        <form>
        <div class="mw9 center ph3-ns">
          <div class="cf ph2-ns">
            <div class="fl w-100 w-25-ns pa2">
              <label for="country" class="f6 b db mb2">Username<span class="normal black-60"></span></label>
              <input type="text" onChange={handleChange("name")} value={name} name="name" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="country-desc"/>
            </div>
            <div class="fl w-100 w-75-ns pa2">
              <label for="country" class="f6 b db mb2">Email<span class="normal black-60"></span></label>
              <input type="text" onChange={handleChange("email")} value={email} name="email" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="country-desc"/>
            </div>
          </div>
        </div>
        <div class="mw9 center ph3-ns">
          <div class="cf ph2-ns">
          <div class="fl w-100 w-20-ns pa2">
          <div class="selectdiv">
            <label for="country" class="f6 b db mb2">営業<span class="normal black-60"></span></label>
            <select placeholder="営業" onChange={handleChange("sales_rep")} value={sales_rep} name="japanese">
            {users &&
                users.map((c, i) => (
                    <option key={i} value={c._id}>
                        {c.name}
                    </option>
                ))}
            </select>
            </div>
            </div>


            <div class="fl w-100 w-20-ns pa2">
            <div class="selectdiv">
              <label for="country" class="f6 b db mb2">Role<span class="normal black-60"></span></label>
              <select placeholder="Role" onChange={handleChange("role")} value={role} name="japanese">
              <option value=""> Select </option>
              <option value="0"> User </option>
              <option value="1"> Admin </option>
              </select>
              </div>
              </div>
            <div class="fl w-100 w-20-ns pa2">
            <div class="selectdiv">
              <label for="country" class="f6 b db mb2">Phase<span class="normal black-60"></span></label>
              <select placeholder="Phase" onChange={handleChange("round")} value={round} name="japanese">
              <option value=""> Select </option>
              <option value="Phase I"> Phase I </option>
              <option value="Phase II"> Phase II </option>
              <option value="Phase III"> Phase III </option>
              <option value="Phase IV"> Phase IV </option>
              </select>
              </div>
            </div>
            <div class="fl w-100 w-40-ns pa2">
            <label for="country" class="f6 b db mb2">Phase Memo<span class="normal black-60"></span></label>
            <input type="text" onChange={handleChange("phase")} value={phase} name="phase" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="country-desc"/>
            </div>
          </div>
        </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
      <AdminMenu>
          <PageHeader style={Style} title="Edit User" onBack={() => window.history.back() }/>
          {profileUpdate(name, email, password, role, round, phase, sales_rep)}
          {redirectUser(success)}
      </AdminMenu>
    );
};

export default UpdateUser;
