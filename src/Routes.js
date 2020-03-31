import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signin from "./user/Signin";
import Home from "./core/Home";
import NoAccess from "./user/NoAccess"
import Restricted from "./user/Restricted"
import Error from "./user/Error"
import PrivateRoute from './auth/PrivateRoute';
import MainRoute from './auth/MainRoute';
import AdminRoute from './auth/AdminRoute';
import AddStudent from './admin/AddStudent';
import AddUser from './admin/AddUser';
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
import Welcome from './user/Welcome';
import Profile from './user/Profile';
import CheckoutPreview from './core/CheckoutPreview';
import Checkout from './core/Checkout';
import Orders from './user/Orders';
import Order from './user/Order';
import RealStudent from './user/RealStudent';
import ReactGA from 'react-ga';
import GA from './utils/GoogleAnalytics'
import ForgotPassword from "./user/ForgotPassword"
import ResetPassword from "./user/ResetPassword";
import { createBrowserHistory } from 'history';
import Mugicha from "./mugicha/Home"
import MugichaCompany from "./mugicha/Company"
import MugichaCompanyProfile from "./mugicha/CompanyProfile"
import MugichaStudent from "./mugicha/Student"
import MugichaInterview from "./mugicha/Interview"
import MugichaCompanies from "./mugicha/Companies"
import MugichaStudents from "./mugicha/Students"

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
    <Route path="/signin" exact component={Signin}/>
    <Route path="/restricted" exact component={Restricted} />
    <Route path="/noaccess" exact component={NoAccess} />
    <AdminRoute path="/forgotpassword" exact component={ForgotPassword} />
    <AdminRoute
                exact
                path="/reset-password/:resetPasswordToken"
                component={ResetPassword}
            />
    <MainRoute path="/" exact component={Home}/>
    <MainRoute path="/welcome" exact component={Welcome}/>
    <PrivateRoute path="/user/history" exact component={Orders}/>
    <MainRoute path="/checkout/preview" exact component={CheckoutPreview}/>
    <MainRoute path="/checkout" exact component={Checkout}/>
    <MainRoute path="/student/:studentId" exact component={Student}/>
    <PrivateRoute path="/order/:orderId" exact component={Order}/>
    <AdminRoute path="/mugicha" exact component={Mugicha} />
    <AdminRoute path="/mugicha/company/:userId" exact component={MugichaCompany} />
    <AdminRoute path="/mugicha/student/:studentId" exact component={MugichaStudent} />
    <AdminRoute path="/mugicha/interview/:interviewId" exact component={MugichaInterview} />
    <AdminRoute path="/mugicha/companies" exact component={MugichaCompanies} />
    <AdminRoute path="/mugicha/companyprofile/:userId" exact component={MugichaCompanyProfile} />
    <AdminRoute path="/mugicha/students" exact component={MugichaStudents} />
   

    <AdminRoute path="/admin/profile/:userId" exact component={AdminUser} />
    <AdminRoute path="/admin/create/student" exact component={AddStudent} />
    <AdminRoute path="/admin/create/user" exact component={AddUser} />
    <AdminRoute path="/admin/interviews" exact component={ManageInterviews} />
    <PrivateRoute path="/user/interviews" exact component={InterviewStudents} />
    <PrivateRoute path="/user/interviews/day1" exact component={InterviewStudentsDay1} />
    <PrivateRoute path="/user/interviews/day2" exact component={InterviewStudentsDay2} />
    <AdminRoute path="/admin/students" exact component={ManageStudents} />
    <AdminRoute path="/admin/users" exact component={ManageUsers} />
    <PrivateRoute path="/profile/:userId" exact component={Profile} />
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
