import React, { useState, useEffect } from 'react';
import { isAuthenticates } from '../auth';
import { Redirect, withRouter} from 'react-router-dom';
import { readStudentDetails } from '../core/apiCore';
import { updateStudent } from './apiAdmin';
import SiteWrapper from '../templates/SiteWrapper'
import {
  Container, Form,
} from "tabler-react";
import { connect } from "react-redux";

const mapStateToProps = ({ session }) => ({
  session
});


const UpdateStudent = ({ session, match, history }) => {
    const [values, setValues] = useState({
      name: '',
      studentid: '',
      password: "",
      gender: '',
      address: "",
      skype: "",
      dob: "",
      email: "",
      age: '',
      grad_year: "",
      grad_month: "",
      japanese: '',
      english: '',
      comments: '',
      skypeTantou: "",
      skypeMemo: "",
      skypeCharacter: "",
      skypeStudy: "",
      skypeParents: "",
      skypeJoinCompany: "",
      skypeJoinCompanyMemo: "",
      skypeCanComeJapan: "",
      weChatId: "",
      passport: "",
      matchingMemo:"",
      university: '',
      major: '',
      tags: "",
      educationBgTags: "",
      countryTags: "",
      universityTags: "",
      japaneseTags: "",
      faculty: '',
      it_skills: '',
      other_it_skills: '',
      entry_timing: '',
      other_languages: "",
      jlpt: '',
      jlpt_next: '',
      github: '',
      qualification: '',
      education_bg: '',
      research: '',
      why_work_in_japan: '',
      internship: '',
      other_pr: '',
      video: '',
      videoImg: '',
      profileImg: "",
      profileImgTwo: "",
      reflections: "",
      period: "",
      country: "",
      faceBook: "",
      weChat: "",
      whatsApp: "",
      error: false,
      success: false,
      offerCompany: "",
      offerJob: "",
      offerIndustry: "",
      status: "",
      createdStudent: '',
      topUni: "",
      inJapan: "",
      forNextMonth: "",
      mentorRating: "",
      mentorMemo: "",
      mentorMemoBefore: "",
      mentor: "",
      mentorCharacter: "",
      mentorStudy: "",
      mentorEntry: "",
      mentorPointAtoJ: "",
      mentorJapanese: "",
      mentorOffer: "",
      codeToJapanScore: "",
      codeToJapan: "",
      redirectToProfile: false,
      formData: ''
    });

    const {
        name,
        error,
        createdStudent,
        formData, success,
    } = values;

    const { darwin_uid, darwin_myTk } = isAuthenticates();


    const init = studentId => {
        readStudentDetails(studentId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    offerCompany: data.offerCompany,
                    studentid: data.studentid,
                    gender: data.gender,
                    country: data.country,
                    age: data.age,
                    dob: data.dob,
                    country: data.country,
                    japanese: data.japanese,
                    address: data.address,
                    email: data.email,
                    password: data.password,
                    grad_year: data.grad_year,
                    grad_month: data.grad_month,
                    tags: data.tags,
                    countryTags: data.countryTags,
                    educationBgTags: data.educationBgTags,
                    universityTags: data.universityTags,
                    japaneseTags: data.japaneseTags,
                    skype: data.skype,
                    other_languages: data.other_languages,
                    english: data.english,
                    comments: data.comments,
                    university: data.university,
                    major: data.major,
                    faculty: data.faculty,
                    it_skills: data.it_skills,
                    other_it_skills: data.other_it_skills,
                    entry_timing: data.entry_timing,
                    jlpt: data.jlpt,
                    jlpt_next: data.jlpt_next,
                    github: data.github,
                    education_bg: data.education_bg,
                    qualification: data.qualification,
                    research: data.research,
                    why_work_in_japan: data.why_work_in_japan,
                    internship: data.internship,
                    other_pr: data.other_pr,
                    video: data.video,
                    videoImg: data.videoImg,
                    upload_fyp: data.upload_fyp,
                    profileImg: data.profileImg,
                    profileImgTwo: data.profileImgTwo,
                    reflections: data.reflections,
                    period: data.period,
                    faceBook: data.contactDetails.faceBook,
                    weChat: data.contactDetails.weChat,
                    whatsApp: data.contactDetails.whatsApp,
                    topUni: data.topUni,
                    status: data.status,
                    inJapan: data.inJapan,
                    forNextMonth: data.forNextMonth,
                    mentorRating: data.mentorRating,
                    mentorMemo: data.mentorMemo,
                    mentorMemoBefore: data.mentorMemoBefore,
                    mentor: data.mentor,
                    mentorCharacter: data.mentorCharacter,
                    mentorStudy: data.mentorStudy,
                    mentorEntry: data.mentorEntry,
                    mentorPointAtoJ: data.mentorPointAtoJ,
                    mentorJapanese: data.mentorJapanese,
                    mentorOffer: data.mentorOffer,
                    skypeTantou: data.skypeTantou,
                    skypeMemo: data.skypeMemo,
                    skypeCharacter: data.skypeCharacter,
                    skypeStudy: data.skypeStudy,
                    skypeParents: data.skypeParents,
                    skypeJoinCompany: data.skypeJoinCompany,
                    skypeJoinCompanyMemo: data.skypeJoinCompanyMemo,
                    skypeCanComeJapan: data.skypeCanComeJapan,
                    weChatId: data.weChatId,
                    codeToJapanScore: data.codeToJapanScore,
                    codeToJapan: data.codeToJapan,
                    passport: data.passport,
                    matchingMemo: data.matchingMemo,
                    formData: new FormData()
                });
            }
        });
    };


    useEffect(() => {
        init(match.params.studentId);
    }, []);

    const handleChange = name => event => {
          const value = name === 'upload_fyp' ? event.target.files[0] : event.target.value;
          formData.set(name, value);
          setValues({ ...values, [name]: value });
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateStudent(match.params.studentId, darwin_uid, darwin_myTk, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    offerCompany: data.offerCompany,
                    studentid: data.studentid,
                    gender: data.gender,
                    country: data.country,
                    age: data.age,
                    dob: data.dob,
                    country: data.country,
                    japanese: data.japanese,
                    address: data.address,
                    email: data.email,
                    grad_year: data.grad_year,
                    grad_month: data.grad_month,
                    tags: data.tags,
                    countryTags: data.countryTags,
                    educationBgTags: data.educationBgTags,
                    universityTags: data.universityTags,
                    japaneseTags: data.japaneseTags,
                    skype: data.skype,
                    other_languages: data.other_languages,
                    english: data.english,
                    comments: data.comments,
                    university: data.university,
                    major: data.major,
                    faculty: data.faculty,
                    it_skills: data.it_skills,
                    other_it_skills: data.other_it_skills,
                    password: data.password,
                    entry_timing: data.entry_timing,
                    jlpt: data.jlpt,
                    jlpt_next: data.jlpt_next,
                    github: data.github,
                    education_bg: data.education_bg,
                    qualification: data.qualification,
                    research: data.research,
                    why_work_in_japan: data.why_work_in_japan,
                    internship: data.internship,
                    other_pr: data.other_pr,
                    video: data.video,
                    videoImg: data.videoImg,
                    upload_fyp: data.upload_fyp,
                    profileImg: data.profileImg,
                    profileImgTwo: data.profileImgTwo,
                    reflections: data.reflections,
                    period: data.period,
                    faceBook: data.contactDetails.faceBook,
                    weChat: data.contactDetails.weChat,
                    whatsApp: data.contactDetails.whatsApp,
                    topUni: data.topUni,
                    status: data.status,
                    loading: false,
                    error: false,
                    success: true,
                    redirectToProfile: true,
                    inJapan: data.inJapan,
                    forNextMonth: data.forNextMonth,
                    createdStudent: data.name,
                    mentorRating: data.mentorRating,
                    mentorMemo: data.mentorMemo,
                    mentorMemoBefore: data.mentorMemoBefore,
                    mentor: data.mentor,
                    mentorCharacter: data.mentorCharacter,
                    mentorStudy: data.mentorStudy,
                    mentorEntry: data.mentorEntry,
                    mentorPointAtoJ: data.mentorPointAtoJ,
                    mentorJapanese: data.mentorJapanese,
                    mentorOffer: data.mentorOffer,
                    skypeTantou: data.skypeTantou,
                    skypeMemo: data.skypeMemo,
                    skypeCharacter: data.skypeCharacter,
                    skypeStudy: data.skypeStudy,
                    skypeParents: data.skypeParents,
                    skypeJoinCompany: data.skypeJoinCompany,
                    skypeJoinCompanyMemo: data.skypeJoinCompanyMemo,
                    skypeCanComeJapan: data.skypeCanComeJapan,
                    weChatId: data.weChatId,
                    passport: data.passport,
                    codeToJapan: data.codeToJapan,
                    codeToJapanScore: data.codeToJapanScore,
                    matchingMemo: data.matchingMemo,
                });
            }
        });
    };

    const newPostForm = () => (
      <form onSubmit={clickSubmit}>
      <div class="card">
        <div class="card-header">
         <h4 class="card-title">Update Student</h4>
        </div>
        <div class="card-body">
        { session.role === 1 ? <>
        <div class="mb-2">
            <label class="form-label">Name</label>
             <input type="text" onChange={handleChange("name")} value={name} name="name"  class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">Student Id</label>
             <input type="text" onChange={handleChange("studentid")} value={values.studentid} name="name"  class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">Age</label>
             <input type="text" onChange={handleChange("age")} value={values.age} name="Age"  class="form-control"/>
          </div>

            
          <div class="mb-2">
            <label class="form-label">DOB</label>
             <input type="text" onChange={handleChange("dob")} value={values.dob} name="Dob"  class="form-control"/>
          </div>


          <div class="mb-2">
            <label class="form-label">Email</label>
             <input type="text" onChange={handleChange("email")} value={values.email} name="Email"  class="form-control"/>
          </div>
          

          <div class="mb-2">
            <label class="form-label">Skype Id</label>
             <input type="text" onChange={handleChange("skype")} value={values.skype} name="Skype"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">WeChat Id</label>
             <input type="text" onChange={handleChange("weChatId")} value={values.weChatId} name="weChatId"  class="form-control"/>
          </div>


          <div class="mb-2">
            <label class="form-label">Passport</label>
            <select class="form-label" placeholder="Passport？" onChange={handleChange("passport")} value={values.passport} name="passport">
              <option value=""> Select </option>
              <option value="true"> TRUE </option>
              <option value="false"> FALSE </option>
              </select>
         </div>

          <div class="mb-2">
            <label class="form-label">Address</label>
             <input type="text" onChange={handleChange("address")} value={values.address} name="Address"  class="form-control"/>
          </div>


          <div class="mb-2">
            <label class="form-label">Country</label>
             <input type="text" onChange={handleChange("country")} value={values.country} name="Country"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">FaceBook</label>
             <input type="text" onChange={handleChange("faceBook")} value={values.faceBook} name="Facebook"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">WeChat</label>
             <input type="text" onChange={handleChange("weChat")} value={values.weChat} name="weChat"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">WhatsApp</label>
             <input type="text" onChange={handleChange("whatsApp")} value={values.whatsApp} name="whatsApp"  class="form-control"/>
          </div>
  
  
          <div class="mb-2">
          <label class="form-label">Gender</label>
          <select class="form-label" placeholder="Select Gender" onChange={handleChange("gender")} value={values.gender} name="gender">
             <option value=""> Select </option>
             <option value="Male"> Male </option>
             <option value="Female">  Female </option>
             </select>
             < div class="mb-2">
            <label class="form-label">Other Languages</label>
             <input type="text" onChange={handleChange("other_languages")} value={values.other_languages} name="other_languages"  class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">University</label>
             <input type="text" onChange={handleChange("university")} value={values.university} name="university"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Top University</label>
            <select placeholder="Select University level" onChange={handleChange("topUni")} value={values.topUni} name="topUni">
            <option value=""> Select </option>
            <option value="true"> True </option>
            <option value="false"> False </option>
            </select>  
          </div>
  
  
          <div class="mb-2">
            <label class="form-label">Faculty</label>
             <input type="text" onChange={handleChange("faculty")} value={values.faculty} name="faculty"  class="form-control"/>
          </div>
  
  
          <div class="mb-2">
            <label class="form-label">Major</label>
             <input type="text" onChange={handleChange("major")} value={values.major} name="major"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Grad Year</label>
             <input type="text" onChange={handleChange("grad_year")} value={values.grad_year} name="grad_year"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Grad Month</label>
             <input type="text" onChange={handleChange("grad_month")} value={values.grad_month} name="grad_month"  class="form-control"/>
          </div>
  
  
          <div class="mb-2">
            <label class="form-label">It Skills</label>
             <input type="text" onChange={handleChange("it_skills")} value={values.it_skills} name="it_skills"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Other It Skills</label>
             <input type="text" onChange={handleChange("other_it_skills")} value={values.other_it_skills} name="other_it_skills"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Code To Japan</label>
             <input type="text" onChange={handleChange("codeToJapan")} value={values.codeToJapan} name="codeToJapan"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Code To Japan Score</label>
             <input type="text" onChange={handleChange("codeToJapanScore")} value={values.codeToJapanScore} name="codeToJapanScore"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Tags</label>
             <input type="text" onChange={handleChange("tags")} value={values.tags} name="tags"  class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">Entry Timing</label>
             <input type="text" onChange={handleChange("entry_timing")} value={values.entry_timing} name="entry_timing"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Country Tags</label>
             <input type="text" onChange={handleChange("countryTags")} value={values.countryTags} name="countryTags"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Education BG Tags</label>
             <input type="text" onChange={handleChange("educationBgTags")} value={values.educationBgTags} name="educationBgTags"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Japanese Tags</label>
             <input type="text" onChange={handleChange("japaneseTags")} value={values.japaneseTags} name="japaneseTags"  class="form-control"/>
          </div>
  
  
          <div class="mb-2">
            <label class="form-label">Comments</label>
             <input type="text" onChange={handleChange("comments")} value={values.comments} name="comments"  class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">Video Url</label>
             <input type="text" onChange={handleChange("video")} value={values.video} name="video"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">videoImg</label>
             <input type="text" onChange={handleChange("videoImg")} value={values.videoImg} name="videoImg"  class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">Github URL</label>
             <input type="text" onChange={handleChange("github")} value={values.github} name="github"  class="form-control"/>
          </div>
          <div class="mb-2">
            <label class="form-label">English</label>
            <select placeholder="Select English level" onChange={handleChange("english")} value={values.english} name="english">
            <option value=""> Select </option>
            <option value="A"> A </option>
            <option value="B"> B </option>
            <option value="C"> C </option>
            <option value="D"> D </option>
            <option value="E"> E </option>
            </select>  
          </div>

      
  
          <div class="mb-2">
            <label class="form-label">学歴</label>
             <input type="text" onChange={handleChange("education_bg")} value={values.education_bg} name="education_bg" rows="5" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Japanese</label>
             <select placeholder="Select Japanese level" onChange={handleChange("japanese")} value={values.japanese} name="japanese">
            <option value=""> Select </option>
            <option value="A"> A </option>
            <option value="B"> B </option>
            <option value="C"> C </option>
            <option value="D"> D </option>
            <option value="E"> E </option>
            </select> 
          </div>
  
          <div class="mb-2">
            <label class="form-label">JLPT</label>
             <select placeholder="Select JLPT" onChange={handleChange("jlpt")} value={values.jlpt} name="jlpt">
            <option value=""> Select </option>
            <option value="N1"> N1 </option>
            <option value="N2"> N2 </option>
            <option value="N3"> N3 </option>
            <option value="N4"> N4 </option>
            <option value="N5"> N5 </option>
            <option value="None"> None </option>
            </select>
         </div>
         
          < div class="mb-2">
            <label class="form-label">JLPT Next</label>
             <input type="text" onChange={handleChange("jlpt_next")} value={values.jlpt_next} name="jlpt_next"  class="form-control"/>
          </div>
  
        </div> </> : null }
  
      

      
          <div class="mb-2">
            <label class="form-label">学歴備考</label>
            <textarea onChange={handleChange("qualification")} value={values.qualification} name="qualification" rows="5" class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">研究テーマ</label>
            <textarea onChange={handleChange("research")} value={values.research} name="research" rows="5" class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">インターンシップ</label>
            <textarea onChange={handleChange("internship")} value={values.internship} name="internship" rows="5" class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">日本で働きたい理由</label>
            <textarea onChange={handleChange("why_work_in_japan")} value={values.why_work_in_japan} name="why_work_in_japan" rows="5" class="form-control"/>
          </div>
  
          <div class="mb-2">
            <label class="form-label">その他PR</label>
            <textarea onChange={handleChange("other_pr")} value={values.other_pr} name="other_pr" rows="5" class="form-control"/>
          </div>

          { session.role === 1 ? <>
          <hr/>

          <div class="mb-2">
            <label class="form-label">マッチングメモ</label>
            <textarea onChange={handleChange("matchingMemo")} value={values.matchingMemo} name="matchingMemo" rows="5" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Skype 担当</label>
             <input type="text" onChange={handleChange("skypeTantou")} value={values.skypeTantou} name="skypeTantou"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">Skype面談結果メモ</label>
             <input type="text" onChange={handleChange("skypeMemo")} value={values.skypeMemo} name="skypeMemo"  class="form-control"/>
          </div>


          <div class="mb-2">
            <label class="form-label">Skype 性格</label>
            <select placeholder="Skype 性格" onChange={handleChange("skypeCharacter")} value={values.skypeCharacter} name="skypeCharacter">
              <option value=""> Select </option>
              <option value="A+"> A+ </option>
              <option value="A"> A </option>
              <option value="A-"> A- </option>
              <option value="B+"> B+ </option>
              <option value="B"> B </option>
              <option value="B-"> B- </option>
              <option value="C+"> C+ </option>
              <option value="C"> C </option>
              <option value="C-"> C- </option>
              <option value="D+"> D+ </option>
              <option value="D"> D </option>
              <option value="D-"> D- </option>
              <option value="E+"> E+ </option>
              <option value="E"> E </option>
              <option value="E-"> E- </option>
              </select>  
          </div>

          <div class="mb-2">
            <label class="form-label">Skype 勉強</label>
            <select placeholder="Skype 勉強" onChange={handleChange("skypeStudy")} value={values.skypeStudy} name="skypeStudy">
              <option value=""> Select </option>
              <option value="A+"> A+ </option>
              <option value="A"> A </option>
              <option value="A-"> A- </option>
              <option value="B+"> B+ </option>
              <option value="B"> B </option>
              <option value="B-"> B- </option>
              <option value="C+"> C+ </option>
              <option value="C"> C </option>
              <option value="C-"> C- </option>
              <option value="D+"> D+ </option>
              <option value="D"> D </option>
              <option value="D-"> D- </option>
              <option value="E+"> E+ </option>
              <option value="E"> E </option>
              <option value="E-"> E- </option>
              </select>  
          </div>

          <div class="mb-2">
            <label class="form-label">両親に相談したか？</label>
            <select class="form-label" placeholder="両親に相談したか？" onChange={handleChange("skypeParents")} value={values.skypeParents} name="skypeParents">
              <option value=""> Select </option>
              <option value="true"> TRUE </option>
              <option value="false"> FALSE </option>
              </select>
         </div>

         <div class="mb-2">
            <label class="form-label">入社するか</label>
            <select placeholder="入社するか" onChange={handleChange("skypeJoinCompany")} value={values.skypeJoinCompany} name="skypeJoinCompany">
              <option value=""> Select </option>
              <option value="A+"> A+ </option>
              <option value="A"> A </option>
              <option value="A-"> A- </option>
              <option value="B+"> B+ </option>
              <option value="B"> B </option>
              <option value="B-"> B- </option>
              <option value="C+"> C+ </option>
              <option value="C"> C </option>
              <option value="C-"> C- </option>
              <option value="D+"> D+ </option>
              <option value="D"> D </option>
              <option value="D-"> D- </option>
              <option value="E+"> E+ </option>
              <option value="E"> E </option>
              <option value="E-"> E- </option>
              </select>  
          </div>

      

         <div class="mb-2">
            <label class="form-label">入社時期に関するメモ</label>
            <select class="form-label" placeholder="入社時期に関するメモ" onChange={handleChange("skypeJoinCompanyMemo")} value={values.skypeJoinCompanyMemo} name="skypeJoinCompanyMemo">
              <option value=""> Select </option>
              <option value="true"> TRUE </option>
              <option value="false"> FALSE </option>
              </select>
         </div>

         <div class="mb-2">
            <label class="form-label">来日できるか</label>
            <select class="form-label" placeholder="来日できるか" onChange={handleChange("skypeCanComeJapan")} value={values.skypeCancomeJapan} name="skypeCanComeJapan">
              <option value=""> Select </option>
              <option value="true"> TRUE </option>
              <option value="false"> FALSE </option>
              </select>
         </div>
</>:null}
          <hr/>

          <div class="mb-2">
        <label class="form-label">メンター総合評価</label>
        <select placeholder="メンター総合評価" onChange={handleChange("mentorRating")} value={values.mentorRating} name="mentorRating">
        <option value=""> Select </option>
        <option value="A+"> A+ </option>
        <option value="A"> A </option>
        <option value="A-"> A- </option>
        <option value="B+"> B+ </option>
        <option value="B"> B </option>
        <option value="B-"> B- </option>
        <option value="C+"> C+ </option>
        <option value="C"> C </option>
        <option value="C-"> C- </option>
        <option value="D+"> D+ </option>
        <option value="D"> D </option>
        <option value="D-"> D- </option>
        <option value="E+"> E+ </option>
        <option value="E"> E </option>
        <option value="E-"> E- </option>
        </select>  
      </div>




      <div class="mb-2">
        <label class="form-label">メンター性格</label>
        <select placeholder="メンター性格" onChange={handleChange("mentorCharacter")} value={values.mentorCharacter} name="mentorCharacter">
        <option value=""> Select </option>
        <option value="A"> A専門が合えばどこでも合格するレベル </option>
        <option value="B"> Bコミュニケーションはまずまず </option>
        <option value="C"> C普通にコミュニケーション可能 </option>
        <option value="D"> D緊張してコミュニケーションが大変 </option>
        <option value="E"> E面接にならない </option>
        </select>  
      </div>

      <div class="mb-2">
        <label class="form-label">メンター日本語レベル</label>
        <select placeholder="メンター日本語レベル" onChange={handleChange("mentorJapanese")} value={values.mentorJapanese} name="mentorJapanese">
        <option value=""> Select </option>
        <option value="A"> A </option>
        <option value="B"> B </option>
        <option value="C"> C </option>
        <option value="D"> D </option>
        <option value="E"> E </option>
        </select>  
      </div>

      <div class="mb-2">
        <label class="form-label">メンター勉強</label>
        <select placeholder="メンター勉強" onChange={handleChange("mentorStudy")} value={values.mentorStudy} name="mentorStudy">
        <option value=""> Select </option>
        <option value="A"> A FYP、大学の勉強　ともにかなり良い </option>
        <option value="B"> B しっかりやっている </option>
        <option value="C"> C普通 </option>
        <option value="D"> D FYPだめ、勉強していなそう </option>
        <option value="E"> E 全然ダメ </option>
        </select>  
      </div>
    

      <div class="mb-2">
        <label class="form-label">メンター入社するか</label>
        <select placeholder="メンター入社するか" onChange={handleChange("mentorEntry")} value={values.mentorEntry} name="mentorEntry">
        <option value=""> Select </option>
        <option value="A"> A SGWJで合格したらどこでも入社しそう </option>
        <option value="B"> B 多分、合格したら入社する </option>
        <option value="C"> C よっぽど本人の希望と違いがなければ入社する </option>
        <option value="D"> D　すでにまあまあのオファーがあったり、入社したい企業が限定されている </option>
        <option value="E"> E 両親反対、かなり良いオファー持っている、希望年収が高すぎる、希望勤務地が狭すぎる </option>
        </select>  
      </div>

      <div class="mb-2">
        <label class="form-label">メンター</label>
        <select placeholder="メンター入社するか" onChange={handleChange("mentor")} value={values.mentor} name="mentor">
        <option value=""> Select </option>
        <option value="神原"> 神原 </option>
        <option value="鈴木 秀和"> 鈴木 秀和 </option>
        <option value="鈴木 信雄"> 鈴木 信雄 </option>
        <option value="神原浩司"> 神原浩司 </option>
        <option value="岡庭"> 岡庭 </option>
        <option value="須川"> 須川 </option>
        <option value="三瓶"> 三瓶 </option>
        <option value="Grace"> Grace </option>
        <option value="赤田"> 赤田 </option>
        <option value="青地"> 青地</option>
        </select>  
      </div>

      <div class="mb-2">
        <label class="form-label">メンター AtoJへのコメントと評価ポイント</label>
        <textarea onChange={handleChange("mentorPointAtoJ")} value={values.mentorPointAtoJ} name="mentorPointAtoJ" rows="5" class="form-control"/>
      </div>

      <div class="mb-2">
        <label class="form-label">メンター面談メモ</label>
        <textarea onChange={handleChange("mentorMemo")} value={values.mentorMemo} name="mentorMemo" rows="5" class="form-control"/>
      </div>

      <div class="mb-2">
        <label class="form-label">面談前　事前質問書き込みスペース</label>
        <textarea onChange={handleChange("mentorMemoBefore")} value={values.mentorMemoBefore} name="mentorMemoBefore" rows="5" class="form-control"/>
      </div>

      <div class="mb-2">
        <label class="form-label">メンター持っているオファー	</label>
        <input onChange={handleChange("mentorOffer")} value={values.mentorOffer} name="mentorOffer" class="form-control"/>
      </div>

      { session.role === 1 ? 
  <>

<div class="mb-2">
            <label class="form-label">FYP</label>
            <input onChange={handleChange('upload_fyp')} type="file" name="upload_fyp"  />
            </div>

            <div class="mb-2">
            <label class="form-label">FYP</label>
            <input onChange={handleChange('upload_fyp')} value={values.upload_fyp} name="upload_fyp" class="form-control" />
            </div>

            
            <div class="mb-2">
          <label class="form-label">Status</label>
          <select class="form-label" placeholder="Select Status" onChange={handleChange("status")} value={values.status} name="gender">
             <option value=""> Select </option>
             <option value="リスト掲載"> リスト掲載 </option>
             <option value="来日決定">  来日決定 </option>
             <option value="NG">  NG </option>
             <option value="Offer">  Offer </option>
             <option value="N Processing">  Napoleon Process </option>
             <option value="Napoleon">  Napoleon  </option>
             </select>
        </div>

        <div class="mb-2">
          <label class="form-label">日本在住</label>
          <select class="form-label" placeholder="Select Status" onChange={handleChange("inJapan")} value={values.inJapan} name="inJapan">
             <option value=""> Select </option>
             <option value="true"> TRUE </option>
             <option value="false"> FALSE </option>
             </select>
        </div>


        <div class="mb-2">
          <label class="form-label">翌月ONLY</label>
          <select class="form-label" placeholder="Select Status" onChange={handleChange("forNextMonth")} value={values.forNextMonth} name="forNextMonth">
             <option value=""> Select </option>
             <option value="true"> TRUE </option>
             <option value="false"> FALSE </option>
             </select>
          </div>  </> : null }

      </div> 
    <div class="card-footer text-right">
                    <div class="d-flex">
                      <a class="btn btn-link" onClick={() => history.goBack()}>Cancel</a>
                      <button type="submit" class="btn btn-primary ml-auto">Submit</button>
                    </div>
                  </div>
                  </div>
          </form>

    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdStudent ? '' : 'none' }}>
            {`${createdStudent}`} を変更しました!
        </div>
    );

    const redirectUser = () => {
          if (success) {
                window.scrollTo(0, 0);
          }
      };

    return (
            <SiteWrapper>
              <Container>
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                    </Container>
            </SiteWrapper>
    );
};

export default withRouter(connect(
  mapStateToProps,
)(UpdateStudent));
