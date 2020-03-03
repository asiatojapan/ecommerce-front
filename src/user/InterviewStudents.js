import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getGroupInterviewList } from "../core/apiCore";
import CardStudent from '../templates/CardStudent';
import SiteWrapper from '../templates/SiteWrapper'
import InterviewNav from '../templates/InterviewNav'
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Tab,
  Tabs,
  Table,
  Alert,
  Nav,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import "../styles.css";
import { pdf,  Font, BlobProvider } from "@react-pdf/renderer";
import Resume from "../pdf/RealResume";
import fontPathRegular from '../pdf/fonts/Koruri-Regular.ttf'
import fontPathBold from '../pdf/fonts/Koruri-Bold.ttf'
import fontPathExtraBold from '../pdf/fonts/Koruri-Extrabold.ttf'
import fontPathLight from '../pdf/fonts/Koruri-Light.ttf'
import fontPathSemiBold from '../pdf/fonts/Koruri-Semibold.ttf'


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

const InterviewStudents = () => {
    const {
        user: { _id, name, email, role, round }
    } = isAuthenticated();

    const { user, token } = isAuthenticated();

    const [ interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true)
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

    const loadInterviews = () => {
        getGroupInterviewList(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterviews(data);
                createPDF(data)
               
                setLoading(false)
            }
        });
    };

      useEffect(() => {
            loadInterviews();
        }, []);


    return (
      <InterviewNav>         
    <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <div class="mt-6">
      {interviews.map((c,i) => <div>
        <CardStudent interview={c} student={c.student} resumeLoading={resumeLoading}/></div>)}
      </div>
      </InterviewNav>
    );
};

export default InterviewStudents;
