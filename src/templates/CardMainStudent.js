import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import  AddLike  from '../core/AddLike';
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
      <Card.Body>
          <ul className="list-unstyled list-separated">
                   <li className="list-separated-item">
                     <Grid.Row className="align-items-center">
                       <Grid.Col>
                         <div>
                         <Link class="h2" to={`/student/${student._id}`}> {student.studentid} </Link>
                         </div>
                       </Grid.Col>
                       <Grid.Col auto>
                         <AddLike student={student} id={student._id}/>
                       </Grid.Col>
                     </Grid.Row>
                   </li>
                 </ul>
               </Card.Body>
                {student.status === "来日" ?  <div class="card-alert alert alert-success mb-0">　<i class="fe fe-check-circle"></i>　来日決定　</div>　 :　"" }
    </Card>


);
};

export default CardMainStudent;
