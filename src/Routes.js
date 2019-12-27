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
import Shop from './core/Shop';
import Product from './core/Product';
import Countdown from './core/Countdown';
import ManageProducts from './admin/ManageProducts';
import ManageStudents from './admin/ManageStudents';
import ManageUsers from './admin/ManageUsers';
import AStudent from './admin/Student';
import LikedStudentList from './user/LikedStudentsList';
import UpdateStudent from './admin/UpdateStudent';
import Student from './core/Student';
import Profile from './user/Profile';

const Routes = () => {
  return (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <Switch>
    <Route path="/signin" exact component={Signin}/>
    <Route path="/signup" exact component={Signup}/>
    <Route path="/shop" exact component={Shop} />
    <Route path="/countdown" exact component={Countdown} />
    <Route path="/product/:productId" exact component={Product} />
    <Route path="/create/like" exact component={AddLike} />
    <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
    <PrivateRoute path="/" exact component={Home}/>
    <PrivateRoute path="/student/:studentId" exact component={Student}/>
    <PrivateRoute path="/user/likes" exact component={LikedStudentList}/>
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/create/category" exact component={AddCategory} />
    <AdminRoute path="/admin/create/student" exact component={AddStudent} />
    <AdminRoute path="/create/product" exact component={AddProduct} />
    <PrivateRoute path="/admin/products" exact component={ManageProducts} />
    <PrivateRoute path="/admin/students" exact component={ManageStudents} />
    <PrivateRoute path="/admin/users" exact component={ManageUsers} />
    <PrivateRoute path="/profile/:userId" exact component={Profile} />
    <AdminRoute path="/admin/student/:studentId" exact component={AStudent} />
    <AdminRoute path="/admin/student/update/:studentId" exact component={UpdateStudent} />
    </Switch>
    </BrowserRouter>
  );
};

export default Routes;
