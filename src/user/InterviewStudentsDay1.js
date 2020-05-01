import React, { useState, useEffect }  from "react";
import { isAuthenticates } from "../auth";
import { getGroupInterviewList } from "../core/apiCore";
import InterviewNav from '../templates/InterviewNav'
import InterviewItemByDay from "../templates/InterviewItemByDay";
import { pdf,  Font } from "@react-pdf/renderer";
import Resume from "../pdf/RealResume";
import fontPathRegular from '../pdf/fonts/Koruri-Regular.ttf'
import fontPathBold from '../pdf/fonts/Koruri-Bold.ttf'
import fontPathSemiBold from '../pdf/fonts/Koruri-Semibold.ttf'
import SiteWrapper from '../templates/SiteWrapper'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { logout } from "../actions/session";
import InterviewSchedule from "../pdf/interview/InterviewSchedule"
import _ from 'lodash';

const mapStateToProps = ({ session }) => ({
  session
  });
  
const mapDispatchToProps = dispatch => ({
logout: () => dispatch(logout())
});

Font.register( {
    family: 'Open Sans',
    src: fontPathRegular,
  });
  Font.register( {
    family: 'Lato',
    src: fontPathRegular,
  });
  Font.register( {
    family: 'Lato Italic',
    src: fontPathSemiBold,
  });
  Font.register( {
    family: 'Lato Bold',
    src: fontPathBold,
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
                //e.log(data)
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
            { item.time_period === "1日"　?
         <div class="mt-6">
           <InterviewItemByDay key={i} item={item} interview={item.interview} />
          </div> : null }
      </div> 
     )} </> }
       </InterviewNav>
        }</>
    
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewStudents);
