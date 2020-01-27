import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card } from 'antd';
import  AddLike  from './AddLike';
import { FaFileDownload } from 'react-icons/fa';
import { isAuthenticated } from '../auth';

import {PdfDocument} from "../pdf/PdfDocument";

const Card2 = ({student}) => {

  const { user, token } = isAuthenticated();

  return (

    <div class="card">
    <div class="card-header">
   {student.rec_users.indexOf(user._id)>-1 ? <div class="card-status bg-blue card-status-left"></div> : "" }
    <h3 class="card-title">{student.comments}</h3>
    <div class="card-options">
      <AddLike student={student} id={student._id}/>
    </div>
    </div>
    <div class="card-body">
    <div class="table-responsive">
    <table class="table card-table table-vcenter">
    <tbody class>
    <tr class="">
    <td class="">
    <img alt="" src="https://tabler.github.io/tabler/demo/products/apple-iphone7-special.jpg" class="h-8" / >
    </td>
    <td class="d-none d-md-table-cell text-nowrap"><h6 class="h6 mt-0 mb-0">{student.studentid} </h6>{student.gender === "male" ? "男" : "女"} | {student.age}</td>
    <td class="d-none d-md-table-cell text-nowrap"><h6 class="h6 mt-0 mb-0">国籍</h6>{student.country === "" ? "nill" : student.country}</td>
    <td class="d-none d-md-table-cell text-nowrap"><h6 class="h6 mt-0 mb-0">大学</h6>{student.university === "" ? "nill": student.university}</td>
    <td class="d-none d-md-table-cell text-nowrap"><h6 class="h6 mt-0 mb-0">日本語</h6>{student.japanese === "" ? "nill": student.japanese}</td>
    <td class="d-none d-md-table-cell text-nowrap"><h6 class="h6 mt-0 mb-0">英語</h6>{student.english === "" ? "nill": student.english}</td>
    <td class="text-right"><strong><PdfDocument student={student}/></strong></td></tr>
    </tbody>
    </table>
    </div>
    </div>
    <div class="card-footer">
    <div class="tags">
    {student.it_skills.map((skill, i) => (
      <span class="tag expanded">{skill}</span>
      ))}
      </div>
    </div>
    </div>

);
};

export default Card2;
