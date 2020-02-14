import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { createFavItem } from './apiCore';
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

const AddRank = ({ favStudent, interviewItemId, handleRankChange }) => {
  const [rank, setRank] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, watch, errors, control } = useForm();
  
  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
      setError("");
      setRank(e.target.value);
      handleRankChange(e.target.value)
  };

  const newCategoryFom = () => (
      <form> 
          <input style={{display: 'none' }} onChange={handleChange} value={rank}
      name="jrank"
      ref={register({ required: true, maxLength: 10 })}
    />{errors.japaneseVali && <div class="text-red">This field is required</div>}
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
            </form>
  );

  return (
  
          <div>
            {newCategoryFom()}
          </div>

  );
};

export default AddRank;
