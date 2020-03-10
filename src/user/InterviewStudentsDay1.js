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

    const [resumeLoading, setResumeLoading] = useState(true);
  

    async function createPDF(results) {
      const interviewDataArrPDF = [];
      let j = 0;
  
      while (j < results.length) {
        // eslint-disable-next-line no-await-in-loop
        await pdf(<InterviewSchedule interviewData={results[j]} timePeriod="1日" />)
          .toBlob()
          // eslint-disable-next-line no-loop-func
          .then(blobProp => {
            interviewDataArrPDF.push({
              ...results[j],
              url: URL.createObjectURL(blobProp),
            });
          });
  
        j += 1;
      }
      setInterviews(interviewDataArrPDF)
      setResumeLoading(false)
    }
    const createPDFLinkButton = (studentData, trigger) => {
      const { url } = studentData;
  
      return url ? 
        <a href={url} target="_blank">
          {trigger}
        </a> :  null
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
      <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <div>
          {createPDFLinkButton(
            interviews,
           <button type="button">Interview Schedule for </button>
              )}
            </div>
      {interviews.map((interview,i) => <div>    
        { interview.interviewItems.length ? interview.interviewItems.map((item, i) =>
          <div> 
          { item.time_period === "1日"　?
          <div class="mt-6">
            <InterviewItemByDay key={i}item={item} interview={interview} resumeLoading={resumeLoading}/></div>
            : "" }
          </div>
        ) : ""} </div> )}
      </InterviewNav>
        }</>
    
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewStudents);
