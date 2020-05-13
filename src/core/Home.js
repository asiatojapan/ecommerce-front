import React, { useState, useEffect } from 'react';
import List from './List';

import { Redirect, Link, withRouter } from "react-router-dom";
import { isAuthenticates } from '../auth';
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
import { connect } from "react-redux";
import { logout } from "../actions/session";


const mapStateToProps = ({ session }) => ({
  session
});

const Home = ({ session }) => {
 
  const { darwin_myTk, darwin_uid } = isAuthenticates();
  const [favCount, setFavCount] = useState();
  const [myFilters, setMyFilters] = useState({
      filters: { categories: [], it_skills: [], studentid: ""}
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);
  const [latest, setLatest] = useState(false);
  const [recommended, setRecommended] = useState(true);
  const [size, setSize] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);


  const status = session.round === "Phase IV" ? "来日決定" : "リスト掲載";


  const loadFilteredResults = (newFilters) => {
      setLoading(true)
      getFilteredStudents(darwin_uid, skip, limit, status, newFilters, session.round, darwin_myTk, session.tags, latest, recommended).then(data => {
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
    setLoading(true)
    setButtonLoading(true)
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredStudents(darwin_uid, toSkip, limit, status, myFilters.filters, session.round, darwin_myTk, session.tags, latest, recommended).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setFilteredResults([...filteredResults, ...data.data]);
            setSize(data.size);
            // createPDF([...filteredResults, ...data.data])
            setSkip(toSkip);
            setButtonLoading(false)
            setLoading(false)
        }
    });
  };


  useEffect(() => {
    if (session) { 
      console.log(session)
      loadFilteredResults(skip, limit, myFilters.filters, latest);
      getFavCount(darwin_uid);
    }
  }, [latest, recommended]);


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


const handleChange = name => event => {
  const filters = new Array
  filters.push(event.target.value);
  const newFilters = { ...myFilters };
  newFilters.filters["studentid"] =  event.target.value;
  if (event.target.value.length == 0){
    newFilters.filters["studentid"] = "";
  }
    setLoading(true)
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  
};

  const handleFilters = (filters, filterBy) => {
      setLoading(true)
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
   
   
           {session.role === 1 ? 
           <div className="list-list" style={{padding: "0"}}>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="ID" onChange={handleChange()}/>
             
                </div>
                 </div>: null}

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
        {session.role === 1 ? 
          <div class="card-header">
                    <div class="card-options">
                    <div class="dropdown">
                    <button onClick={()=> setIsOpen(!isOpen)} class="likeBtn smaller fixedWidth">{latest? "新着順": "オススメ順"}
                    <svg class="Icon Btn-icon" role="img" viewBox="0 0 50 50"><g><polygon points="25,31.3 4.2,10.5 0.1,14.6 25,39.5 50,14.6 45.9,10.5 "></polygon></g></svg> 
                    </button>
                    <ul class={"dropdown-content " + (isOpen? 'show' : "")} >
                        <li><a onClick={()=> setLatest(!latest)}>オススメ順</a></li>
                        <li> <a onClick={()=> setLatest(!latest)}>新着順</a>  </li>
                                        
                    </ul>
                  </div>
                </div>
                  </div>: null}
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

export default withRouter(connect(
    mapStateToProps,
  )(Home));
