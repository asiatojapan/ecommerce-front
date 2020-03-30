import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { getGroupInterviewList } from "../core/apiCore"
import { read, update, updateUser } from '../user/apiUser';
import { isAuthenticates } from "../auth";

const Company = ({  match }) => {
    const [interviews, setInterviews] = useState([]);
    const { darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({})

  
    const loadInterviews = () => {
        getGroupInterviewList(match.params.userId, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setInterviews(data);
                setLoading(false)
            }
        });
    };

    const init = userId => {
        // console.log(userId);
        read(userId, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setUserData(data);
            }
        });
    };



    useEffect(() => {
        loadInterviews();
        init(match.params.userId);
    }, []);


    const listBreadCrumbs = () => {
        return (
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/mugicha">Home</a></li>
               <li class="breadcrumb-item active" aria-current="page"> {userData.name} Profile </li>
           
            </ol>
          </nav>
        );
    };
    
    return (
        <>  
          <NavMugicha>
            {listBreadCrumbs()}
            <section class="text-center">
        <div class="container">
          <h1 class="jumbotron-heading mb-0">{userData.name} </h1>
          <p>
          <a href={`/mugicha/companyprofile/${match.params.userId}`}class="btn btn-primary my-2"　> {userData.name} Profile </a>
          <a href={`/mugicha/company/${match.params.userId}`} className="btn btn-secondary my-2"> {userData.name}  面接リスト </a>
      
          </p>
        </div>
      </section>
           

              <ul class="list-group" style={{whiteSpace: "pre-wrap"}}>

                <li class="list-group-item">
                   <b>Homepage URL: </b>  <br/>
                    {userData.homepageUrl}
                </li>
                <li class="list-group-item">
                <b>選考ステップ / Steps: </b>  <br/>
                {userData.descriptionOne}
                </li>
                <li class="list-group-item">
                <b>１次面接内容 / First Interview Details: </b>  <br/>
                    {userData.descriptionTwo}
                </li>
                <li class="list-group-item">
                <b>２次面接内容 / Second Interview Details: </b>  <br/>
                {userData.descriptionThree}
                </li>
                <li class="list-group-item">
                <b>最終面接内容 / Final Interview Details: </b>  <br/>
                {userData.descriptionFour}
                </li>
                <li class="list-group-item">
                <b>参考/Please refer to this website in advance: </b>  <br/>
                {userData.descriptionFive}
                </li>
                <li class="list-group-item">
                <b>事業内容/Business Field: </b>  <br/>
                {userData.descriptionSix}
                </li>

                <li class="list-group-item">
                <b>JD: </b>  <br/>
                {userData.jdLink ? <a href={userData.jdLink} > 
                Job Description</a>  : "Not uploaded yet"}
                </li>
                </ul>
        </NavMugicha>
      </>
    );
  }
  
  export default Company;