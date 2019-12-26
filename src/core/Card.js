import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card } from 'antd';
import  AddLike  from './AddLike';

const Card2 = ({student}) => {

  return (
    <div className ="student-card">
      <div className="student-card-top">
        <div className="student-card-left">
        <div className="ribbon11-wrapper">
        <h3 className="ribbon11">おすすめ！</h3>
        <h3 className="comments">
          <b>
            <Link to={`/student/${student._id}`}>{student.comments}</Link>
            </b>
        </h3>
        </div>
    </div>
  </div>

  <div class="profile">
   <div class="profile-wrap">
     <div class="profile-wrap-left">
      <div class="iframe-container">
         <iframe src="https://player.vimeo.com/video/"  frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
       </div>
      </div>
      <div class="profile-wrap-center">

        <div class="profile-info-box">
          <div class="profile-info">
            <dt> ID　</dt>
            <dd> {student.studentid} </dd>
          </div>

          <div class="profile-info">
            <dt> 性別・年齢　</dt>
            <dd> {student.gender} | {student.age} </dd>
          </div>

          <div class="profile-info">
            <dt> 国籍・地域　</dt>
            <dd> {student.country} </dd>
          </div>

          <div class="profile-info">
            <dt> 大学　</dt>
            <dd> {student.university} </dd>
          </div>

          <div class="profile-info">
            <dt> IT　</dt>
            <dd>{student.it_skills.map((skill, i) => (
                  <span key={i}> {i < (skill.length - 1)? ',' : ''}{skill} </span>
            ))}
            </dd>
            <AddLike student={student} id={student._id}/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Card2;
