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
            }
        });
    };

    const [resumeLoading, setResumeLoading] = useState(true);
  

    async function createPDF(results) {
      const studentDataArrPDF = [];
      let i = 0;
      // console.log(results)
      while (i < results.length) {
        // eslint-disable-next-line no-await-in-loop
        // console.log(results[i].student)
        await pdf(<Resume studentData={results[i].student} />)
          .toBlob()
          // eslint-disable-next-line no-loop-func
          .then(blobProp => {
            studentDataArrPDF.push({
              ...results[i],
              url: URL.createObjectURL(blobProp),
            });
          });
        i += 1;
      }
      setInterviews(studentDataArrPDF)
      setResumeLoading(false)
    }

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

      var result = _.flatMap(interviews, function (interview) { 
        return _.map(interview.interviewItems, function (item) { 
            return { interview: interview, ...item  };
        });
    });

      const arr = _.sortBy(result, "time")


    return (
      <>
      {session.round === "Phase II" || session.round === "Phase II" ? noItemsMessage(): 
     <InterviewNav>
      <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      {arr.map((item, i)=> 
     <div>
        { item.time_period === "2日"　?
         <div class="mt-6">
    <InterviewItemByDay key={i} item={item} interview={item.interview} />
      </div> : null }
      </div>
     )}
       
      </InterviewNav>
        }</>
    
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewStudents);
