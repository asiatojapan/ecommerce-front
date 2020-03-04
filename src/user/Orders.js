import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getOrders } from "../core/apiCore";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import CardCheckout from '../core/CardCheckout';
import {
  Container,
  Page,
  Grid,
  Card,
  Stamp,
  ContactCard,
  Timeline, Button
} from "tabler-react";
import SiteWrapper from '../templates/SiteWrapper'
import "../styles.css";
import { render } from "react-dom";


const Orders = () => {
    const {  user: { _id, name, email, role, round } } = isAuthenticated();

    const [ orders, setOrders] = useState([]);

    const { user, token } = isAuthenticated();

    const [ loading, setLoading] =  useState(true);

    const [expanded, setExpanded] = useState(false)

    const formatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });

    const showButton = () => {
      console.log(expanded)
      setExpanded(!expanded)
    }


    const init = userId => {
        getOrders(user._id, token).then(data => {
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
          >{children}<i class="fe fe-chevrons-down" style={{"fontSize": "26px", "color": "#278bfa"}}></i>
          </a>
        );
      }
    


    const favList = () => 
    <div>
       <div class="list-list">
       <div style={{fontSize: "26px", fontWeight: "500"}} >面接予定の学生</div>
        </div>

       {orders.map((o,i) => 
      <Accordion defaultActiveKey="0">
          <div class="list-list">  
          <div style={{"display": "inline-block"}}>
          <text style={{"fontSize": "18px"}} >
          {formatter.format(new Date(Date.parse(o.createdAt)))} </text> <br/>
          <text style={{"color": "#278bfa"}} >{o.students.length} 学生  </text>
           </div> 
          <div class="list-floatLeft" style={{"marginTop": "0.7em"}}> 
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
      <div class="loading" style={{ display: loading ? "" : "none" }}>
            <div class="loaderSpin"></div>
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
