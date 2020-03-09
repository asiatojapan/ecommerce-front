import React, { useContext } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Restricted from "./user/Restricted"
import Error from "./user/Error"
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddStudent from './admin/AddStudent';
import AddFullInterview from './admin/AddFullInterview';
import AddUser from './admin/AddUser';
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
import RealStudent from './user/RealStudent';
import RootContext from "./RootContext"
import ReactGA from 'react-ga';
import GA from './utils/GoogleAnalytics'
import { createBrowserHistory } from 'history';
import { UserDetailsProvider }  from "./UserDetailsContext"

import Login from "./user/Login";
import { AuthRoute, ProtectedRoute } from "./util/route";
const history = createBrowserHistory();

document.body.style.backgroundColor = "#fff";

ReactGA.initialize('UA-124318785-3');

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname)
}
);

ReactGA.pageview(window.location.pathname + window.location.search);


const Routes = () => {
  
  return (
    <BrowserRouter>
    { GA.init() && <GA.RouteTracker /> }  
    <Switch>
    <Route path="/login" component={Login} />
  
    <Route path="/signin" exact component={Signin}/>
    <Route path="/signup" exact component={Signup}/>
    <Route path="/restricted" exact component={Restricted} />
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
      <PrivateRoute path="/interview/student/:studentId" exact component={RealStudent}/>
      <Route path="*" component={Error} />
    </Switch>
    </BrowserRouter>
  );
};

export default Routes;
