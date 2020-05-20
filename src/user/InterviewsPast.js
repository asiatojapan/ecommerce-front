import React, { useState, useEffect }  from "react";
import { isAuthenticates  } from "../auth";
import { getMyInterviewsPast } from "../core/apiCore";
import {
  Container,
  Page,
} from "tabler-react";
import SiteWrapper from '../templates/SiteWrapper'
import "../styles.css";


const InterviewsPast = () => {

    const [ orders, setOrders] = useState([]);

    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const [ loading, setLoading] =  useState(true);

 
    const init = () => {
        getMyInterviewsPast(darwin_uid, darwin_myTk).then(data => {
            setLoading(false)
            setOrders(data);
        });
    };

    useEffect(() => {
        init();
    }, []);

  


    const favList = () => 
    <div>
       <div className="list-list">
            <h2 style={{marginBottom: "0"}}>面接履歴</h2>
        </div>
        {orders.map((o,i) => 
    
          <div className="list-list">  
          <div style={{"display": "inline-block"}}>
          <span style={{"fontSize": "18px"}} >
          {o.period} </span> <br/>
          <span style={{"color": "#278bfa"}} >{o.count} 学生  </span>
           </div> 
          <div className="list-floatLeft" style={{"marginTop": "0.2em"}}> 
           <a href={'/history/interview/' + o._id} className="likeBtn smaller"> View more</a>
           </div>  

           </div>)}
      
    </div>

    return (

      <SiteWrapper>
      <Page.Content>
      <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
        </div>
      <div className="my-3 my-md-5">
      <Container>
      <ol class="breadcrumb" aria-label="breadcrumbs">
        <li class="breadcrumb-item"><a href="/user/interviews">面接予定</a></li>
        <li class="breadcrumb-item active" aria-current="page">面接履歴</li>
      </ol>
        {favList()}
      </Container>
      </div>
      </Page.Content>
      </SiteWrapper>

    );
};

export default InterviewsPast;
