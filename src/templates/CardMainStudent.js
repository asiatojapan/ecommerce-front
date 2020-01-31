import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import  AddFav from '../core/AddFav';
import { FaFileDownload } from 'react-icons/fa';
import { isAuthenticated } from '../auth';
import {
  Container,
  Page,
  Grid,
  Card, Dropdown, Avatar, Text, Button, Badge
} from "tabler-react";
import {PdfDocument} from "../pdf/PdfDocument";

const CardMainStudent = ({student}) => {

  const { user, token } = isAuthenticated();

  return (
    <Card>
    <div class="card-body">
                    <div class="row row-sm align-items-center">
                      <div class="col-auto">
                        <span class="avatar avatar-lg"></span>
                      </div>
                      <div class="col">
                        <h4 class="card-title m-0">
                          <Link class="h2" to={`/student/${student._id}`}> {student.studentid} </Link>
                        </h4>
                        <div class="text-muted">
                        {student.comments}
                        </div>
                        <div class="small mt-1">
                          {student.status === "来日" ? <div> <span class="text-success">●</span> <text class="text-success"> 来日決定 </text> </div>　: ""}
                        </div>
                      </div>
                  <div class="col-auto">
                  <AddFav student={student}/>
              </div>
            </div>
          </div>
        </Card>


);
};

export default CardMainStudent;
