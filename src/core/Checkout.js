import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter  } from 'react-router-dom';
import { isAuthenticated } from "../auth";
import SiteWrapper from '../templates/SiteWrapper';
import CardCheckout from "./CardCheckout"
import { getFavStudents, createSubmit, createOrder, getOrders } from "./apiCore";
import Modal from 'react-bootstrap/Modal';
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

const Checkout = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);
    const [loading, setLoading] = useState(true)

    const [redirectToProfile, setRedirectToProfile] = useState(false)
    const [error, setError] = useState(false)

    const { user, token } = isAuthenticated();
   
    const init = userId => {
        getFavStudents(user._id).then(data => {
            setLoading(false)
            setItems(data);
        });
    };

    const handleSetRank = (e) => {
        console.log(e)
        items.map((student, i) => {
          if (student._id === e.studentId) {
              items[i].rank = e.rank
            items[i].name = student.name 
            items[i].studentid = student.studentid }
        });
      };

    useEffect(() => {
        init();
    }, [run]);

    const buy = () => { 
        var d = new Date();
        const month = d.toLocaleString('default', { month: 'long' });
        var y = d.getFullYear() 
          const createOrderData = {
            students: items,
            transaction_id: y + month + " " + user.name,
          };
          createOrder(user._id, token, createOrderData).then(data => {
            if (data.error) {
              console.log(data.error);
              setError(true)
            } else {
              setRedirectToProfile(true);
            }
        });
    };

    const showItems = items => {
        return (
            <div>
            <div class="alert alert-secondary" role="alert" >
            <strong> 注文を確定する前に：</strong> <br/>

            パートナーポイントプログラムとは、Amazon.co.jpでのご購入の際に、対象クレジットカードのポイントでお支払いいただけるサービスです。利用可能なポイントを確認する場合、またはこの注文に使用するポイント数を変更する場合は、お支払い方法選択ページをご覧ください。
            nts
                </div>
                {items.length > 11 ? 
                <div class="alert alert-success" role="alert">
                <i class="fe fe-check-circle"></i> You have qualified for the 10% discount
                </div> : 
                <div class="alert alert-danger" role="alert">
                Add another {12 - items.length} students to qualify for the 10% discount!
                </div>
                }
                
                {items.map((s, index) => 
                    <CardCheckout key={index} student={s} showRemoveItemButton={false} 
                    showRankItemButton={true} indivRank={handleSetRank}
                    cartUpdate={true} setRun={setRun} run={run}/>
                )} 
                
        
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
             <div class="loading" style={{ display: loading ? "" : "none" }}>
            <div class="loaderSpin"></div>
        </div>
            <div className="my-3 my-md-5"></div>
            <div style={{ display: redirectToProfile ? 'none' : '' }} >
            <Container>
            <div className="progressbox">
                <div class="progresscontainer">
                    <ul class="progressbar">
                    <li> <a href="/checkout/preview" style={{color: "#495057"}}>Cart Check</a></li>
                    <li class="active">ランク</li>
                    <li class="active"> 申請</li>
                    </ul>
                </div>
            </div>
            <Grid.Row>
            <Grid.Col width={12} lg={9} sm={12}>
            {items.length > 0 ? showItems(items) : noItemsMessage()}
            </Grid.Col>
            <Grid.Col width={12} lg={3} sm={12}>
            <div style={{ position: "sticky",
                 top: "0", paddingTop: "2rem"}}>
            <button type="button" class="btn btn-dark btn-block" 
            onClick={() => { if (window.confirm('Are you sure you wish to submit?')) buy() } }>
                ASIA to JAPANに申請
            </button>
            </div>
            </Grid.Col>
            </Grid.Row>
            </Container>
            </div>
            <div style={{ display: redirectToProfile ? '' : 'none' }} >
            <div class="p-5 page text-center">
                <div class="container">
                    <h1 class="h1 mt-0 mb-4 display-1 text-muted mb-5">
                    <i class="fe fe-check-circle"></i>
                        </h1>
                    <h2 class="h2 mt-0 mb-6">We have received your submission!</h2>
                    <Link to="/" class="btn btn-outline-secondary"> <i class="fe fe-arrow-left mr-2"></i> Go back</Link>
                    </div>
                    </div>
            </div>
    </SiteWrapper>
    );
};

export default withRouter(Checkout);