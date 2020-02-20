import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card } from 'antd';
import  AddLike  from './AddLike';
import  AddFav  from './AddFav';
import { FaFileDownload } from 'react-icons/fa';
import { isAuthenticated } from '../auth';
import styled from 'styled-components'
import axios from 'axios';

const Card2 = ({student}) => {

  const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  `
  const CardBody = styled.div`
  padding: 10px;

  `
  const HeaderTitle = styled.a`
    margin-bottom: 8px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: .04em;
    word-break: break-all;
    -webkit-font-feature-settings: "palt" 1;
    font-feature-settings: "palt" 1;
    font-size: 15px;
    color: #000;

  `
  const VidImg = styled.img `
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    z-index: 1;
    transition: all 0.3s ease-in-out;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
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
    <Card>
    <VidImg src={`${videoThumb}`} />
    <CardBody>
    <HeaderTitle href={`/student/${student._id}`}>   {student.comments == null?  "" : student.comments.substring(0, 50) + "..." }
    </HeaderTitle>
    </CardBody>
    </Card>

);
};

export default Card2;
