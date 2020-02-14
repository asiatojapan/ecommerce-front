import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../auth";
import SiteWrapper from '../templates/SiteWrapper';
import CardCheckout from "./CardCheckout"
import { getFavStudents, createSubmit, createOrder, getOrders } from "./apiCore";
import {
    Page,
    Avatar,
    Icon,
    Grid,
    Text,
    Notification,
    Table,
    Alert,
    Progress,
    Container,
    Badge,
  } from "tabler-react";

const CheckoutPreview = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    const { user, token } = isAuthenticated();
   
    const init = userId => {
        getFavStudents(user._id).then(data => {
            setItems(data);
        });
    };

    useEffect(() => {
        init();
    }, [run]);

    const showItems = items => {
        return (
            <div class="list-list">
            <h3 class="card-title"></h3>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((s, index) => 
                    <CardCheckout key={index} student={s} showRemoveItemButton={true} cartUpdate={true} setRun={setRun} run={run}/>
                )} 
                <Link to="/" class="btn btn-dark">Continue shopping</Link>
            </div>
        );
    };

    const noItemsMessage = () => (
        <div class="list-list text-center p-5">
        <h2>
            Your cart is empty. 
            </h2>
            <Link to="/" class="btn btn-dark">Continue shopping</Link>
        
        </div>
    );

    return (
        <SiteWrapper>
            <div className="my-3 my-md-5"></div>
            <Container>
            <div className="progressbox">
                <div class="progresscontainer">
                    <ul class="progressbar">
                    <li class="active">Cart Check</li>
                    <li>ランク</li>
                    <li> 申請</li>
                    </ul>
                </div>
            </div>
            <Grid.Row>
            <Grid.Col width={12} lg={9} sm={12}>
            {items.length > 0 ? showItems(items) : noItemsMessage()}
            </Grid.Col>
            <Grid.Col width={12} lg={3} sm={12}>
            {items.length > 11 ? 
                <div class="alert alert-success" role="alert">
                <i class="fe fe-check-circle"></i> You have qualified for the 10% discount
                </div> : 
                <div class="alert alert-danger" role="alert">
                Add another {12 - items.length} students to qualify for the 10% discount!
                </div>
                }
              
                 <Link to="/checkout" class="btn btn-dark btn-block">Go to Checkout</Link>
              
            </Grid.Col>
            </Grid.Row>
            </Container>
    </SiteWrapper>
    );
};

export default CheckoutPreview;