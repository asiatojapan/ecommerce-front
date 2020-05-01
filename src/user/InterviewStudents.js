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
      <div className="list-list">
            <div class="text-center mx-auto">
                現在面接予定の学生 0 名
            </div>
        </div>
  );


    return (
      <InterviewNav>        
        <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
        { interviews.length === 0 ?  <> {noItemsMessage()} </> : 
        <div className="mt-6">
        {interviews.map((c,i) => <> 
          <CardStudent key={i} interview={c} student={c.student} showUpdateButton={true}/>
          </>)}
        </div> 
          }
        </InterviewNav>
        
 
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewStudents);
