import React, { useState, useEffect } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { isAuthenticated, isAuthenticates } from "../auth";
import SiteWrapper from '../templates/SiteWrapper';
import CardCheckout from "./CardCheckout"
import { getFavStudents, createOrder, } from "./apiCore";
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
            transaction_id: y + month + " " + session.name,
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

    const changePhase = () => {
            var data = window.localStorage.getItem('jwt');
            if (data != null) {
                let jwt= JSON.parse(data);
                jwt.user.round = "Phase II";
                window.localStorage.setItem('jwt', JSON.stringify(jwt));
                console.log(jwt.user)
            } 
    }

    const showItems = items => {
        return (
            <div>
            <div className="alert alert-secondary" role="alert" >
            <strong> 注文を確定する前に：</strong> <br/>

            パートナーポイントプログラムとは、Amazon.co.jpでのご購入の際に、対象クレジットカードのポイントでお支払いいただけるサービスです。利用可能なポイントを確認する場合、またはこの注文に使用するポイント数を変更する場合は、お支払い方法選択ページをご覧ください。
            nts
                </div>
                {items.length > 11 ? 
                <div className="alert alert-success" role="alert">
                <i className="fe fe-check-circle"></i> You have qualified for the 10% discount
                </div> : 
                <div className="alert alert-red" role="alert">
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
        <div className="list-list text-center p-5">
        <h2>現在検討中の学生<span style={{color: "#278bfa", fontWeight: "600"}}>0</span>名</h2>
        <Link to="/" className="likeBtn fullWidth">追加で学生と選ぶ</Link>
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
        onClick={() => { if (window.confirm('Are you sure you wish to submit?')) buy() } }>
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
            <div style={{ display: redirectToProfile ? 'none' : '' }} >
            <Container>
            {session.round === "Phase I" ? phaseI() : phaseElse() }
            </Container>
            </div>
            <div style={{ display: redirectToProfile ? '' : 'none' }} >
            <div className="p-5 page text-center">
                <div className="container">
                    <h1 className="h1 mt-0 mb-4 display-1 text-muted mb-5">
                    <i className="fe fe-check-circle"></i>
                        </h1>
                    <h2 className="h2 mt-0 mb-6">申請ありがとうございます</h2>
                    <Link to="/" className="link"  className="btn btn-outline-secondary"> <i className="fe fe-arrow-left mr-2"></i> TOP へ</Link>
                    </div>
                    </div>
            </div>
    </SiteWrapper>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Checkout);