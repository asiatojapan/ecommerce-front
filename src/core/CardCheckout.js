import React from 'react';
import { Link } from 'react-router-dom';
import  AddRank from './AddRank';
import { destroyFav } from "./apiCore";
import { isAuthenticates } from '../auth';
import { Icon } from "tabler-react";

const CardCheckout = ({student, indivRank,rank,
  showRemoveItemButton = false,
  showDetailsButton = true,
  showRankItemButton = false,
  showRankOutcomeButton = false,
  setRun = f => f,
  run = undefined,
  setLoading = f => f, loading = undefined }) => {

  const { darwin_myTk, darwin_uid } = isAuthenticates();

  const showRemoveButton = showRemoveItemButton => {
    return (
      showRemoveItemButton && (
        <span
          onClick={() => {
            destroyFav(student._id, darwin_uid, darwin_myTk);
            setRun(!run);
            console.log(run)
            setLoading(!loading);
            // run useEffect in parent Cart
          }}
          className="close"
        >
        </span>
      )
    );
  }

  const showDetails = showDetailsButton => {
    return (
      showDetailsButton && (
        <div  style={{marginBottom: "0px"}}>
        <div>
        <Icon prefix="fe" name="user" /><strong> 性別・年齢: </strong> {student.gender === "Male" ? "男性": "女性"}・{_calculateAge(student.dob)}
        </div>
        <div>
        <Icon prefix="fe" name="globe" /> <strong>国籍・地域: </strong>{student.country}
        </div>
        </div>
      )
    )
  }

  const showRankButton = showRankItemButton => {
    return (
      showRankItemButton && (
        <div style={{display: "table-cell",
        verticalAlign: "middle"}}>
        <AddRank favStudent={student} handleRankChange={handleSetRankChange} />
        </div>
      )
    );
  }


  const showRankOutcome = (showRankOutcomeButton) => {
    return (
      showRankOutcomeButton &&  (
        <span className="avatar bg-blue-lt avatar-lg">{rank}</span>
      )
    )
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

  const handleSetRankChange = (e) => {
      indivRank({rank: Number(e), studentId: student._id})
  };


  return (
     <div className="list-list" style={{padding: "0 10px 0 0", border: "1px solid #eee"}} >
         {showRemoveButton(showRemoveItemButton)}
         <div className="d-flex flex-column">
    <div className="d-flex align-items-center mt-auto"> 
    <img src={student.videoImg} style={{height: "100px", marginRight: "1rem"}}/> 
    <div className="ml-3">
    <Link className="link" to={`/student/${student._id}`} target="_blank"> {student.studentid} </Link>
    {showDetails(showDetailsButton)}
    </div>
    <div className="ml-auto"> 
    {showRankButton(showRankItemButton)}
   
    {showRankOutcome(showRankOutcomeButton, rank)} 
    </div>
    </div>
    </div>
</div>
       
);
};

export default CardCheckout;
