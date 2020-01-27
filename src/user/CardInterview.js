import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card } from 'antd';
import { FaFileDownload } from 'react-icons/fa';
import { isAuthenticated } from '../auth';

const CardInterview = ({student}) => {

  const { user, token } = isAuthenticated();

  return (
    <ul>
    <li class="pa2 pa2-ns ba b--black-10">
    <div class="cf dt w-100">
    <div class="dtc v-mid mr3 w3">
          <img src="http://mrmrs.github.io/images/0010.jpg" class="db w-100 "/>
        </div>
      <div class="dtc v-mid pl3">
      <div class="fl">
        <div class="fw6 f3 fl w-100 black-100 mt0 avenir">#{student.studentid}</div>
        <b class="black f4">{student.name}</b>
      </div>
        </div>
        <div class="dtc v-mid mr3">
        <div class="fr">
        <h1 class="br-pill ba ph4 pv mb2 f6 w-100 avenir red"> 来日決定</h1>
        </div>
      </div>
      </div>
    </li>
    </ul>
  );
};

export default CardInterview;
