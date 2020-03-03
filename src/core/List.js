import React from 'react';
import  AddFav  from './AddFav';
import { isAuthenticated } from '../auth';
import {
  Icon,
} from "tabler-react";


const List = ({student, setFavCount,
  favCount, resumeLoading}) => {


  const handleSetFavCount = e => {
    setFavCount(e);
  };


  const { user } = isAuthenticated();

  return (
    <div className="list-list"  style={{"borderTop":
      student.rec_users.indexOf(user._id)>-1 ?  "5px solid rgb(40, 139, 250)": null } }
    >
     {student.rec_users.indexOf(user._id)>-1 ? <span className="recommended" style={{marginRight: "5px"}}> おすすめ</span>　: null }
    {student.videoImg == null?  "" : <img class="list-VidImg" src={`${student.videoImg}`} /> }
    <text style={{color: "rgb(113, 113, 113"}}>{student.studentid} </text> 
    <div className="list-TextItem">

    <div style={{margin: "10px   0px"}}>
    <a className="list-TextNoteTitle" href={`/student/${student._id}`}>   {student.comments == null?  "" : student.comments.substring(0,60) + "..." } </a>
    </div>

    <div className="list-Desc">
    <div class="mt-1">
    <Icon prefix="fe" name="user" /><strong> 性別・年齢: </strong> {student.gender === "male" ? "男性": "女性"}・{student.age}
    </div>
    <div>
    <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
    </div>
    <div>
    <Icon prefix="fe" name="disc" />  <strong>大学・学部: </strong>{student.university}・{student.faculty} ({student.education_bg})
    <div>
    <Icon prefix="fe" name="book" />  <strong>日本語: </strong>{student.japanese} {student.jlpt === "None" ? "" : <span>{"・JLPT: " + student.jlpt}</span>}
    </div>
    {student.it_skills.length > 0 ? <div>
    <Icon prefix="fe" name="monitor" />  <strong>ITスキル: </strong>
    {student.it_skills.map((skill, i) => (
      <span class="item">{skill} </span>
      ))}
    </div> : null }
    </div>
    </div>
    </div>

      <div className="list-Footer">
      <div className="list-FooterTag tags">
     {student.tags.map((skill, i) => (
      <span class="tag expanded tag-secondary" style={{"color": "#444", "background": "#fff", "border": "1px solid #444"}}>#{skill}</span>
      ))}
      </div>
      {/*<a href={student.url} target="_blank" class="btn btn-primary btn-sm"
    >
      {resumeLoading ? 'Loading…' : student.studentid }
    </a> */}
    {user.round === "Phase II" ? null : <AddFav student={student} setFavCount={handleSetFavCount}
      favCount={favCount} />  }
    </div>
    </div>

);
};

export default List;
