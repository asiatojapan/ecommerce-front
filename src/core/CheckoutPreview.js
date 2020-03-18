import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, isAuthenticates } from "../auth";
import SiteWrapper from '../templates/SiteWrapper';
import CardCheckout from "./CardCheckout"
import { getFavStudents } from "./apiCore";
import {
    Grid,
    Container
  } from "tabler-react";

import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
session
});

const mapDispatchToProps = dispatch => ({
logout: () => dispatch(logout())
});
  
const CheckoutPreview = ({ logout, session }) => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(true);
    const [loading, setLoading] = useState(true)

    const { darwin_myTk, darwin_uid } = isAuthenticates();
   
    const init = () => {
        getFavStudents(darwin_uid, darwin_myTk).then(data => {
            setLoading(false)
            setItems(data);
        });
    };

    useEffect(() => {
        init();
        console.log(run)
    }, [true]);

    const showItems = items => {
        return (
            <Grid.Col width={12} lg={9} sm={12}>
            <div className="list-list">
            <h3 className="card-title"></h3>
                <h2>現在検討中の学生<span style={{color: "#278bfa", fontWeight: "600"}}>{`${items.length}`}</span>名</h2>
                <hr />
                {items.map((s, index) => 
                    <CardCheckout key={index} student={s} showRemoveItemButton={true} cartUpdate={true} setRun={setRun} run={run} setLoading={setLoading} loading={loading}/>
                )} 
                <Link to="/" className="link likeBtn fullWidth">追加で学生を選ぶ</Link>
            </div>
            </Grid.Col>
        );
    };

    const noItemsMessage = () => (
        <Grid.Col width={12} lg={9} sm={12}>
        <div className="list-list span-center p-5">
        <h2>現在検討中の学生<span style={{color: "#278bfa", fontWeight: "600"}}>0</span>名</h2>
            <Link to="/"  className="link likeBtn fullWidth">追加で学生を選ぶ</Link>
        </div>
        </Grid.Col>
    );

    const offer = () => {
        if (items.length > 11 ) {
            return ( <div className="alert alert-success" role="alert">
            <i className="fe fe-check-circle"></i> 12名選抜して頂きましたので成功報酬費用より 10% OFFいたします！
        </div> )}
        else {
           return( <div className="alert alert-red" role="alert">
            10% OFFまであと {12 - items.length} 名
            </div>)
        }
    }


    const phaseI = () => (
    <div>
        <div className="progressbox">
        <div className="progresscontainer">
            <ul className="progressbar">
            <li className="active">検討中リスト</li>
            <li>確認画面</li>
            <li>申請</li>
            </ul>
        </div>
    </div>
        <Grid.Row>
        {items.length > 0 ? showItems(items) : noItemsMessage()}
        <Grid.Col width={12} lg={3} sm={12}>

        {session.specialPlan === true ? null : offer() }
    
             <Link to="/checkout" className=" unlikeBtn resumeGradient fullWidth">確認画面へ
             </Link>
        </Grid.Col>
        </Grid.Row>
        </div>
    )

    const phaseElse = () => (
        <div className="p-5 page text-center">
        <div className="container">
            <h1 className="h1 mt-0 mb-4 display-1 text-muted mb-5">
            <i className="fe fe-check-circle"></i>
                </h1>
            <h2 className="h2 mt-0 mb-6">申請ありがとうございます</h2>
            <h3>申請後、学生を追加する場合はASIAtoJAPANまでご連絡ください</h3>
            <Link to="/user/history" className="resumeGradient unlikeBtn"> 面接予定の学生 へ</Link>
         </div>
    </div>
   
    )

    return (
        <SiteWrapper>
            <div className="loading" style={{ display: loading ? "" : "none" }}>
                    <div className="loaderSpin"></div>
                </div>
            <div className="my-3 my-md-5"></div>
                    <div className="my-3 my-md-5"></div>
                    <Container>
              {session.round === "Phase I" ? phaseI() : phaseElse() }
            </Container>
    </SiteWrapper>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckoutPreview);
