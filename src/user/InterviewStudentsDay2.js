import React, { useState, useEffect }  from "react";
import { isAuthenticates } from "../auth";
import { getGroupInterviewList } from "../core/apiCore";
import InterviewNav from '../templates/InterviewNav'
import InterviewItemByDay from "../templates/InterviewItemByDay";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import _ from 'lodash';

const mapStateToProps = ({ session }) => ({
  session
  });
  
const mapDispatchToProps = dispatch => ({
logout: () => dispatch(logout())
});

const InterviewStudents = ({ logout, session }) => {
    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const [ interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true)

    const loadInterviews = () => {
        getGroupInterviewList(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoading(false)
                setInterviews(data);
                // createPDF(data)
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

      var result = _.flatMap(interviews, function (interview) { 
        return _.map(interview.interviewItems, function (item) { 
            return { interview: interview, ...item  };
        });
    });

      const arr = _.sortBy(result, "time")


    return (
      <>
   
     <InterviewNav>
      <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
     {arr.length === 0 ? 
       <> { noItemsMessage() } </> : 
      <> {arr.map((item, i)=> 
         <div>
            { item.time_period === "2日"　?
         <div class="mt-6">
           <InterviewItemByDay key={i} item={item} interview={item.interview} />
          </div> : null }
      </div> 
     )} </> }
       
      </InterviewNav>
        </>
    
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewStudents);
