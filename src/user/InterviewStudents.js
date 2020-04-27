import React, { useState, useEffect }  from "react";
import { Link } from 'react-router-dom';
import { isAuthenticates } from "../auth";
import { getGroupInterviewList } from "../core/apiCore";
import CardStudent from '../templates/CardStudent';
import InterviewNav from '../templates/InterviewNav'
import SiteWrapper from '../templates/SiteWrapper'
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
  });
  
  const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
  });
      
const InterviewStudents = ({ logout, session }) => {
    const [ interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true)
    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const loadInterviews = () => {
        getGroupInterviewList(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterviews(data);
                setLoading(false)
            }
        });
    };

    useEffect(() => {
            loadInterviews();
    }, []);


    const noItemsMessage = () => (
      <SiteWrapper>
      <div className="p-5 page text-center">
        <div className="container">
            <h1 className="h1 mt-0 mb-4 display-1 text-muted mb-5">
            <i className="fe fe-check-circle"></i>
                </h1>
            <h2 className="h2 mt-0 mb-6">申請ありがとうございます</h2>
            <Link to="/user/history" className="resumeGradient unlikeBtn"> 面接予定の学生 へ</Link>
         </div>
    </div>
    </SiteWrapper>
  );


    return (
      <>
      {session.round === "Phase II" || session.round === "Phase II" ? noItemsMessage(): 
      <InterviewNav>         
        <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
        <div className="mt-6">
        {interviews.map((c,i) => <> 
          <CardStudent key={i} interview={c} student={c.student} showUpdateButton={true}/>
          </>)}
        </div>
        </InterviewNav>
        }</>
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewStudents);
