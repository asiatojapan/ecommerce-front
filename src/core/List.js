import React from 'react';
import  AddFav  from './AddFav';
import { isAuthenticated, isAuthenticate } from '../auth';
import { Icon } from "tabler-react";
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});



const List = ({logout, session, student, setFavCount, favCount }) => {

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

  const handleSetFavCount = e => {
    setFavCount(e);
  };

  return (
    <div className="list-list" style={{"borderTop":
      student.rec_users.indexOf(session._id)>-1 ?  "5px solid rgb(40, 139, 250)": null } }
    >
     {student.rec_users.indexOf(session._id)>-1 ? <span className="recommended" style={{marginRight: "5px"}}> おすすめ</span>　: null }
    {student.videoImg == null?  "" : <img className="list-VidImg" src={`${student.videoImg}`} /> }
    <text style={{color: "rgb(113, 113, 113"}}>{student.studentid} </text> 
    <div className="list-TextItem">

    <div style={{margin: "10px   0px"}}>
    <a className="list-TextNoteTitle" href={`/student/${student._id}`} target="_blank">   {student.comments == null?  "" : student.comments.substring(0,60) + "..." } </a>
    </div>

    <div className="list-Desc">
    <div className="mt-1">
    <Icon prefix="fe" name="user" /><strong> 性別・年齢: </strong> {student.gender === "Male" ? "男性": "女性"}・{_calculateAge(student.dob)}
    </div>
    <div>
    <Icon prefix="fe" name="globe" />  <strong>国籍・地域: </strong>{student.country}
    </div>
    <div>
    <Icon prefix="fe" name="disc" />  <strong>大学・学部: </strong>{student.university}・{student.faculty} ({student.education_bg})
    <div>
    <Icon prefix="fe" name="book" />  <strong>日本語: </strong>{student.japanese} {student.jlpt === "None" ? "" : <span> {"・JLPT: " + student.jlpt}</span>}
    </div>
    {student.it_skills.length > 0 ? <div>
    <Icon prefix="fe" name="monitor" />  <strong>ITスキル: </strong>
    {student.it_skills.map((skill, i) => (
      <span key={i} className="item">{skill} </span>
      ))}
      </div> : null }
      </div>
    </div>
    </div>

      <div className="list-Footer">
      <div className="list-FooterTag tags">
     {student.tags.map((skill, i) => (
      <span className="tag expanded tag-secondary"  key={i}  style={{"color": "#444", "background": "#fff", "border": "1px solid #444"}}>#{skill}</span>
      ))}
      </div>
      {/*<a href={student.url} target="_blank" class="btn btn-primary btn-sm"
    >
      {resumeLoading ? 'Loading…' : student.studentid }
    </a> */}
    {session.round === "Phase II" ? null : <AddFav student={student} setFavCount={handleSetFavCount}
      favCount={favCount} />  }
    </div>
    </div>

);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
