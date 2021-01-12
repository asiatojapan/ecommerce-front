import React, { useState, useEffect } from 'react';
import { readStudentDetails } from '../core/apiCore';
import { isAuthenticates } from '../auth';
import {
  Container,  
  Icon,
  Grid,
  Tag,
} from "tabler-react";
import { pdf,  Font } from "@react-pdf/renderer";
import Resume from "../pdf/RealResume";
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

const RealStudent = (props) => {
    const [student, setStudent] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const { darwin_uid, darwin_myTk } = isAuthenticates();
 
    const loadSingleStudent = studentId => {
        readStudentDetails(studentId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setStudent(data);
                createPDF(data)
              }
          });
      };

    useEffect(() => {
        const studentId = props.match.params.studentId;
        loadSingleStudent(studentId);
    }, [props]);

  const [resumeLink, setResumeLink] = useState();
  const [blob, setBlob] = useState()

  const createPDFLinkButton1 = (studentData, trigger) => {
    const url = blob;
    if (window.navigator.msSaveOrOpenBlob) {
      return url ? 
      window.navigator.msSaveOrOpenBlob(url, student.studentid + ".pdf") :  null }
  };


  async function createPDF(results) {
    await pdf(<Resume studentData={results} />)
      .toBlob()
      // eslint-disable-next-line no-loop-func
      .then(blobProp => {
        setBlob(blobProp)
        setResumeLink(URL.createObjectURL(blobProp));
        setLoading(false)
      });
}

    const createPDFLinkButton = (studentData, trigger) => {
      const url  = resumeLink;
      return url ? 
        <a href={url} className="link" target="_blank">
          {trigger}
        </a> :  null
    };



    return (
      <div style={{backgroundColor: "#eee"}}>

      <div class="loading" style={{ display: loading ? "" : "none" }}>
            <div class="loaderSpin"></div>
        </div>
      <Container>

      <div style={{padding: "20px"}}>
        <Grid.Row>
      <Grid.Col width={12} lg={9} sm={12}>

                

                      <div class="list-list" style={{padding: "0px"}}>
                      <div class="card-header"> <div class="card-title"><strong>{student.studentid}:</strong> {student.name}</div></div>
                      
                      <div class="card-body">

                      <div class="mb-2">
                      <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="user" /> <strong>Name: </strong> {student.name}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="user" /><strong> 性別: </strong> {student.gender === "Male" ? "男性": student.gender === "male" ? "男性": "女性" }
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="user" /><strong>  年齢: </strong> {student.age}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="mail" />  <strong>Email: </strong>{student.email}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="at-sign" />  <strong>Skype ID: </strong>{student.skype}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="home" />  <strong>Address: </strong>{student.address}
                      </div>

                      <hr/>
                      <div class="mb-2">
                      <Icon prefix="fe" name="book" />  <strong>大学: </strong>{student.university}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>学部: </strong>{student.faculty} ({student.education_bg})
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>学科: </strong>{student.major}
                      </div>
                      <div class="mb-2">
                      <Icon prefix="fe" name="book-open" />  <strong>卒業: </strong> {student.grad_year} / {student.grad_month}
                      </div>
                      
                      { student.github ? 
                      <div class="mb-4">
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

                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">Education</div>
                      </div>
                      <div className="card-body">
                      {student.qualification ? "" :
                      <> 
                      <div className="hr-text">学歴備考</div>
                      <div className="mb-2 pre-wrap">　
                      {student.qualification}
                      </div> 
                      </>}
                      <div className="hr-text">研究テーマ</div>
                      <div className="mb-2 pre-wrap">　
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


      
                      <Grid.Col width={12} lg={3} sm={12}>
                      <div class="list-list" style={{padding: "0px"}}>
                      <div class="card-header"><div class="card-title">Downloads</div>
                      </div>

                      <div class="card-body">
                      {student.codeToJapan == null || student.codeToJapan == undefined || student.codeToJapan == "" ? "" :  
                        <a className="link" target="_blank" href={student.codeToJapan} className="resumeGradient unlikeBtn fullWidth" style={{marginBottom:"1rem"}}>
                      <i class="fe fe-download" style={{marginRight: "5px"}}></i>【CODE TO JAPAN】<br/> AI Contest Result 
                      </a>}

                      {student.codeToJapanAlgorithm == null || student.codeToJapanAlgorithm == undefined || student.codeToJapanAlgorithm == "" ? "" :  
                                      <a className="link" target="_blank" href={student.codeToJapanAlgorithm} className="resumeGradient unlikeBtn fullWidth" style={{marginBottom:"1rem"}}>
                      <i class="fe fe-download" style={{marginRight: "5px"}}></i>【CODE TO JAPAN】<br/> Algorithm Contest Result 
                      </a>}


                      {window.navigator.msSaveOrOpenBlob ? <button className="resumeGradient unlikeBtn fullWidth" style={{marginBottom:"1rem"}} onClick={()=> createPDFLinkButton1()}> <i class="fe fe-download" style={{marginRight: "5px"}}>{" "}</i>  RESUME</button> :  <> {createPDFLinkButton(student,
                        <button className="unlikeBtn resumeGradient fullWidth" >  <i class="fe fe-download" style={{marginRight: "5px"}}>{" "}</i>  RESUME</button>
                      )} </>}

    
                      {student.upload_fyp == null ? "":  <a href={student.upload_fyp} class="resumeGradient unlikeBtn fullWidth" style={{marginTop:"1rem"}}>
                          FYP
                          </a>}
                      </div>
                      </div>
                 </Grid.Col>
              </Grid.Row>
              </div>
              </Container>
              </div>
    );
};

export default RealStudent;
