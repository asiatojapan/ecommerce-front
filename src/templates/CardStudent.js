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

const CardStudent = ({student, interview}) => {

  const { user, token } = isAuthenticated();

  const coming = student.map(function(element, index, array) {
    if (element.status =="来日")
      return true
  });


  return (
    <Card>
      <Card.Body>
      { coming === true ?  <div class="card-status bg-green"></div>　 :　<div class="card-status bg-primary"></div>}
          <ul className="list-unstyled list-separated">
                   <li className="list-separated-item">
                     <Grid.Row className="align-items-center">

                       <Grid.Col>
                         <div>
                         <Link class="h3" to={`/student/${student._id}`}> {student.map((s, i) => <div> {s.name}</div>)} </Link>
                         </div>
                         <Text muted className="d-block item-except h-1x mb-2">
                           {student.name}
                         </Text>
                            {student.status === "来日" ?  <div> <span class="text-success">●</span> 来日決定　</div>:　<div><span class="text-primary">●</span> SKYPE </div>}
                       </Grid.Col>
                       <Grid.Col auto>
                        <strong> {interview.phase} </strong><br/>
                       <Link to={`/student/${interview._id}/interviews/`}> View Interview </Link>
                       </Grid.Col>
                     </Grid.Row>
                   </li>
                 </ul>
               </Card.Body>
               </Card>


);
};

export default CardStudent;
