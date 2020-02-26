import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import  AddFav from './AddFav';
import  AddRank from './AddRank';
import { createFav, destroyFav,readStudent } from "./apiCore";
import { FaFileDownload } from 'react-icons/fa';
import { isAuthenticated } from '../auth';
import {
  Container,
  Page,
  Grid,
  Icon,
  Form,
  Card, Dropdown, Avatar, Text, Button, Badge
} from "tabler-react";

const CardCheckout = ({student,indivRank,
  showRemoveItemButton = false,
  showDetailsButton = true,
  showRankItemButton = false,
  showRankOutcomeButton = false,
  setRun = f => f,
  run = undefined,
  setLoading = f => f, loading = undefined }) => {

  const { user, token } = isAuthenticated();

  const [redirect, setRedirect] = useState(false);

  const showRemoveButton = showRemoveItemtButton => {
    return (
      showRemoveItemButton && (
        <span
          onClick={() => {
            destroyFav(student._id, user, token);
            setRun(!run);
            setLoading(!loading);
            // run useEffect in parent Cart
          }}
          className="close"
        >
        </span>
      )
    );
  }

  const showDetails = showDetailsButton => {
    return (
      showDetailsButton && (
        <div  style={{marginBottom: "0px"}}>
        <div>
        <Icon prefix="fe" name="user" /><strong>  性別・年齢: </strong> {student.gender === "male" ? "男性": "女性"}・{student.age}
        </div>
        <div>
        <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
        </div>
        </div>
      )
    )
  }

  const showRankButton = showRankItemtButton => {
    return (
      showRankItemButton && (
        <AddRank favStudent={student} handleRankChange={handleSetRankChange} />
      )
    );
  }

  const showRankOutcome = showRankOutcomeButton => {
    return (
      showRankOutcomeButton && (
        <div style={{display: "table-cell",
        verticalAlign: "middle"}}>
      <Form.SelectGroup pills name="japanese">
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
      </Form.SelectGroup></div>
      )
    )
  }


  const handleSetRankChange = (e) => {
      indivRank({rank: Number(e), studentId: student._id})
  };


  return (
     <div className="list-list" style={{padding: "0rem", border: "1px solid #eee"}} >
         {showRemoveButton(showRemoveItemButton)}
         <div class="d-flex flex-column">
    <div class="d-flex align-items-center mt-auto"> 
    <img src={student.videoImg} style={{height: "100px", marginRight: "1rem"}}/> 
    <div class="ml-3">
    <Link to={`/student/${student._id}`}> {student.studentid} </Link>
    {showDetails(showDetailsButton)}
    </div>
    <div class="ml-auto" style={{display:"table"}}> 
    {showRankButton(showRankItemButton)}
    {showRankOutcome(showRankOutcomeButton)}
    </div>
    </div>
    </div>
</div>
       
);
};

export default CardCheckout;
