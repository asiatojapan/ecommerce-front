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
import Shop from './core/Shop';
import Product from './core/Product';
import Countdown from './core/Countdown';
import ManageProducts from './admin/ManageProducts';
import ManageStudents from './admin/ManageStudents';
import UpdateProduct from './admin/UpdateProduct';
import Student from './core/Student';

const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/signin" exact component={Signin}/>
    <Route path="/signup" exact component={Signup}/>
    <Route path="/shop" exact component={Shop} />
    <Route path="/countdown" exact component={Countdown} />
    <Route path="/product/:productId" exact component={Product} />
    <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
    <PrivateRoute path="/" exact component={Home}/>
    <PrivateRoute path="/student/:studentId" exact component={Student}/>
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/create/category" exact component={AddCategory} />
    <Route path="/admin/create/student" exact component={AddStudent} />
    <AdminRoute path="/create/product" exact component={AddProduct} />
    <PrivateRoute path="/admin/products" exact component={ManageProducts} />
    <PrivateRoute path="/admin/students" exact component={ManageStudents} />
    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
    </Switch>
    </BrowserRouter>
  );
};

export default Routes;
