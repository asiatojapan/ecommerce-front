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

const List = ({student}) => {

const List= styled.div`
    position: relative;
    background: #fff;
    padding: 20px 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    position: relative;
    background: #fff;
    margin-bottom: 20px;
  border: 0;
  border-radius: 12px;
  color: #323232;
  overflow: hidden;
  text-align: left;
  transition: all .2s ease-out;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.11);
  `
  const TextItem= styled.div`
  display: table;
    content: " ";
  `

  const VidImg = styled.img `
  position: relative;
  float: right;
  height: 104px;
  margin: 0 0 16px 16px;
  overflow: hidden;
  background-position: 50%;
  background-size: cover;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
   `
   const TextNoteTitle= styled.a`
   margin-bottom: 8px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: .04em;
    word-break: break-all;
    font-size: 22px;
    `
    const Tags= styled.div`
        font-size: 10px;
        `
    const Desc= styled.div`
      margin-bottom: 16px;
      line-height: 1.5;
      text-align: justify;
      word-break: break-all;
      font-size: 14px;
      `
  const Footer = styled.div`
      position: relative;
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      justify-content: space-between;
      padding: 16px 0 0;
      border-top: none;
      `
const FooterTag = styled.span`
    position: relative;
    width: calc(100% - 40px);
    overflow: hidden;
    pointer-events: auto;
    `
  const [videoThumb, setVideoThumb] = useState("");

  const getVideoThumb = () => {
    const url = "https://vimeo.com/api/v2/video/" + student.video.slice(-9) + ".json" || '';
      axios
      .get(url)
      .then((results) => {
        console.log(url)
        setVideoThumb(results.data[0].thumbnail_medium)
      })
  }
  useEffect(() => {
    getVideoThumb()
  }, []);


  const { user, token } = isAuthenticated();

  return (
    <List style={{
        borderColor: student.rec_users.indexOf(user._id)>-1 ? '#5bbaff' : 'none',
        boxShadow: student.rec_users.indexOf(user._id)>-1 ? "0 0 10px #5bbaff" : "0 1px 2px 0 rgba(0,0,0,.11)"
      }}>
    <TextItem>
    <VidImg src={`${videoThumb}`} />
    <TextNoteTitle href={`/student/${student._id}`}>   {student.comments == null?  "" : student.comments.substring(0,50) + "..." } </TextNoteTitle>
    <Desc>
    <div class="mt-1">
    <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
    </div>
    <div>
    <Icon prefix="fe" name="user" /><strong>  性別・年齢: </strong> {student.gender? "男性": "女性"}・{student.age}
    </div>
    <div>
    <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
    </div>
    <div>
    <Icon prefix="fe" name="book" />  <strong>大学・学部: </strong>{student.university}・{student.faculty} ({student.education_bg})
    </div>
    </Desc>
    </TextItem>
      <div class="tags">
    {student.it_skills.map((skill, i) => (
      <span class="tag expanded">{skill}</span>
      ))}
      </div>

    <Footer>
    <FooterTag>
    {student.tags.map((skill, i) => (
      <span>#{skill}</span>
      ))}
      </FooterTag>
    <AddFav student={student}/>
    </Footer>
    </List>

);
};

export default List;
