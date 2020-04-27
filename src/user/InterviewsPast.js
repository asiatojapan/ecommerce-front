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

    const [expanded, setExpanded] = useState(false)

    const formatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });

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
       <div style={{fontSize: "26px", fontWeight: "600"}}>面接 履歴</div>
        </div>

       {orders.map((o,i) => 
    
          <div className="list-list">  
          <div style={{"display": "inline-block"}}>
          <span style={{"fontSize": "18px"}} >
          {o.period} </span> <br/>
          <span style={{"color": "#278bfa"}} >{o.count} 学生  </span>
           </div> 
          <div className="list-floatLeft" style={{"marginTop": "0.7em"}}> 
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
        {favList()}
      </Container>
      </div>
      </Page.Content>
      </SiteWrapper>

    );
};

export default InterviewsPast;
