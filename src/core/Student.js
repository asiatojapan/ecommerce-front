import React, { useState, useEffect } from 'react';
import { readStudent, listRelated,  updateStudentRatings } from './apiCore';
import { getInterviewsByStudent } from '../interview/apiInterview';
import { readStudentBestJobs } from '../matching/apiMatching';
import SiteWrapper from '../templates/SiteWrapper'
import  AddFav2  from './AddFav2';
import  UpdateStudentRatings  from '../admin/UpdateStudentRatings';
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
import {HorizontalBar} from 'react-chartjs-2';
import moment from "moment";
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

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

interface RouterProps {
  match: any;
}

type Props = RouterProps;


const Student = ({ session, match }: Props) => {

    const ratingChanged = (ratings) => {
      updateStudentRatings(match.params.studentId, ratings, darwin_uid, darwin_myTk, ratings).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setError("");
          }
      });
    };

    const [student, setStudent] = useState({});
    const [relatedStudent, setRelatedStudent] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [blob, setBlob] = useState()
    const [labelPoints, setLabelPoints] = useState([]);
    const [points, setPoints] = useState([]);
    const [currentInterviews, setCurrentInterviews] = useState([]);

    
    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const loadCurrentInterviews = () => {
      getInterviewsByStudent(match.params.studentId, darwin_myTk).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
          setCurrentInterviews(data)
        }
      })
    }

    const loadSingleStudent = () => {
       // console.log(studentId)
        readStudent(match.params.studentId, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setStudent(data);
                // console.log(data)
                createPDF(data)
                listRelated(data._id,  darwin_uid, darwin_myTk).then(data => {
                  if (data.error) {
                      setError(data.error);
                  } else {
                      setRelatedStudent(data);
                    }
                  });
              }
          });

          readStudentBestJobs(match.params.studentId, darwin_myTk).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                data.map(function(e) {
                  setLabelPoints(labelPoints => [...labelPoints, e.jobName])
                });
                data.map(function(e) {
                  setPoints(points => [...points, e.points])
                });
            }})
     };

     const resultInNice = (result) => {
      if (result === "Nil") {
          return ""
      }
      else if (result === "合格") {
          return "●"
      }
      else if (result === "不合格") {
          return "X"
      }
      else if (result === "三角") {
          return "▲"
      }
      else if (result === "辞退") {
          return "辞退"
      }
      else if (result === "内定") {
          return "内定"
      }
      else {
          return ""
      }
    }

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
        loadCurrentInterviews();
    }, []);

    const [headerStyle, setHeaderStyle] = useState({
      transition: 'all 200ms ease-in'
    })

    
  const [resumeLink, setResumeLink] = useState();



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
      var isSafari = window.safari !== undefined;
      if (isSafari) {
        return url ? 
         window.open(url, '_blank') : null
      }
      if (window.navigator.msSaveOrOpenBlob) {
        return url ? 
        window.navigator.msSaveOrOpenBlob(url, student.studentid + ".pdf") :  null }
      else {
        return url ? 
        window.open(url, '_blank') : null }
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


   const dataPoints = {
      labels: labelPoints,
      datasets: [{
      label: "",
      backgroundColor: '#278bfa',
      borderColor: '#278bfa',
      borderWidth: 1,
      data: points
      }]
  }

  const legendOpts = {
    display: false,
  };


    return (
      <SiteWrapper>
        <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
      <Page.Content>
      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item active" aria-current="page">{student.studentid}</li>
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
                        <br/>
                        {student.inJapan === true ? <span className="tag expanded tag-red" style={{marginRight: "5px"}}> 日本在住 </span> : null }
                        </div>
                      </div>

                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">Basic Info</div>
                      </div>
                      <div className="card-body">

                      { session.role === 1 || session.role === 4 ? 
                      <>
                        <div className="mb-2"> 
                        <Icon prefix="fe" name="user" /> <strong>名前: </strong> {student.name}
                        </div> 
                        <div className="mb-2"> 
                        <Icon prefix="fe" name="user" /> <strong>メール: </strong> {student.email}
                        </div>
                        <div className="mb-2"> 
                        <Icon prefix="fe" name="user" /> <strong>Skype ID: </strong> {student.skype}
                        </div> </>
                          : null 
                      }
                      <div className="mb-2"> 
                      <Icon prefix="fe" name="book" /> <strong>ID: </strong> {student.studentid}
                      </div>
                      <div className="mb-2">
                      <Icon prefix="fe" name="user" /><strong>  性別: </strong> {student.gender === "Male" ? "男性": student.gender === "male" ? "男性": "女性" }
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
                        
                      {student.it_skills?
                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">IT Skills</div>
                      </div>
                      <div className="card-body">
                      <Tag.List>
                      {student.it_skills ?
                        student.it_skills.map((skill,i) => (
                            <Tag key={i} color="secondary">{skill}</Tag>)) : null}
                      </Tag.List>
                      <div className="hr-text">Other IT Skills</div>
                      <div className="mb-2 pre-wrap">　
                      {student.other_it_skills}
                      </div>
                     </div>
                     </div> : null
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

                      { session.role === 1 || session.role === 4 ? 
                      <> 
  <div className="list-list" style={{padding: "0px"}}>
          <div className="card-header">
            <div className="card-title">面接</div>
          </div>
          <div className="card-body" style={{padding: "0px"}}>
              <div class="table-responsive-sm">
                  <table class="table card-table table-striped" style={{fontSize: "10px"}}>
                        <thead>
                            <tr>
                            <th>会社名 </th>
                            <th>Status</th>
                            <th>Event</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead> 
                        
                        <tbody>{currentInterviews.map((interview,i) => 
                        <tr> 
                            <td>
                            <Link to={`/admin/profile/${interview.company._id}`} target="_blank">{interview.company.name}</Link>
                      
                            </td>
                          <td>
                              {interview.status}
                            </td>
                            <td>{ moment(interview.eventDay).format('YYYY/MM')} </td>
                                {interview.interviewItems.length === 0 ? 
                            <> 
                            <td></td><td></td>
                            <td></td><td></td>
                            </> :
                            <> 
                            {interview.interviewItems.length === 1 ?
                            <> 
                            {interview.interviewItems.map((item,i) => <>
                                <td> {item.phase} </td>
                                <td> {resultInNice(item.result)} </td> 
                                <td></td>
                                <td></td>
                                </>)} 
                            </> : 
                            <>
                              {interview.interviewItems.map((item,i) => <>
                                <td>  {item.phase} </td>
                                <td>  {resultInNice(item.result)} </td> </>)} 
                                </>}
                          </>}
                          <td>
                          <Link to={`/admin/interview/${interview._id}`}>Details</Link>
                          </td>
                        </tr>
                    )}
                
                </tbody>
                </table>    
                </div>
             </div>
        </div>

                   
                    
                      <div className="list-list" style={{padding: "0px"}}>
                        
                      <div className="card-header"><div className="card-title">メンター</div>
                      </div>
                      <div className="card-body">

                      <div className="hr-text">Skype 担当</div>
                      <div className="mb-2 pre-wrap">　
                      {student.skypeTantou}
                      </div>

                      <div className="hr-text">Skype面談結果メモ</div>
                      <div className="mb-2 pre-wrap">　
                      {student.skypeMemo}
                      </div>
                      <div className="hr-text">Skype 性格</div>
                      <div className="mb-2 pre-wrap">　
                      {student.skypeCharacter}
                      </div>

                      <div className="hr-text">Skype 勉強</div>
                      <div className="mb-2 pre-wrap">　
                      {student.skypeStudy}
                      </div>


                      <div className="hr-text">両親に相談したか？</div>
                      <div className="mb-2 pre-wrap">　
                      {student.skypeParents === true ? "YES": null } 
                      </div>


                      <div className="hr-text">入社するか</div>
                      <div className="mb-2 pre-wrap">　
                      {student.skypeJoinCompany ? "YES": null } 
                      </div>

                      <div className="hr-text">入社時期に関するメモ</div>
                      <div className="mb-2 pre-wrap">　
                      {student.skypeJoinCompanyMemo  ? "YES": null } 
                      </div>

                      <div className="hr-text">来日できるか</div>
                      <div className="mb-2 pre-wrap">　
                      {student.skypeCanComeJapan ? "YES": null } 
                      </div>

                      <div className="hr-text">マッチングメモ</div>
                      <div className="mb-2 pre-wrap">　
                      {student.matchingMemo}
                      </div>
                    
                      </div>
                      </div>


                      <div className="list-list" style={{padding: "0px"}}>
                      <div className="card-header"><div className="card-title">メンター</div>
                      </div>
                      <div className="card-body">

                      <div className="hr-text">メンター</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentor}
                      </div>
                      <div className="hr-text">メンター総合評価</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorRating}
                      </div>
                      <div className="hr-text">メンター性格</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorCharacter}
                      </div>

                      <div className="hr-text">メンター日本語レベル</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorJapanese}
                      </div>

                      <div className="hr-text">メンター勉強</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorStudy}
                      </div>

                      <div className="hr-text">メンター入社するか</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorEntry}
                      </div>

                      <div className="hr-text">メンター AtoJへのコメントと評価ポイント</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorPointAtoJ}
                      </div>

                      <div className="hr-text">メンター面談メモ</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorMemo}
                      </div>

                      <div className="hr-text">面談前　事前質問書き込みスペース</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorMemoBefore}
                      </div>

                      <div className="hr-text">メンター持っているオファー	</div>
                      <div className="mb-2 pre-wrap">　
                      {student.mentorOffer}
                      </div>

                      </div>
                      </div> </>
                      
                      : null }


      </Grid.Col>
      
      <Grid.Col width={12} lg={3} sm={12} >
 
      {session.role === 1 || session.role === 4 ? 
<>
{student.ratings != null ? <ReactStars
    count={3}
    value={student.ratings}
    onChange={ratingChanged}
    size={30}
    activeColor="#ffd700"
  /> : null }

<a className="unlikeBtn resumeGradient fullWidth mb-4 " href={`/admin/reverse/matching/${student._id}`}> Matching
</a>
<a className="unlikeBtn resumeGradient fullWidth mr-4 " href={`/admin/student/update/${student._id}`}> 編集
</a>
<hr/>
  <div className="list-list"  style={{padding: "2px"}}>
  <HorizontalBar data={dataPoints}  legend={legendOpts}  style={{height: "360px", width: "720px"}}/>
     
     </div>
     <div className="list-list"  style={{padding: "2px"}}>
        <table className="table card-table table-vcenter">
          <thead>
            <tr>
              <th>Contact Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 
              Passport: {student.passport ? "YES" : "No"} <br/>
              WeChatId: {student.weChatId} <br/>
              Facebook: {student.contactDetails? student.contactDetails.faceBook : null} <br/>
              Wechat: {student.contactDetails? student.contactDetails.weChat : null}  <br/>
              WhatsApp: {student.contactDetails? student.contactDetails.whatsApp : null}
              </td>
            </tr>
          
          </tbody>
        </table>  
  </div>
      <div className="list-list"  style={{padding: "0px"}}>
                <table className="table card-table table-vcenter">
                  <thead>
                    <tr>
                      <th>推薦 ({student.recCount})</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {student.rec_users ?
                        student.rec_users.map((user,i) => (
                          <a key={i} href={`/admin/profile/${user._id}`} >{ (i ? ', ' : '') + user.name }</a>)) : null
                            }
                      </td>
                    </tr>
                   
                  </tbody>
                </table>

                <table className="table card-table table-vcenter">
                  <thead>
                    <tr>
                      <th>推薦2({student.pushCount})</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{student.push_users ?
                        student.push_users.map((user,i) => (
                          <a key={i} href={`/admin/profile/${user._id}`} >{ (i ? ', ' : '') + user.name }</a>)) : null
                            }
                     
                      </td>
                    </tr>
                   
                  </tbody>
                </table>

                <table className="table card-table table-vcenter">
                  <thead>
                    <tr>
                      <th>Fav ({student.favoritesCount})</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                       {student.favorites ?
                        student.favorites.map((user,i) => (
                            <a key={i} href={`/admin/profile/${user._id}`} >{ (i ? ', ' : '') + user.name }</a>)) : null
                            }
                      </td>
                    </tr>
                   
                  </tbody>
                </table>
                <table className="table card-table table-vcenter">
                  <thead>
                    <tr>
                      <th>Hide ({student.hideCount})</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{student.hide_users ?
                        student.hide_users.map((user,i) => (
                          <a key={i} href={`/admin/profile/${user._id}`} >{ (i ? ', ' : '') + user.name }</a>)) : null
                            }
                      
                      </td>
                    </tr>
                   
                  </tbody>
                </table>
                
              </div>
              
               </> 
              
              : null }
        <div>
        {session.role === 3 ? null : <>

        {student.codeToJapan == null || student.codeToJapan == undefined || student.codeToJapan == "" ? "" :  
                        <a className="link" target="_blank" href={student.codeToJapan} className="resumeGradient unlikeBtn fullWidth" style={{marginBottom:"1rem"}}>
        <i class="fe fe-download" style={{marginRight: "5px"}}></i>【CODE TO JAPAN】<br/> AI Contest Result 
        </a>}

        {student.codeToJapanAlgorithm == null || student.codeToJapanAlgorithm == undefined || student.codeToJapanAlgorithm == "" ? "" :  
                        <a className="link" target="_blank" href={student.codeToJapanAlgorithm} className="resumeGradient unlikeBtn fullWidth" style={{marginBottom:"1rem"}}>
        <i class="fe fe-download" style={{marginRight: "5px"}}></i>【CODE TO JAPAN】<br/> Algorithm Contest Result 
        </a>}

          <button className="resumeGradient unlikeBtn fullWidth" onClick={()=> createPDFLinkButton()}> <i class="fe fe-download" style={{marginRight: "5px"}}>{" "}</i>  RESUME</button> 
    
        {student.upload_fyp == null || student.upload_fyp == undefined || student.upload_fyp == "" ? "" :  <a className="link" href={student.upload_fyp} className="resumeGradient unlikeBtn fullWidth" style={{marginTop:"1rem"}}>
        <i class="fe fe-download" style={{marginRight: "5px"}}></i> RESEARCH / REPORT
        </a>} <hr/></>}

    


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
      {session.round === "Phase II" || session.round === "Phase III" ? null :
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
)(Student);
