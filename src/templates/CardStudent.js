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

const CardStudent = ({interview, student}) => {

  const { user, token } = isAuthenticated();

  return (
    <div class="list-list" style={{backgroundColor: "#fff", padding: "0"}}>
      <div class="row">
        <img src={student.videoImg} style={{height: "100px", marginRight: "1rem"}}/> 
      
          <ul className="list-unstyled list-separated" style={{margin: "0"}}>
                   <li className="list-separated-item">
                     <Grid.Row className="align-items-center">
                       <Grid.Col>
                       <Text className="d-block item-except h-1x">
                           {student.studentid}
                         </Text>
                         <div>
                         <Link class="h3" to={`/student/${student._id}`} target="_blank"> {student.name} </Link>
                         </div>
                     </Grid.Col>
                       <Grid.Col auto>
                       {student.status === "来日" ?  <div> <span class="text-success">●</span> 来日決定　</div>:　<div><span class="text-primary"></span> </div>}
                       </Grid.Col>
                     </Grid.Row>
                   </li>
                 </ul>
                 </div>
               { interview.interviewItems.length ? interview.interviewItems.map((item, i) =>
                 <div>
                   <InterviewItem interview={interview} item={item}/>
                 </div>
               ) : ""}
               
               </div>


);
};

export default CardStudent;
