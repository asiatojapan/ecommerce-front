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

    const formatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    });



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
          <button
            type="button"
            style={{ backgroundColor: 'white' }}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        );
      }
    


    const favList = () => 
    <div>
       <div class="list-list">
       <div style={{fontSize: "26px", fontWeight: "500"}} >面接予定の学生</div>
        </div>

       {orders.map((o,i) => 
        <div class="list-list">  
          <h4 style={{}}>{o.students.length} 学生<div class="list-floatLeft"> {formatter.format(new Date(Date.parse(o.createdAt)))}
          </div> </h4> <hr/>  
          <CardCheckout student={o.students[0]} showRemoveItemButton={false} 
           showRankItemButton={false} showDetailsButton={true} showRankOutcomeButton={false} />  <div style={{background: "linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255))", height: "110px", width: "100%"}}> </div>
        
          <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="1">View All</CustomToggle>
            <Accordion.Collapse eventKey="1">
            <div>{o.students.map((p, pIndex) => 
           <CardCheckout key={pIndex} student={p} showRemoveItemButton={false} 
           showRankItemButton={false} showDetailsButton={true} showRankOutcomeButton={false} rank={p.rank} />
         )}</div>
            </Accordion.Collapse>
        </Accordion>
    
           </div> )}
      
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
