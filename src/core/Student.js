import React, { useState, useEffect } from 'react';
import { readStudent, listRelated } from './apiCore';
import SiteWrapper from '../templates/SiteWrapper'
import  AddFav2  from './AddFav2';
import {  isAuthenticates } from '../auth';
import { Page, Icon, Grid, Tag } from "tabler-react";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { pdf,  Font, BlobProvider } from "@react-pdf/renderer";
import Resume from "../pdf/PersonalResume";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import fontPathRegular from '../pdf/fonts/Koruri-Regular.ttf'
import fontPathBold from '../pdf/fonts/Koruri-Bold.ttf'
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


const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

interface RouterProps {
  match: any;
}

type Props = RouterProps;


const Student = ({ logout, session, match }: Props) => {
    const [student, setStudent] = useState({});
    const [relatedStudent, setRelatedStudent] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    
    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const loadSingleStudent = () => {
       // console.log(studentId)
        readStudent(match.params.studentId, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setStudent(data);
                createPDF(data)
                listRelated(data._id, darwin_myTk).then(data => {
                  if (data.error) {
                      setError(data.error);
                  } else {
                      setRelatedStudent(data);
                    }
                  });
              }
          });
      };

    function _calculateAge(dateString) { // birthday is a date
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    }

    useEffect(() => {
        loadSingleStudent();
    }, []);

    const [headerStyle, setHeaderStyle] = useState({
      transition: 'all 200ms ease-in'
    })

    
  const [resumeLink, setResumeLink] = useState();


  async function createPDF1(results) {
      await pdf(<Resume studentData={results} />)
        .toBlob()
        // eslint-disable-next-line no-loop-func
        .then(blobProp => {
          setResumeLink(URL.createObjectURL(blobProp, {type: "application/pdf"}));
        });
        setLoading(false)
  }

  async function createPDF(results) {
    await pdf(<Resume studentData={results} />)
      .toBlob()
      // eslint-disable-next-line no-loop-func
      .then(blobProp => {
        console.log(blobProp)
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
            window.navigator.msSaveOrOpenBlob(blobProp, results.studentid);
        } else { // for Non-IE (chrome, firefox etc.)
            setResumeLink(URL.createObjectURL(blobProp, {type: "application/pdf"}));
        }
      });
      setLoading(false)

}

  const createPDFLinkButton = (studentData, trigger) => {
    const url  = resumeLink;
    return url ? 
    
      <a className="link" href={url} target="_self" >
        {trigger}
      </a> :  null
  };

  const download = () => {
    // ダウンロードしたいコンテンツ、MIMEType、ファイル名
    var content  = 'abc';
    var mimeType = 'text/plain';
    var name     = 'test.txt';
  
    // BOMは文字化け対策
    var bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var blob = new Blob([bom, content], {type : mimeType});
  
    var a = document.createElement('a');
    a.download = name;
    a.target   = '_blank';
  
    if (window.navigator.msSaveBlob) {
      // for IE
      window.navigator.msSaveBlob(blob, name)
    }
    else if (window.URL && window.URL.createObjectURL) {
      // for Firefox
      a.href = window.URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    else if (window.webkitURL && window.webkitURL.createObject) {
      // for Chrome
      a.href = window.webkitURL.createObjectURL(blob);
      a.click();
    }
    else {
      // for Safari
      window.open('data:' + mimeType + ';base64,' + window.Base64.encode(content), '_blank');
    }
  }

    
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
        <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
     
      
      <Page.Content>
      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item active" aria-current="page"><a className="link" href={student.studentid}>{student.studentid}</a></li>
      </ol>   
        <Grid.Row>
      
      <Grid.Col width={12} lg={9} sm={12}>
      <div className="list-list" style={{padding: "0px"}}>
          <div className="d-block">
            <div className="embed-container">
                   {student.video == null?  "" : <div><iframe src={"https://player.vimeo.com/video/" + student.video.slice(-9) + "?autoplay=1&loop=1&autopause=0"} frameBorder="0" allowFullScreen></iframe> </div> }

                        </div>
                        </div>
                        <div className="card-body">
                          <h4>{student.comments}</h4>
                        </div>
                        <div className="card-footer">
                        <Tag.List>
                        {student.tags?
                          student.tags.map((skill, i) => (
                              <Tag key={i} color="azure">#{skill}</Tag>)) : ""}
                        </Tag.List>
                        </div>
                      </div>

                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">Basic Info</div>
                      </div>
                      <div className="card-body">

                      <div className="mb-2">
                      <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="user" /><strong>  性別: </strong> {student.gender === "Male" ? "男性": "女性"}
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="user" /><strong>  年齢: </strong>  {_calculateAge(student.dob)}
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="book" />  <strong>大学: </strong>{student.university}
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>学部: </strong>{student.faculty} ({student.education_bg})
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>学科: </strong>{student.major}
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>卒業: </strong> {student.grad_year} / {student.grad_month}
                      </div>


                      { student.github ? 
                      <div className="mb-3">
                      <Icon prefix="fe" name="github" />  <strong>Github: </strong>{student.github}
                      </div> : null }

                      <div className="mb-2">
                      
                      <Tag.List>
                      {student.entry_timing?
                        student.entry_timing.map((skill, i) => (
                            <Tag key={i} color="secondary">{skill}</Tag>)) : ""}
                      </Tag.List>
                      </div>
                      </div>
                      </div>

                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">Education</div>
                      </div>
                      <div className="card-body">
                      {student.qualification ? 
                      <> 
                      <div className="hr-text">学歴備考</div>
                      <div className="mb-2 pre-wrap">　
                      {student.qualification}
                      </div> 
                      </> : null}
                      <div className="hr-text">研究テーマ</div>
                      <div className="mb-2 pre-wrap">　
                      {student.research}
                      </div>
                      </div>
                      </div>
                      
                      {student.internship ? 
                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">Internship</div>
                      </div>
                      <div className="card-body">
                      <div className="mb-2 pre-wrap">　
                      {student.internship}
                      </div>
                      </div>
                      </div> : ""}



                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">言語</div>
                      </div>
                      <div className="card-body">
                      <div className="mb-2">
                      <strong>日本語: </strong> {student.japanese} (JLPT: {student.jlpt})
                      </div>
                      {student.jlpt_next ? 
                      <div className="mb-2">
                      <strong>次回のJLPT受験予定: </strong> {student.jlpt_next} 
                      </div>: ""}
                      <div className="mb-2">
                      <strong>英語: </strong> {student.english}
                      </div>
                      { student.other_languages ?  
                      <div className="mb-2">
                      <strong>その他言語: </strong> {student.other_languages}
                      </div> : "" }
                      </div>
                      </div>
                        
                      {student.it_skills ?
                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">IT Skills</div>
                      </div>
                      <div className="card-body">
                      <Tag.List>
                      {student.it_skills ?
                        student.it_skills.map((skill,i) => (
                            <Tag key={i} color="secondary">{skill}</Tag>)) : ""}
                      </Tag.List>
                      <div className="hr-text">Other IT Skills</div>
                      <div className="mb-2 pre-wrap">　
                      {student.other_it_skills}
                      </div>
                     </div>
                     </div> : ""
                      }
                      

                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">その他PR</div>
                      </div>
                      <div className="card-body">
                      <div className="hr-text">働きたい理由</div>
                      <div className="mb-2 pre-wrap">　
                      {student.why_work_in_japan}
                      </div>
                      <div className="hr-text">その他PR</div>
                      <div className="mb-2 pre-wrap">　
                      {student.other_pr}
                      </div>
                      </div>
                      </div>


      </Grid.Col>
      
      <Grid.Col width={12} lg={3} sm={12} >
        <div>
          <button onClick={download()}>a</button>
          {createPDFLinkButton(student,
              <button className="unlikeBtn resumeGradient fullWidth" >  <i class="fe fe-download" style={{marginRight: "5px"}}>{" "}</i>  RESUME</button>
            )}
        {student.upload_fyp == null ? "" :  <a className="link" href={student.upload_fyp} className="resumeGradient unlikeBtn fullWidth" style={{marginTop:"1rem"}}>
        <i class="fe fe-download" style={{marginRight: "5px"}}></i> RESEARCH / REPORT
        </a>}

        <hr/>

      <h4>この学生と似ている学生</h4>
      {relatedStudent.map((s, i) => (
          <div className="list-list" key={i} style={{padding: "0"}}> 
         
             <img src={s.videoImg} style={{height: "60px"}}/> 
             <a className="link" href={`/student/${s._id}`} style={{fontSize: "16px", padding: "10px", fontWeight: "600"}}> {s.studentid} </a>
               </div>
             ))}
      </div>
        </Grid.Col>
       </Grid.Row>
       
      </Page.Content>
      {session.round === "Phase II" ? null :
      <div id="application-ticket" style={{ ...headerStyle }}>
        <div className="outer" >
          <div className="inner">
            <div className="project-info">
            <div className="project-title">
            一生懸命日本語を勉強した学生にチャンスをください
            </div>
          </div>
         <div className="action-buttons">
        <div className="action-button">
           <AddFav2 student={match.params.studentId} /> 
        </div>
        </div>
        </div>
        </div>
        </div> }
       
    </SiteWrapper>
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
