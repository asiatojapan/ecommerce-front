import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getFavStudents, createSubmit, createOrder, getOrders } from "../core/apiCore";
import { Link } from "react-router-dom";
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

    const [ success, setSuccess] = useState(false);


    const [ orders, setOrders] = useState([]);

    const { user, token } = isAuthenticated();

    const [ favStudents, setFavStudents ] =  useState([]);
   
    const init = userId => {
        getOrders(user._id).then(data => {
            setOrders(data);
        });
    };

    useEffect(() => {
        init();
    }, []);


    const favList = () => 
    <div>
       <div class="list-list">
       <h3 class="card-title">Your Orders</h3>
        </div>

       {orders.map((o,i) => 
        <div class="list-list">
          {o.students.map((p, pIndex) => <div> {p._id}{p.name} </div>)}
          
          {o.students.length} < a href={`/order/${o._id}`}> See </a></div> )}
      
    </div>

    return (

      <SiteWrapper>
      <Page.Content>
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
