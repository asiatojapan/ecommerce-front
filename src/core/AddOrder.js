import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { createOrder } from './apiCore';
import SiteWrapper from '../templates/SiteWrapper'
import { useForm, Controller } from "react-hook-form";
import {
  Page,
  Dropdown,
  Icon,
  Grid,
  Card,
  Form,
  Text,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";

const AddOrder = ({ favStudent, interviewItemId, match, history }) => {
  const [rank, setRank] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
      setError("");
      setRank(e.target.value);
  };

  const clickSubmit = e => {
      e.preventDefault();
      setError("");
      setSuccess(false);
      // make request to api to create category
      createFavItem(user._id, token, { favStudent, rank }).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setError("");
              setSuccess(true);
          }
      });
  };

  const newCategoryFom = () => (
      <form onSubmit={clickSubmit}>
            <Form.Group label="希望"> 
                          <Form.SelectGroup pills onChange={handleChange} name="japanese">
                            <Form.SelectGroupItem
                              label="1"
                              name="japanese"
                              value="1"
                            />
                            <Form.SelectGroupItem
                            label="2"
                            name="japanese"
                              value="2"
                            />
                            <Form.SelectGroupItem
                            label="3"
                            name="japanese"
                              value="3"
                            />
                            <Form.SelectGroupItem
                            label="4"
                            name="japanese"
                              value="4"
                            />
                            <Form.SelectGroupItem
                            label="5"
                            name="japanese"
                              value="5"
                            />
                          </Form.SelectGroup>
                        </Form.Group>
              <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={rank}
                  autoFocus
                  required
              />
          <button className="btn btn-outline-primary">Create Category</button>
      </form>
  );

  const showSuccess = () => {
      if (success) {
          return <h3 className="text-success">{rank} is created</h3>;
      }
  };

  const showError = () => {
      if (error) {
          return <h3 className="text-danger">Category should be unique</h3>;
      }
  };

  const goBack = () => (
      <div className="mt-5">
          <Link to="/admin/dashboard" className="text-warning">
              Back to Dashboard
          </Link>
      </div>
  );

  return (
  
          <div>
            {newCategoryFom()}
          </div>

  );
};

export default withRouter(AddOrder);
