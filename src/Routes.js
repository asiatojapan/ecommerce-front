import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddStudent from './admin/AddStudent';
import AddFullInterview from './admin/AddFullInterview';
import AddUser from './admin/AddUser';
import AddLike from './core/AddLike';
import Interview from './core/Interview';
import ManageInterviews from './admin/ManageInterviews';
import UpdateInterview from './admin/UpdateInterview';
import UpdateInterviewItem from './user/UpdateInterviewItem';
import UpdateUser from './admin/UpdateUser';
import ManageStudents from './admin/ManageStudents';
import AdminUser from './admin/AdminUser';
import ManageUsers from './admin/ManageUsers';
import InterviewStudents from './user/InterviewStudents';
import InterviewStudentsDay1 from './user/InterviewStudentsDay1';
import InterviewStudentsDay2 from './user/InterviewStudentsDay2';
import UpdateStudent from './admin/UpdateStudent';
import Student from './core/Student';
import Profile from './user/Profile';
import CheckoutPreview from './core/CheckoutPreview';
import Checkout from './core/Checkout';
import Orders from './user/Orders';
import Order from './user/Order';

document.body.style.backgroundColor = "#fff";


const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/signin" exact component={Signin}/>
    <Route path="/signup" exact component={Signup}/>
    <Route path="/create/like" exact component={AddLike} />
    <PrivateRoute path="/" exact component={Home}/>
    <PrivateRoute path="/user/orders" exact component={Orders}/>
    <PrivateRoute path="/checkout/preview" exact component={CheckoutPreview}/>
    <PrivateRoute path="/checkout" exact component={Checkout}/>
    <PrivateRoute path="/student/:studentId" exact component={Student}/>
    <PrivateRoute path="/order/:orderId" exact component={Order}/>
    <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/admin/profile/:userId" exact component={AdminUser} />
    <AdminRoute path="/admin/create/student" exact component={AddStudent} />
    <AdminRoute path="/admin/create/interview" exact component={AddFullInterview} />
    <AdminRoute path="/admin/create/user" exact component={AddUser} />
    <AdminRoute path="/admin/interviews" exact component={ManageInterviews} />
    <PrivateRoute path="/user/interviews" exact component={InterviewStudents} />
    <PrivateRoute path="/user/interviews/day1" exact component={InterviewStudentsDay1} />
    <PrivateRoute path="/user/interviews/day2" exact component={InterviewStudentsDay2} />
    <AdminRoute path="/admin/students" exact component={ManageStudents} />
    <AdminRoute path="/admin/users" exact component={ManageUsers} />
    <PrivateRoute path="/profile/:userId" exact component={Profile} />
    <PrivateRoute path="/interview/:interviewId" exact component={Interview}/>
    <AdminRoute path="/admin/student/update/:studentId" exact component={UpdateStudent} />
    <AdminRoute path="/admin/user/update/:userId" exact component={UpdateUser} />
      <AdminRoute path="/admin/interview/update/:interviewId" exact component={UpdateInterview} />
      <PrivateRoute path="/user/interviewitem/:interviewId" exact component={UpdateInterviewItem} />
    </Switch>
    </BrowserRouter>
  );
};

export default Routes;
