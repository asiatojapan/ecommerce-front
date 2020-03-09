import React, { useState, useEffect }  from "react";
import { isAuthenticates  } from "../auth";
import { getOrders } from "../core/apiCore";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import CardCheckout from '../core/CardCheckout';
import {
  Container,
  Page,
} from "tabler-react";
import SiteWrapper from '../templates/SiteWrapper'
import "../styles.css";


const Orders = () => {

    const [ orders, setOrders] = useState([]);

    const { darwin_myTk, darwin_uid } = isAuthenticates();

    const [ loading, setLoading] =  useState(true);

    const [expanded, setExpanded] = useState(false)

    const formatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });

    const init = userId => {
        getOrders(darwin_uid, darwin_myTk).then(data => {
            setLoading(false)
            setOrders(data);
        });
    };

    useEffect(() => {
        init();
    }, []);

    const CustomToggle = ({ children, eventKey }) => {
        const decoratedOnClick = useAccordionToggle(eventKey)
        return (
          <a
            type="button"
            onClick={decoratedOnClick} 
          >{children}<i className="fe fe-chevrons-down" style={{"fontSize": "26px", "color": "#278bfa"}}></i>
          </a>
        );
      }
    


    const favList = () => 
    <div>
       <div className="list-list">
       <div style={{fontSize: "26px", fontWeight: "500"}} >面接予定の学生</div>
        </div>

       {orders.map((o,i) => 
        <Accordion defaultActiveKey="0">
          <div className="list-list">  
          <div style={{"display": "inline-block"}}>
          <span style={{"fontSize": "18px"}} >
          {formatter.format(new Date(Date.parse(o.createdAt)))} </span> <br/>
          <span style={{"color": "#278bfa"}} >{o.students.length} 学生  </span>
           </div> 
          <div className="list-floatLeft" style={{"marginTop": "0.7em"}}> 
           <CustomToggle eventKey="1"></CustomToggle>
         
           </div>  

            <Accordion.Collapse eventKey="1">
            <div> <hr/>{o.students.map((p, pIndex) => 
            <CardCheckout key={pIndex} student={p} showRemoveItemButton={false} 
            showRankItemButton={false} showDetailsButton={true} showRankOutcomeButton={false} rank={p.rank} />
          )}</div>
            </Accordion.Collapse>
           </div>
           </Accordion> )}
      
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

export default Orders;
