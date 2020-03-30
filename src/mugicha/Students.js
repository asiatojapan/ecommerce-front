import React, { useState, useEffect } from 'react';
import NavMugicha from "./nav"
import { Link } from 'react-router-dom';
import { getStudentsParticipating } from './apiMugicha';
import { isAuthenticates } from "../auth";

const Students = ({  match }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const loadStudents = () => {
        getStudentsParticipating(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStudents(data);
                setLoading(false)
            }
        });
    };

    useEffect(() => {
        loadStudents();
    }, []);
    
    const listBreadCrumbs = () => {
        return (
            <ol class="breadcrumb breadcrumb-arrows" aria-label="breadcrumbs">
            <li class="breadcrumb-item"><a href="/mugicha">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page"></li>
            </ol>
        );
    };
    

    return (
        <>  
          <NavMugicha>
          <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
          <div class="table-responsive-sm">
          <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>学生 ID </th>
                    <th>学生 </th>
              
                    <th>Status</th>
                   <th></th>
                    </tr>
                </thead> {students.map((student, i) => 
                <tbody>
                    
              
                    <td>
               {student.studentid}
                </td>
                <td>
               {student.name}
                </td>
                <td>
              
               {student.inviteStatus}
                </td>
                <td>
                <Link to={`/mugicha/student/${student._id}`} >  Interview List  </Link>  <br/>
                <Link to={`/student/${student._id}`} >  Profile  </Link>  
                </td>
              
       
         </tbody>)}
        </table>    
        </div>
        </NavMugicha>
      </>
    );
  }
  
  export default Students;