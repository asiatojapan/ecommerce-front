import React, { useState, useEffect } from 'react';
import { readStudent, listRelated } from './apiCore';
import SiteWrapper from '../templates/SiteWrapper'
import  AddFav2  from './AddFav2';

import { isAuthenticated } from '../auth';
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Tag,
  Table,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { pdf,  Font, BlobProvider } from "@react-pdf/renderer";
import Resume from "../pdf/PersonalResume";
import fontPathRegular from '../pdf/fonts/Koruri-Regular.ttf'
import fontPathBold from '../pdf/fonts/Koruri-Bold.ttf'
import fontPathExtraBold from '../pdf/fonts/Koruri-Extrabold.ttf'
import fontPathLight from '../pdf/fonts/Koruri-Light.ttf'
import fontPathSemiBold from '../pdf/fonts/Koruri-Semibold.ttf'


Font.register( {
    family: 'Open Sans',
    src: fontPathRegular,
  });
  Font.register( {
    family: 'Lato',
    src: fontPathRegular,
  });
  Font.register( {
    family: 'Lato Italic',
    src: fontPathSemiBold,
  });
  Font.register( {
    family: 'Lato Bold',
    src: fontPathBold,
  });

const Student = props => {
    const [student, setStudent] = useState({});
    const [relatedStudent, setRelatedStudent] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const { user, token } = isAuthenticated();
    

    const loadSingleStudent = studentId => {
        readStudent(studentId, token).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setStudent(data);
                createPDF(data)
                listRelated(data._id, token).then(data => {
                  if (data.error) {
                      setError(data.error);
                  } else {
                      setRelatedStudent(data);
                      setLoading(false);
                    }
                  });
              }
          });
      };

    useEffect(() => {
        const studentId = props.match.params.studentId;
        loadSingleStudent(studentId);
    }, [props]);

    const [headerStyle, setHeaderStyle] = useState({
      transition: 'all 200ms ease-in'
    })

    
  const [resumeLink, setResumeLink] = useState();


  async function createPDF(results) {
      await pdf(<Resume studentData={results} />)
        .toBlob()
        // eslint-disable-next-line no-loop-func
        .then(blobProp => {
          setResumeLink(URL.createObjectURL(blobProp));
        });
  }

  const createPDFLinkButton = (studentData, trigger) => {
    const url  = resumeLink;
    return url ? 
      <a href={url} target="_blank">
        {trigger}
      </a> :  null
  };

    
    useScrollPosition(
      ({ prevPos, currPos }) => {
        
        const isVisible = currPos.y > 0.1
    
        const shouldBeStyle = {
          visibility: isVisible ? 'hidden' : 'visible',
          transform: isVisible ? 'none' : 'translate(0, 0)'
        }
    
        if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return
    
        setHeaderStyle(shouldBeStyle)
      },
      [headerStyle]
    )


    return (
      <SiteWrapper>
                 <div class="loading" style={{ display: loading ? "" : "none" }}>
            <div class="loaderSpin"></div>
        </div>
     
      
      <Page.Content>
      <ol class="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page"><a href={student.studentid}>{student.studentid}</a></li>
      </ol>   
        <Grid.Row>
      
      <Grid.Col width={12} lg={9} sm={12}>
      <div class="list-list" style={{padding: "0px"}}>
          <div class="d-block">
            <div className="embed-container">
              
            {student.video == null?  "" : <div><iframe src={"https://player.vimeo.com/video/" + student.video.slice(-9) + "?autoplay=1&loop=1&autopause=0"} frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> </div> }

                        </div>
                        </div>
                        <div class="card-body">
                          <h4>{student.comments}</h4>
                        </div>
                        <div class="card-footer">
                        <Tag.List>
                        {student.tags?
                          student.tags.map((skill) => (
                              <Tag color="azure">#{skill}</Tag>)) : ""}
                        </Tag.List>
                        </div>
                      </div>

                      <div class="list-list" style={{padding: "0px"}}>
                      <div class="card-header"><div class="card-title">Basic Info</div>
                      </div>
                      <div class="card-body">

                      <div class="mb-2">
                      <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="user" /><strong>  性別: </strong> {student.gender === "Male" ? "男性": "女性"}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="user" /><strong>  年齢: </strong> {student.age}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="book" />  <strong>大学: </strong>{student.university}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>学部: </strong>{student.faculty} ({student.education_bg})
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>卒業: </strong> {student.grad_year} / {student.grad_month}
                      </div>


                      { student.github ? 
                      <div class="mb-3">
                      <Icon prefix="fe" name="github" />  <strong>Github: </strong>{student.github}
                      </div> : null }

                      <div class="mb-2">
                      
                      <Tag.List>
                      {student.entry_timing?
                        student.entry_timing.map((skill) => (
                            <Tag color="secondary">{skill}</Tag>)) : ""}
                      </Tag.List>
                      </div>
                      </div>
                      </div>

                      <div class="list-list" style={{padding: "0px"}}>
                      <div class="card-header"><div class="card-title">Education</div>
                      </div>
                      <div class="card-body">
                      <div class="hr-text">研究テーマ</div>
                      <div class="mb-2 pre-wrap">　
                      {student.research}
                      </div>

                      </div>
                      </div>

                      <div class="list-list" style={{padding: "0px"}}>
                      <div class="card-header"><div class="card-title">Internship</div>
                      </div>
                      <div class="card-body">
                      <div class="mb-2 pre-wrap">　
                      {student.internship}
                      </div>
                      </div>
                      </div>



                      <div class="list-list" style={{padding: "0px"}}>
                      <div class="card-header"><div class="card-title">言語</div>
                      </div>
                      <div class="card-body">
                      <div class="mb-2">
                      <strong>日本語: </strong> {student.japanese} (JLPT: {student.jlpt})
                      </div>
                      {student.jlpt_next == null ? "":
                      <div class="mb-2">
                      <strong>次回のJLPT受験予定: </strong> {student.jlpt_next} 
                      </div>}
                      <div class="mb-2">
                      <strong>英語: </strong> {student.english}
                      </div>
                      { student.other_languages == null ?  "": 
                      <div class="mb-2">
                      <strong>Other Languages: </strong> {student.other_languages}
                      </div> }
                      </div>
                      </div>
                        
                      {student.it_skills ?
                      <div class="list-list" style={{padding: "0px"}}>
                      <div class="card-header"><div class="card-title">IT Skills</div>
                      </div>
                      <div class="card-body">
                      <Tag.List>
                      {student.it_skills ?
                        student.it_skills.map((skill) => (
                            <Tag color="secondary">{skill}</Tag>)) : ""}
                      </Tag.List>
            
                     </div>
                        </div> : ""
}
                      

                      <div class="list-list" style={{padding: "0px"}}>
                      <div class="card-header"><div class="card-title">その他PR</div>
                      </div>
                      <div class="card-body">
                      <div class="hr-text">働きたい理由</div>
                      <div class="mb-2 pre-wrap">　
                      {student.why_work_in_japan}
                      </div>
                      <div class="hr-text">その他PR</div>
                      <div class="mb-2 pre-wrap">　
                      {student.other_pr}
                      </div>
                      </div>
                      </div>


      </Grid.Col>
      
      <Grid.Col width={12} lg={3} sm={12} >
        <div>
      
      {createPDFLinkButton(
              student,
              <button class="unlikeBtn resumeGradient fullWidth" >レジュメ</button>
            )}
    
        {student.upload_fyp == null ? "":  <a href={student.upload_fyp} class="resumeGradient unlikeBtn fullWidth" style={{marginTop:"1rem"}}>
        FYP
        </a>}

        <hr/>

      <h4>この学生と似ている学生</h4>
      {relatedStudent.map((s, i) => (
          <div className="list-list" key={i} style={{padding: "0"}}> 
         
             <img src={s.videoImg} style={{height: "60px"}}/> 
             <a href={`/student/${s._id}`}>   {s.studentid} </a>
            
                        </div>
      ))}
      </div>
        </Grid.Col>
       </Grid.Row>
       
      </Page.Content>
      {user.round === "Phase II" ? null :
      <div id="application-ticket" style={{ ...headerStyle }}>
        <div class="outer" >
        <div class="inner">
        <div class="project-info">
        <div class="project-title">
        一生懸命日本語を勉強した学生にチャンスをくだいさい
        </div>
        </div>
        <div class="action-buttons">
        <div class="action-button">
           <AddFav2 student={props.match.params.studentId} /> 


        </div>
        </div>
        </div>
        </div>
        </div> }
       
    </SiteWrapper>
    );
};

export default Student;
