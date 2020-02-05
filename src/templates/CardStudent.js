import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import  AddLike  from '../core/AddLike';
import { FaFileDownload } from 'react-icons/fa';
import { isAuthenticated } from '../auth';
import InterviewItem from "./InterviewItem";
import {
  Container,
  Page,
  Grid,
  Card, Dropdown, Avatar, Text, Button, Badge
} from "tabler-react";
import {PdfDocument} from "../pdf/PdfDocument";

const CardStudent = ({interview, student}) => {

  const { user, token } = isAuthenticated();

  return (
    <Card>
      <Card.Body>
      { student.status === "来日" ?  <div class="card-status bg-green"></div>　 :　<div class="card-status bg-primary"></div>}
          <ul className="list-unstyled list-separated">
                   <li className="list-separated-item">
                     <Grid.Row className="align-items-center">

                       <Grid.Col>
                         <div>
                         <Link class="h3" to={`/student/${student._id}`} target="_blank"> {student.name} </Link>
                         </div>
                         <Text muted className="d-block item-except h-1x">
                           {student.studentid}
                         </Text>
                     </Grid.Col>
                       <Grid.Col auto>
                       {student.status === "来日" ?  <div> <span class="text-success">●</span> 来日決定　</div>:　<div><span class="text-primary">●</span> SKYPE </div>}
                       </Grid.Col>
                     </Grid.Row>
                   </li>
                 </ul>
               </Card.Body>
               { interview.interviewItems.length ? interview.interviewItems.map((item, i) =>
                 <div>
                   <InterviewItem interview={interview} item={item}/>
                 </div>
               ) : ""}
               </Card>


);
};

export default CardStudent;
