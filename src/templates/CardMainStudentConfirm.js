import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import  AddFav from '../core/AddFav';
import  AddRank from '../core/AddRank';
import { createFav, destroyFav,readStudent } from "../core/apiCore";
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

const CardMainStudentConfirm = ({student, indivRank }) => {

  const { user, token } = isAuthenticated();


  const handleSetRankChange = (e) => {
      indivRank({rank: e, studentId: student._id})
  };

  const clickDelete = e => {
    e.preventDefault();
    destroyFav(student._id, user, token);
};


  return (
     <div className="list-list" ><a onClick={clickDelete} className="close"></a> 
                    <div class="row row-sm align-items-center">
                      <div class="col">
                        <h4 class="card-title mb-2">
                          <Link to={`/student/${student._id}`}> {student.studentid} </Link>
                        </h4>
                        <div className="list-Desc">
                        <div>
                        <Icon prefix="fe" name="user" /><strong>  性別・年齢: </strong> {student.gender === "male" ? "男性": "女性"}・{student.age}
                        </div>
                        <div>
                        <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
                        </div>
                        </div>
                          {student.status === "来日" ? <div> <span class="text-success">●</span> <text class="text-success"> 来日決定 </text> </div>　: ""}
                       
                      </div>
                  <div class="col-auto">
              </div>
            </div>
          </div>
);
};

export default CardMainStudentConfirm;
