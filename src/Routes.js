import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddStudent from './admin/AddStudent';
import AddUser from './admin/AddUser';
import AddLike from './core/AddLike';
import Product from './core/Product';
import ManageInterviews from './admin/ManageInterviews';
import AdminProfile from './user/AdminProfile';
import UpdateUser from './admin/UpdateUser';
import Settings from './admin/Settings';
import ManageStudents from './admin/ManageStudents';
import AdminUser from './admin/AdminUser';
import ManageUsers from './admin/ManageUsers';
import AStudent from './admin/Student';
import LikedStudentList from './user/LikedStudentsList';
import InterviewStudents from './user/InterviewStudents';
import UpdateStudent from './admin/UpdateStudent';
import Student from './core/Student';
import Profile from './user/Profile';
import Quixote from './pdf/Quixote';
import Faq from './user/Faq';

const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/signin" exact component={Signin}/>
    <Route path="/signup" exact component={Signup}/>
    <Route path="/create/like" exact component={AddLike} />
    <PrivateRoute path="/" exact component={Home}/>
    <PrivateRoute path="/faq" exact component={Faq}/>
    <PrivateRoute path="/student/:studentId" exact component={Student}/>
    <PrivateRoute path="/user/students" exact component={LikedStudentList}/>
    <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/admin/profile/:userId" exact component={AdminUser} />
    <AdminRoute path="/admin/create/student" exact component={AddStudent} />
    <AdminRoute path="/admin/create/user" exact component={AddUser} />
    <AdminRoute path="/admin/settings" exact component={Settings} />
    <AdminRoute path="/admin/interviews" exact component={ManageInterviews} />
    <PrivateRoute path="/user/interviews" exact component={InterviewStudents} />
    <AdminRoute path="/admin/students" exact component={ManageStudents} />
    <AdminRoute path="/admin/users" exact component={ManageUsers} />
    <PrivateRoute path="/profile/:userId" exact component={Profile} />
    <PrivateRoute path="/quixote" exact component={Quixote} />
    <AdminRoute path="/admin/student/:studentId" exact component={AStudent} />
    <AdminRoute path="/admin/student/update/:studentId" exact component={UpdateStudent} />
    <AdminRoute path="/admin/user/update/:userId" exact component={UpdateUser} />
    </Switch>
    </BrowserRouter>
  );
};

export default Routes;
