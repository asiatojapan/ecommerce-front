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
    const [run, setRun] = useState(true);
    const [loading, setLoading] = useState(true)

    const { user, token } = isAuthenticated();
   
    const init = userId => {
        getFavStudents(user._id, token).then(data => {
            setLoading(false)
            setItems(data);
        });
    };

    useEffect(() => {
        init();
    }, [run]);

    const showItems = items => {
        return (
            <Grid.Col width={12} lg={9} sm={12}>
            <div class="list-list">
            <h3 class="card-title"></h3>
                <h2>現在検討中の学生<text style={{color: "#278bfa", fontWeight: "600"}}>{`${items.length}`}</text>名</h2>
                <hr />
                {items.map((s, index) => 
                    <CardCheckout key={index} student={s} showRemoveItemButton={true} cartUpdate={true} setRun={setRun} run={run} setLoading={setLoading} loading={loading}/>
                )} 
                <Link to="/" class="btn btn-dark">追加で学生と選ぶ</Link>
            </div>
            </Grid.Col>
        );
    };

    const noItemsMessage = () => (
        <Grid.Col width={12} lg={9} sm={12}>
        <div class="list-list text-center p-5">
        <h2>
        <h2>現在検討中の学生<text style={{color: "#278bfa", fontWeight: "600"}}>0</text>名</h2>
            </h2>
            <Link to="/" class="btn btn-dark">追加で学生と選ぶ</Link>
        
        </div>
        </Grid.Col>
    );
    const phaseI = () => (
    <div>
        <div className="progressbox">
        <div class="progresscontainer">
            <ul class="progressbar">
            <li class="active">検討中リスト</li>
            <li>確認画面</li>
            <li>申請</li>
            </ul>
        </div>
    </div>
        <Grid.Row>
        {items.length > 0 ? showItems(items) : noItemsMessage()}
        <Grid.Col width={12} lg={3} sm={12}>
        {items.length > 11 ? 
            <div class="alert alert-success" role="alert">
            <i class="fe fe-check-circle"></i> 名以上選抜すると10% OFF
            </div> : 
            <div class="alert alert-red" role="alert">
            Add another {12 - items.length} students to qualify for the 10% discount!
            </div>
            }
          
             <Link to="/checkout" class="unlikeBtn resumeGradient fullWidth">確認画面へ
             </Link>
          
        </Grid.Col>
        </Grid.Row>
        </div>
    )

    const phaseElse = () => (
        <div class="p-5 page text-center">
        <div class="container">
            <h1 class="h1 mt-0 mb-4 display-1 text-muted mb-5">
            <i class="fe fe-check-circle"></i>
                </h1>
            <h2 class="h2 mt-0 mb-6">申請ありがとうございます</h2>
            <Link to="/user/orders" class="resumeGradient unlikeBtn"> Your orders へ</Link>
            </div>
            </div>
   
    )

    return (
        <SiteWrapper>
            <div class="loading" style={{ display: loading ? "" : "none" }}>
                    <div class="loaderSpin"></div>
                </div>
            <div className="my-3 my-md-5"></div>
                    <div className="my-3 my-md-5"></div>
                    <Container>
              {user.round === "Phase I" ? phaseI() : phaseElse() }
            </Container>
    </SiteWrapper>
    );
};

export default CheckoutPreview;