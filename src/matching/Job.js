import React, { useState, useEffect } from 'react';
import SiteWrapper from '../templates/SiteWrapper';
import { isAuthenticates } from '../auth';
import { readJob, readStudentMatched } from "./apiMatching"
import {Container} from "tabler-react";

const Job = ({ match }) => {

    const [ job, setJob ] = useState({});
    const [ students, setStudents ] = useState([]);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)

    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const init = jobId => {
        readJob(jobId, darwin_myTk).then(data => {
            if (data.error) {
                setError(true)
            } else {
                setJob(data)
            }
        });
    };

    const studentsMatched = jobId => {
        readStudentMatched(jobId, darwin_myTk).then(data => {
            if (data.error) {
                setError(true)
            } else {
                setStudents(data)
                setLoading(false)
            }
        });
    };

    useEffect(() => {
        init(match.params.jobId);
        studentsMatched(match.params.jobId);
    }, []);



    return (
        <SiteWrapper>
             <div class="loading" style={{ display: loading ? "" : "none" }}>
                <div class="loaderSpin"></div>
            </div>
           
            <Container>
            <ol class="breadcrumb" aria-label="breadcrumbs">
                <li class="breadcrumb-item"><a href="/admin/jobs">All Jobs</a></li>
                <li class="breadcrumb-item active" aria-current="page">{job.name}</li>
            </ol>

            <div class="list-list">
                 <div style={{display: "flex", justifyContent: "space-between"}}>
                     <h2 style={{marginBottom: 0}}>{job.name}</h2>
                       <a class="likeBtn smaller" href={`/admin/job/update/${job._id}`}>Edit</a> 
                </div>
                {job.skills ? <> { job.skills.map((skill, i) => 
                            <span class="badge bg-blue mr-2">  {skill} </span>)} </> : null }
                 {job.keywords ? <> { job.keywords.map((keyword, i) => 
                            <span class="badge bg-red mr-2">  {keyword} </span>)} </> : null }
            </div>

            <div class="list-list">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">StudentId</th>
                        <th scope="col">Name</th>
                        <th scope="col">Matched Skills</th>
                        <th scope="col">Points</th>
                        <th scope="col">Keyword Match</th>
                        </tr>
                    </thead>
                    <tbody>
                    {students.map((student,i) => 
                        <tr>
                        <td><a href={`/student/${student._id}`}>{student.studentid}</a></td>
                        <td>{student.name}</td>
                        <td>{student.jobPoints[0].tagsMatch ? 
                         <> {student.jobPoints[0].tagsMatch.map((match, i ) => 
                         <span>{match}{i != (student.jobPoints[0].tagsMatch.length-1) ? ', ' : ''}</span>)} </> : null }</td>
                        <td>{student.jobPoints[0].points}</td>
                        <td>{student.jobPoints[0].keywordsPoints}</td>
                        </tr>
                        )}
                    </tbody>
                    </table>
              
            </div>
            </Container>
        </SiteWrapper >
    );
};

export default Job;
