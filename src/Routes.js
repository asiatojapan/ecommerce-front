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
import AddProduct from './admin/AddProduct';
import AddLike from './core/AddLike';
import Product from './core/Product';
import Countdown from './core/Countdown';
import ManageProducts from './admin/ManageProducts';
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

const Routes = () => {
  return (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <Switch>
    <Route path="/signin" exact component={Signin}/>
    <Route path="/signup" exact component={Signup}/>
    <Route path="/countdown" exact component={Countdown} />
    <Route path="/product/:productId" exact component={Product} />
    <Route path="/create/like" exact component={AddLike} />
    <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
    <PrivateRoute path="/" exact component={Home}/>
    <PrivateRoute path="/student/:studentId" exact component={Student}/>
    <PrivateRoute path="/user/students" exact component={LikedStudentList}/>
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/admin/profile/:userId" exact component={AdminUser} />
    <AdminRoute path="/create/category" exact component={AddCategory} />
    <AdminRoute path="/admin/create/student" exact component={AddStudent} />
    <AdminRoute path="/create/product" exact component={AddProduct} />
    <AdminRoute path="/admin/settings" exact component={Settings} />
    <AdminRoute path="/admin/interviews" exact component={ManageInterviews} />
    <PrivateRoute path="/user/interviews" exact component={InterviewStudents} />
    <PrivateRoute path="/admin/products" exact component={ManageProducts} />
    <PrivateRoute path="/admin/students" exact component={ManageStudents} />
    <PrivateRoute path="/admin/users" exact component={ManageUsers} />
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
