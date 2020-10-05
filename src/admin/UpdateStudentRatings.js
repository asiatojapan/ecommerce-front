import React, { useState, useEffect } from 'react';
import { isAuthenticates } from '../auth';
import { Redirect, withRouter} from 'react-router-dom';
import { readStudentDetails } from '../core/apiCore';
import { updateStudent } from './apiAdmin';
import SiteWrapper from '../templates/SiteWrapper'
import {
  Container, Form,
} from "tabler-react";
import { connect } from "react-redux";

const mapStateToProps = ({ session }) => ({
  session
});


const UpdateStudentRatings = ({ session, match, history, studentId }) => {
    const [values, setValues] = useState({
      name: '',
      ratings: "",
      redirectToProfile: false,
      formData: ''
    });

    const {
        name,
        error,
        createdStudent,
        formData, success,
    } = values;

    const [ isEditing, setIsEditing] = useState(false)

    const { darwin_uid, darwin_myTk } = isAuthenticates();


    const init = studentId => {
        readStudentDetails(studentId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    ratings: data.ratings,
                    formData: new FormData()
                });
            }
        });
    };


    useEffect(() => {
        init(match.params.studentId);
    }, []);

    const handleChange = name => event => {
          const value = name === 'upload_fyp' ? event.target.files[0] : event.target.value;
          formData.set(name, value);
          setValues({ ...values, [name]: value });
    };

    const clickEdit = () => {
      setIsEditing(!isEditing)
  }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateStudent(match.params.studentId, darwin_uid, darwin_myTk, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    ratings: data.ratings,
                });
                setIsEditing(!isEditing)
            }
        });
    };

    const newPostForm = () => (
      <form onSubmit={clickSubmit}>
          <select placeholder="Ratings" onChange={handleChange("ratings")} value={values.ratings} name="ratings">
            <option value=""> Select </option>
            <option value="0"> 0 </option>
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
            </select>  
          <button type="submit" class="btn btn-primary btn-sm">Save</button>
      </form>
    )

    return (
    
      <div style={{fontSize: "15px", margin: "10px"}}> 
      {isEditing ? 
   <> {newPostForm()} </> :
   <>  <span style={{marginRight: "20px"}}> {values.ratings}  </span> 
      <button type="button" class="btn btn-primary btn-sm" onClick={clickEdit}> Edit </button> </> } </div>

    );
};

export default withRouter(connect(
  mapStateToProps,
)(UpdateStudentRatings));
