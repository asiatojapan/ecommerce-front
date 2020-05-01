import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory  } from 'react-router-dom';
import { isAuthenticated, isAuthenticates } from "../auth";
import SiteWrapper from '../templates/SiteWrapper';
import CardCheckout from "./CardCheckout"
import { getFavStudents, createOrder } from "./apiCore";
import {
    Grid,
    Container,
  } from "tabler-react";
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
session
});

const mapDispatchToProps = dispatch => ({
logout: () => dispatch(logout())
});
    
const Checkout = ({ logout, session })=> {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);
    const [loading, setLoading] = useState(true)

    const [redirectToProfile, setRedirectToProfile] = useState(false)
    const [error, setError] = useState(false)

    const { darwin_myTk, darwin_uid } = isAuthenticates();
   
    const init = () => {
        getFavStudents(darwin_uid, darwin_myTk).then(data => {
            setLoading(false);
            setItems(data);
        });
    };

    const handleSetRank = (e) => {
       //  console.log(e)
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
            transaction_id: y + " " + month + " " + session.name,
          };
          createOrder(darwin_uid, darwin_myTk, createOrderData).then(data => {
            if (data.error) {
              console.log(data.error);
              setError(true)
            } else {
              setRedirectToProfile(true);
            }
        });
    };


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

    const showItems = items => {
        return (
            <div>
            <div className="alert alert-secondary" role="alert" >
            <strong> 申請する前に：</strong> <br/>

                マッチング精度向上のために、選抜頂いた学生と貴社の採用ニーズとの合致度　(1＝低、5＝高）をご記入くださいませ。
                <br/>
                ご不明点ございましたら、弊社の担当営業にご連絡いただければと存じます。
    
    
                </div>

                {session.specialPlan === true || session.role === 3 ? null : offer() }
        
                {items.map((s, index) => 
                    <CardCheckout key={index} student={s} showRemoveItemButton={false} 
                    showRankItemButton={true} indivRank={handleSetRank}
                    cartUpdate={true} setRun={setRun} run={run}/>
                )} 
                
        
            </div>
        );
    };

    const noItemsMessage = () => (
        <div className="list-list text-center p-5">
        <h2>現在検討中の学生<span style={{color: "#278bfa", fontWeight: "600"}}> 0 </span>名</h2>
        <Link to="/" className="likeBtn fullWidth link">追加で学生を選ぶ</Link>
        </div>
    );

    const phaseI = () => (
        <div>
        <div className="progressbox">
        <div className="progresscontainer">
            <ul className="progressbar">
            <a href="/checkout/preview" style={{color: "#495057"}}> <li> 検討中リスト</li></a>
            <li className="active">確認画面</li>
            <li className="active">申請</li>
            </ul>
        </div>
    </div>
        <Grid.Row>
        <Grid.Col width={12} lg={9} sm={12}>
        {items.length > 0 ? showItems(items) : noItemsMessage()}
        </Grid.Col>
        <Grid.Col width={12} lg={3} sm={12}>
        <div style={{ position: "sticky",
            top: "0", paddingTop: "1rem"}}>
        <button type="button" className="unlikeBtn resumeGradient fullWidth" 
        onClick={() => { if (window.confirm('Are you sure you wish to submit?'))  buy() } }>
            ASIA to JAPANに申請
        </button>
        </div>
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
            <Link to="/history/kentou" className="likeBtn smaller" style={{marginRight: "1rem"}}> 検討リスト履歴 へ</Link> 
            <Link to="/user/interviews" className="resumeGradient smaller unlikeBtn"> 面接予定の学生 へ</Link> 
          
             </div>
            </div>
    )

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
              setTimeout(function () {
                if(window.location.hash != '#r') {
                    window.location.hash = 'r';
                    window.location.reload(1);
                }
              }, 2000);
            }
        }
    };

    const afterSubmission = () => (
        <div style={{ display: redirectToProfile ? '' : 'none' }} >
            <div className="p-5 page text-center">
                <div className="container">
                    <h1 className="h1 mt-0 mb-4 display-1 text-muted mb-5">
                    <i className="fe fe-check-circle"></i>
                        </h1>
                    <h2 className="h2 mt-0 mb-6">申請ありがとうございます</h2>
                    <Link to="/" className="link"  className="likeBtn smaller"> <i className="fe fe-arrow-left mr-2"></i> TOP へ</Link>
                    </div>
                </div>
            </div>
    );

    return (
        <SiteWrapper>
             <div className="loading" style={{ display: loading ? "" : "none" }}>
            <div className="loaderSpin"></div>
             </div>
            <div className="my-3 my-md-5"></div>
            <div style={{ display: redirectToProfile ? 'none' : '' }} >
            <Container>
            {session.round === "Phase I" ? phaseI() : phaseElse() }
            </Container>
            </div>
            {afterSubmission()}
            {redirectUser()}
    </SiteWrapper>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Checkout);