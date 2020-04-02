import React, { useState, useEffect } from 'react';
import List from './List';
import { isAuthenticated, isAuthenticate, isAuthenticates } from '../auth';
import Checkbox2 from "./Checkbox";
import ItCheckbox from "./ItCheckbox";
import { categories } from "./categories";
import { japanese } from "./japanese";
import { it_skills } from "./it_skills";
import { entry_timing } from "./entry";
import {  getFilteredStudents, getFavStudents, getPushList } from './apiCore';
import SiteWrapper from '../templates/SiteWrapper';
import {
  Grid,
  Container
} from "tabler-react";
import "../styles.css";
import "tabler-react/dist/Tabler.css";
import 'react-toastify/dist/ReactToastify.css';
import Notifications, {notify} from 'react-notify-toast';
import { pdf } from "@react-pdf/renderer";
import Resume from "../pdf/Resume";
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const Home = ({ logout, session }) => {
 
  const { darwin_myTk, darwin_uid } = isAuthenticates();
  const [favCount, setFavCount] = useState();
  const [myFilters, setMyFilters] = useState({
      filters: { categories: [], it_skills: [] }
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  // const [studentsData, setStudentDataWithPDF] = useState([]);


  async function createPDF(results) {
    const studentDataArrPDF = [];
    let i = 0;
    //console.log(results)
    while (i < results.length) {
      // eslint-disable-next-line no-await-in-loop
      await pdf(<Resume student={results[i]} />)
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
    setFilteredResults(studentDataArrPDF);
    setResumeLoading(false)
  }

  const status = session.round === "Phase IV" ? "来日決定" : "リスト掲載";


  const loadFilteredResults = (newFilters) => {
      getFilteredStudents(darwin_uid, skip, limit, status, newFilters, session.round, darwin_myTk).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setLoading(false)
              setFilteredResults(data.data);
              setSize(data.size);
              setSkip(0);
             // createPDF(data.data)
          }
      });

  };

  const getFavCount = () => {
    getFavStudents(darwin_uid, darwin_myTk).then(data => {
        setFavCount(data.length);
        });
    };

  

  const loadMore = () => {
    setButtonLoading(true)
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredStudents(darwin_uid, toSkip, limit, status, myFilters.filters, session.round, darwin_myTk).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setFilteredResults([...filteredResults, ...data.data]);
            setSize(data.size);
            // createPDF([...filteredResults, ...data.data])
            setSkip(toSkip);
            setButtonLoading(false)
        }
    });
  };


  useEffect(() => {
      loadFilteredResults(skip, limit, myFilters.filters);
      getFavCount(darwin_uid);
  }, []);


  const loadMoreButton = () => {
     return (
         size > 0 &&
         size >= limit && (
             <button onClick={loadMore} className="unlikeBtn fullWidth resumeGradient">
                <i className="fa fa-circle-o-notch fa-spin" style={{marginRight: "10px", display: (!buttonLoading)? "none" : ""}}> {" "} </i> Load more
             </button>
         )
     );
 };


 const Position = () => {
    let myColor = { width: "100%", background: '#278bfa', text: "#FFFFFF" };
    notify.show(
        <div style={{fontSize: "16px"}}>
          12名以上学生を選抜すると成功報酬費用が10%OFFとなります。　
          <a className="close" style={{paddingLeft: "20px"}} onClick={notify.hide}></a>
        </div>, "custom", -1, myColor
      );
  }

  const handleFilters = (filters, filterBy) => {
      setLoading(true)
      // console.log(filters, filterBy);
      const newFilters = { ...myFilters };
      newFilters.filters[filterBy] = filters;

      loadFilteredResults(myFilters.filters);
      setMyFilters(newFilters);
  };


  const handleSetFavCount = e => {
    setFavCount(e);
  };


    return (
      <SiteWrapper> 
         <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
      <div className="my-3 my-md-5">
      <Container>
         <Grid.Row>
           <Grid.Col width={12} lg={3} sm={12}>
                <div className="list-list">
                    <h3 className="card-title">Tags</h3>
                    <Checkbox2 categories={categories}
                               handleFilters={filters =>
                                   handleFilters(filters, "tags")} />
                
                  </div>
                  <div className="list-list">
                       <h3 className="card-title">Japanese</h3>
                               <Checkbox2 categories={japanese} handleFilters={filters =>
                                handleFilters(filters, "japanese")} />
                      </div>
            

                <div className="list-list">
                       <h3 className="card-title">IT Skills</h3>
                       <div className="mb-3">
                        <div className="form-selectgroup">
                               <ItCheckbox it_skills={it_skills} handleFilters={filters =>
                           handleFilters(filters, "it_skills")} />
                       </div>
                          </div>
                       </div>
                      
                      {session.role === 1 ? 
                       <div className="list-list">
                       <h3 className="card-title">入社</h3>
                               <Checkbox2 categories={entry_timing} handleFilters={filters =>
                                handleFilters(filters, "entry_timing")} />
                      </div> : null}
            
           </Grid.Col>

        <Grid.Col width={12} lg={9} sm={12}>
               {filteredResults.map((student, i) => (
                <div key={i}>
                    <List key={i} student={student} setFavCount={handleSetFavCount}
                        favCount={favCount} resumeLink={student.url} resumeLoading={resumeLoading}/> 
                </div>
        ))}

        {loadMoreButton()}

        </Grid.Col>
        </Grid.Row>
        </Container>
        </div>
        {session.specialPlan === true || session.role === 3 ? null :   
        <> {favCount === 0 ? 
            null : <a href="/checkout/preview"><div className="count-bar"><div className="heart">{favCount} </div></div></a>}  </>}
          <Notifications options={{zIndex: 200, width: "100%"}} />
        </SiteWrapper>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);
