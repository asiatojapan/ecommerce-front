import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card } from 'antd';
import  AddFav  from './AddFav';
import { FaFileDownload } from 'react-icons/fa';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { isAuthenticated } from '../auth';
import styled from 'styled-components'
import {
  Icon,
} from "tabler-react";


const VidImg = styled.img `
  sposition: relative;
    float: right;
    height: 104px;
    margin: 0 0 16px 16px;
    overflow: hidden;
    background-position: 50%;
    background-size: cover;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
`

const List = ({student, setFavCount,
  favCount}) => {


  const handleSetFavCount = e => {
    setFavCount(e);
  };

  const { user, token } = isAuthenticated();

  return (
    <div className="list-list" style={{
        borderColor: student.rec_users.indexOf(user._id)>-1 ? '#5bbaff' : 'none',
        boxShadow: student.rec_users.indexOf(user._id)>-1 ? "0 0 10px #5bbaff" : ""
      }}>
        {student.videoImg == null?  "" : <img class="list-VidImg" src={`${student.videoImg}`} /> }
    <div className="list-TextItem">
    <a className="list-TextNoteTitle" href={`/student/${student._id}`}>   {student.comments == null?  "" : student.comments.substring(0,50) + "..." } </a>

    <div className="list-Desc">
    <div class="mt-1">
    <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
    </div>
    <div>
    <Icon prefix="fe" name="user" /><strong>  性別・年齢: </strong> {student.gender === "male" ? "男性": "女性"}・{student.age}
    </div>
    <div>
    <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
    </div>
    <div>
    <Icon prefix="fe" name="book" />  <strong>大学・学部: </strong>{student.university}・{student.faculty} ({student.education_bg})
    <div>
    <Icon prefix="fe" name="book" />  <strong>日本語: </strong>{student.japanese}・{student.jlpt === "None" ? "" : <span>{"JLPT: " + student.jlpt}</span>}
    </div>
    </div>
    </div>
    </div>
      <div class="tags">
    {student.it_skills.map((skill, i) => (
      <span class="tag expanded">{skill}</span>
      ))}
      </div>

      <div className="list-Footer">
      <div className="list-FooterTag tags">
     {student.tags.map((skill, i) => (
      <span class="tag expanded tag-blue">#{skill}</span>
      ))}
      </div>
    <AddFav student={student} setFavCount={handleSetFavCount}
            favCount={favCount} />
    </div>
    </div>

);
};

export default List;
