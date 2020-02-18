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
  Card, Dropdown, Avatar, Text, Button, Badge
} from "tabler-react";
import {PdfDocument} from "../pdf/PdfDocument";

const CardCheckout = ({student,indivRank,
  showRemoveItemButton = false,
  showRankItemButton = false,
  cartUpdate = false,
  setRun = f => f,
  run = undefined}) => {

  const { user, token } = isAuthenticated();

  const [redirect, setRedirect] = useState(false);

  const showRemoveButton = showRemoveItemtButton => {
    return (
      showRemoveItemButton && (
        <span
          onClick={() => {
            destroyFav(student._id, user, token);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="close"
        >
        </span>
      )
    );
  }

  const showRankButton = showRankItemtButton => {
    return (
      showRankItemButton && (
        <AddRank favStudent={student} handleRankChange={handleSetRankChange} />
      )
    );
  }


  const handleSetRankChange = (e) => {
      indivRank({rank: Number(e), studentId: student._id})
  };


  return (
     <div className="list-list" style={{padding: "1rem", border: "1px solid #eee"}} >
         {showRemoveButton(showRemoveItemButton)}
                    <div class="row row-sm align-items-center">
                      <div class="col">
                        <h4 class="card-title mb-2">
                          <Link to={`/student/${student._id}`}> {student.studentid} </Link>
                        </h4>
                        <div className="list-Desc" style={{marginBottom: "0px"}}>
                        <div>
                        <Icon prefix="fe" name="user" /><strong>  性別・年齢: </strong> {student.gender === "male" ? "男性": "女性"}・{student.age}
                        </div>
                        <div>
                        <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
                        </div>
                        </div>
                           
                      </div>
                  <div class="col-auto">
                  {showRankButton(showRankItemButton)}
              </div>
            </div>
          </div>
);
};

export default CardCheckout;
