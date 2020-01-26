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

const CardStudent = ({student}) => {

  const { user, token } = isAuthenticated();

  return (
    <Card>
      <Card.Body>
          <ul className="list-unstyled list-separated">
                   <li className="list-separated-item">
                     <Grid.Row className="align-items-center">
                       <Grid.Col auto>
                         <Avatar
                           size="md"
                           className="d-block"
                           imageURL="demo/faces/female/12.jpg"
                         />
                       </Grid.Col>
                       <Grid.Col>
                         <div>
                           <a className="text-inherit" href="#">
                             {student.studentid}
                           </a>
                         </div>
                         <Text.Small muted className="d-block item-except h-1x">
                           {student.name}
                         </Text.Small>
                       </Grid.Col>
                       <Grid.Col auto>
                       <Badge color="primary" className="br-pill ba ph4 pv mb2 f6 w-100 avenir red">
                        来日決定
                      </Badge>
                       </Grid.Col>
                     </Grid.Row>
                   </li>
                 </ul>
               </Card.Body>
    </Card>


);
};

export default CardStudent;