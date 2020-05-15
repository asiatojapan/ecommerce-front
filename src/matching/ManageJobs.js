import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { studentMatchSearch, getJobs, deleteJob } from './apiMatching';
import SiteWrapper from '../templates/SiteWrapper'
import {Container} from "tabler-react";

const ManageJobs = () => {
    const [loading, setLoading] = useState(false);  
    const [jobs, setJobs] = useState([]);
    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const loadJobs = () => {
        getJobs(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setJobs(data);
                setLoading(false)
            }
        });
    };
  
    const destroy = jobId => {
        deleteJob(jobId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadJobs();
            }
        });
    };

    useEffect(() => {
        loadJobs();
      }, []);
      
    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>

      <Container>
      <div class="list-list">
         <div style={{display: "flex", justifyContent: "space-between"}}>
        <h2 style={{marginBottom: 0}}>Jobs</h2>
        <a class="unlikeBtn resumeGradient smaller" href="/admin/job/create">Add</a> 
        </div>
      </div>
            <div class="row">
                {jobs.map((job, i) => 
                     <div class="col-4">
                        <div class="list-list" key={i}>
                             <div style={{display: "flex", justifyContent: "space-between"}}>
                                 <h4>{job.name}</h4>
                            <div> <a class="likeBtn smaller" style={{minHeight: "28px", height: "28px"}} href={`/admin/job/${job._id}`}>View</a> 
                            <a class="likeBtn smaller" style={{minHeight: "28px", height: "28px"}} href={`/admin/job/update/${job._id}`}>Edit</a> 
                             <button className="close ml-2" style={{minHeight: "8px", height: "8px"}}  onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) destroy(job._id) } } >
                               
                            </button>
                            </div>
                             </div>
                            {job.skills.map((skill, i) => 
                            <span class="badge bg-blue mr-2">  {skill} </span>)}
                           </div>
                        </div>
                    )}
            
            </div>
        </Container>
    
    </SiteWrapper>
    )
}

export default ManageJobs;
