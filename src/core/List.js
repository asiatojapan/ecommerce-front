import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card } from 'antd';
import  AddFav  from './AddFav';
import { FaFileDownload } from 'react-icons/fa';
import { isAuthenticated } from '../auth';
import styled from 'styled-components'
import {PdfDocument} from "../pdf/PdfDocument";
import axios from 'axios';
import {
  Icon,
} from "tabler-react";

const List = ({student, setFavCount,
  favCount}) => {

  const [videoThumb, setVideoThumb] = useState("");

  const getVideoThumb = () => {
    const url = "https://vimeo.com/api/v2/video/" + student.video.slice(-9) + ".json" || '';
      axios
      .get(url)
      .then((results) => {
        setVideoThumb(results.data[0].thumbnail_medium)
      })
  }
  useEffect(() => {
  }, []);

  function VideoThumbnail(video) {
    const videothumb = "gello"
    
    function getThumb() {
    const url = "https://vimeo.com/api/v2/video/" + video.video.slice(-9) + ".json" || '';
      axios
      .get(url)
      .then((results) => {
        return (results.data[0].thumbnail_medium)
      })}
    return ( 
      <img src={getThumb()} />
    )
  }

  const handleSetFavCount = e => {
    setFavCount(e);
  };

  const { user, token } = isAuthenticated();

  return (
    <div className="list-list" style={{
        borderColor: student.rec_users.indexOf(user._id)>-1 ? '#5bbaff' : 'none',
        boxShadow: student.rec_users.indexOf(user._id)>-1 ? "0 0 10px #5bbaff" : ""
      }}>
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
