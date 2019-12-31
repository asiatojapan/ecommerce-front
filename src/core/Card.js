import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card } from 'antd';
import  AddLike  from './AddLike';
import ReactPlayer from 'react-player'
import { PageHeader, Menu, Dropdown, Icon, Button, Tag, Typography, Row, Descriptions } from 'antd';

const { Paragraph } = Typography;

const IconLink = ({ src, text }) => (
  <a
    style={{
      marginRight: 16,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <img
      style={{
        marginRight: 8,
      }}
      src={src}
      alt="start"
    />
    {text}
  </a>
);

const Card2 = ({student}) => {

  return (
    <PageHeader
      title={student.comments}
      style={{
        border: '1px solid rgb(235, 237, 240)',
        marginBottom: 20,
      }}
      tags={student.it_skills.map((skill, i) => (
                  <Tag color="blue" key={i}> {skill} </Tag>
            ))}
      extra={[
        <AddLike student={student} id={student._id}/>,
      ]}
      avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
    >
    <Row className="content" type="flex">
    <div
      className="extra"
      style={{
        marginRight: 30,
      }}
    >

    <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
          width='100%'
          height='100%'
        />
      </div>
    </div>
      <div className="main" style={{ flex: 1 }}>
      <Descriptions title={student.studentid}>
      <Descriptions.Item label="ID" style={{ paddingBottom: 0 }} >{student.studentid}</Descriptions.Item>
      <Descriptions.Item label="性別・年齢">{student.gender === "male" ? "男" : "女"}　| {student.age}</Descriptions.Item>
      <Descriptions.Item label="国籍・地域">{student.country}</Descriptions.Item>
      <Descriptions.Item label="大学"> {student.university} </Descriptions.Item>
      <Descriptions.Item label="IT">
        {student.it_skills.map((skill, i) => (
                    <span key={i}> {i < (skill.length - 1)? ',' : ''}{skill} </span>
              ))}
      </Descriptions.Item>
      <Descriptions.Item label="Category">
      {student.categories.map((skill, i) => (
                  <span key={i}> {i < (skill.length - 1)? ',' : ''}{skill.name} </span>
            ))}
      </Descriptions.Item>
    </Descriptions>
      <Row>
        <IconLink
          src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
          text="Resume"
        />
      </Row>
      </div>
      </Row>
    </PageHeader>

);
};

export default Card2;
