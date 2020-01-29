import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { importStudents } from './apiAdmin';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API } from '../config';
import axios from 'axios';

const ImportStudents = () => {
    const [values, setValues] = useState({
        name: '',
        file: '',
        formData: '',
        error: '',
        createdProduct: '',
        redirectToProfile: false,
    });

    const { user, token } = isAuthenticated();
    const {
      name,
      file,
      formData,
      error,
      createdStudent,
      redirectToProfile,
    } = values;

    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        });
    }, []);


      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

    const handleChange = name => event => {
        const value = name === 'file' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '' });

        axios.post(`${API}/students/import`, formData, {
        }).then(res => { // then print response status

          setValues({
              ...values,
              error: false,
              createdStudent: "Imported",
              redirectToProfile: true
          });
            console.log(res.statusText)
        })
    };

    const newPostForm = () => (
      <div>
      <Button className="btn btn-sm btn-secondary ml-2" variant="primary" onClick={handleShow}>
       Import
     </Button>

     <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton> Import CSV
       </Modal.Header>
       <form  onSubmit={clickSubmit}>
       <Modal.Body>
         <div class="form-file">
         <input type="file" name="file" onChange={handleChange('file')} class="form-file-input" id="customFile" />
           <label class="form-file-label" for="customFile" >
           <span class="form-file-text">Choose file...</span>
         <span class="form-file-button">Browse</span>
       </label>
       </div>
       </Modal.Body>
       <Modal.Footer>
       <button className="btn btn-primary">Import</button>
       </Modal.Footer>
       </form>
     </Modal>
     </div>
    );

    const showSuccess = () => (
      <Alert>
  Imported
 </Alert>
    );

      function refreshPage(){
          window.location.reload();
      }

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                refreshPage()
                return <Redirect to="/admin/students" />;
            }
        }
    };

    return (
      <div>
        {newPostForm()}
        {redirectUser()}
        </div>
    );
};

export default withRouter(ImportStudents);
