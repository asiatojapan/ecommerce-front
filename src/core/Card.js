import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card } from 'antd';
import  AddLike  from './AddLike';
import { FaFileDownload } from 'react-icons/fa';
import { isAuthenticated } from '../auth';

const Card2 = ({student}) => {

  const { user, token } = isAuthenticated();

  return (
      <article class="dt w-100 bb b--near-white pa4" href="#0" style={{ backgroundColor: student.rec_users.indexOf(user._id)>-1 ? '#000' : '' }}>
          <div class="dtc v-mid">
          <Link to={`/student/${student._id}`} className="f6 f5-ns fw6 pv2 db blue link dim">
          {student.comments}
          </Link>
          {student.it_skills.map((skill, i) => (
            <li class="dib">
              <div class="f7 link dim ba ph2 pv1 mb2 dib br2 dark-blue">{skill}</div>
            </li>
                ))}
            <div class="dt dt-row">
              <div class="db dtc v-mid-ns">
                <img src="http://tachyons.io/img/super-wide.jpg" alt="A bright blue sky" class="w-100 mw7 w5-ns" />
              </div>
              <div class="db dtc v-mid pr4-ns pl3-ns">
              <article class="pa1 pa0-ns" data-name="slab-stat-small">
                <h3 class="fw6 f6 ttu">ID: {student.studentid}</h3>
                <div class="cf">
                  <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd class="f6 fw4 ml0">性別・年齢</dd>
                    <dd class="f6 fw6 ml0">{student.gender === "male" ? "男" : "女"}　| {student.age}</dd>
                  </dl>
                  <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd class="f6 fw4 ml0">国籍・地域</dd>
                    <dd class="f6 fw6 ml0">{student.country === "" ? "nill" : student.country}</dd>
                  </dl>
                  <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd class="f6 fw4 ml0">大学</dd>
                    <dd class="f6 fw6 ml0">{student.university === "" ? "nill": student.university}</dd>
                  </dl>
                  <dl class="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd class="f6 fw4 ml0">日本語</dd>
                    <dd class="f6 fw6 ml0">{student.japanese === "" ? "nill": student.japanese}</dd>
                  </dl>
                  <div>
                  <a class="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma1 tc br2 pa1 " href={student.upload_fyp} title="FYP">
                    <FaFileDownload />
                    <span class="f7 ml3 pr2">Resume</span>
                  </a>
                  <a class="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma1 tc br2 pa1" href={student.upload_fyp} title="FYP">
                    <FaFileDownload />
                    <span class="f7 ml3 pr2">Resume</span>
                  </a>
                </div>
                </div>
                </article>

              </div>
              </div>
            </div>
            <div class="dtc v-mid">
              <form class="w-100 tr">
              <AddLike student={student} id={student._id}/>
              </form>
            </div>
      </article>

);
};

export default Card2;
