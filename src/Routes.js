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

//////////////////////////////
/// Matching Related /// 
import AddJob from './matching/AddJob';
import Job from './matching/Job';
import UpdateJob from './matching/UpdateJob';
import ManageJobs from './matching/ManageJobs';
import MatchingUser from './admin/MatchingUser';
import Search from "./matching/Search";
//////////////////////////////
//////////////////////////////


//////////////////////////////
/// Recommended Related //// 
import RecommendHistory from "./recommend/RecommendHistory";
import MyHistory from "./recommend/MyHistory";
import AllRecommends from "./recommend/AllRecommends";
//////////////////////////////
//////////////////////////////

//////////////////////////////
/// Interview Related //// 
import MyInterviews from "./interview/MyInterviews";
//////////////////////////////
//////////////////////////////

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
import InterviewsPast from './user/InterviewsPast';
import InterviewPast from './user/InterviewPast';
import Order from './user/Order';
import RealStudent from './user/RealStudent';
import ReactGA from 'react-ga';
import GA from './utils/GoogleAnalytics'
import ForgotPassword from "./user/ForgotPassword"
import ResetPassword from "./user/ResetPassword";
import { createBrowserHistory } from 'history';
//////////////////////////////


//////////////////////////////
/// Mugicha Related //// 
import Mugicha from "./mugicha/Home"
import MugichaCompany from "./mugicha/Company"
import MugichaCompanyProfile from "./mugicha/CompanyProfile"
import MugichaStudent from "./mugicha/Student"
import MugichaInterview from "./mugicha/Interview"
import MugichaCompanies from "./mugicha/Companies"
import MugichaStudents from "./mugicha/Students"
import MugichaDay from "./mugicha/Day"
import MugichaDayOne from "./mugicha/DayOne"
import MugichaDayTwo from "./mugicha/DayTwo"
import MugichaFull from "./mugicha/Full"
import MugichaPast from "./mugicha/Past"
//////////////////////////////
//////////////////////////////



import FavList from "./admin/FavStudentsList"

import { AuthRoute } from "./util/route";


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
    <PrivateRoute path="/history/kentou" exact component={Orders}/>
    <PrivateRoute path="/history/interviews" exact component={InterviewsPast}/>
    <PrivateRoute path="/history/interview/:recommendId" exact component={InterviewPast}/>


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


    <AdminRoute path="/mugicha/day" exact component={MugichaDay} />
    <AdminRoute path="/mugicha/day1" exact component={MugichaDayOne} />
    <AdminRoute path="/mugicha/day2" exact component={MugichaDayTwo} />
    <AdminRoute path="/mugicha/full" exact component={MugichaFull} />
    <AdminRoute path="/mugicha/past" exact component={MugichaPast} />


    <AdminRoute path="/admin/history" exact component={RecommendHistory} />
    <AdminRoute path="/admin/history/:userId" exact component={MyHistory} />
    <AdminRoute path="/admin/interviews/:userId" exact component={MyInterviews} />
    <AdminRoute path="/admin/recommends" exact component={AllRecommends} />


    <AdminRoute path="/admin/profile/:userId" exact component={AdminUser} />
    <AdminRoute path="/admin/create/student" exact component={AddStudent} />
    <AdminRoute path="/admin/create/user" exact component={AddUser} />
    <AdminRoute path="/admin/interviews" exact component={ManageInterviews} />
    <AdminRoute path="/admin/suisen" exact component={FavList} />
     <AdminRoute path="/admin/students" exact component={ManageStudents} />
    <AdminRoute path="/admin/users" exact component={ManageUsers} />
    <AdminRoute path="/admin/student/update/:studentId" exact component={UpdateStudent} />
    <AdminRoute path="/admin/user/update/:userId" exact component={UpdateUser} />
      <AdminRoute path="/admin/interview/update/:interviewId" exact component={UpdateInterview} />
  


    <AdminRoute path="/admin/matching/:userId" exact component={MatchingUser} />
    <AdminRoute path="/admin/search" exact component={Search} />
    <AdminRoute path="/admin/job/create" exact component={AddJob} />
    <AdminRoute path="/admin/job/:jobId" exact component={Job} />
    <AdminRoute path="/admin/job/update/:jobId" exact component={UpdateJob} />
    <AdminRoute path="/admin/jobs" exact component={ManageJobs} />

    <PrivateRoute path="/user/interviews" exact component={InterviewStudents} />
    <PrivateRoute path="/user/interviews/day1" exact component={InterviewStudentsDay1} />
    <PrivateRoute path="/user/interviews/day2" exact component={InterviewStudentsDay2} />
    <PrivateRoute path="/profile/:userId" exact component={Profile} />
       <PrivateRoute path="/user/interviewitem/:interviewId" exact component={UpdateInterviewItem} />
      <PrivateRoute path="/interview/student/:studentId" exact component={RealStudent}/>
      <Route path="*" component={Error} />
    </Switch>
    </BrowserRouter>
  );
};

export default Routes;
