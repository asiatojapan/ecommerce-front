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


const FavStudents = () => {
    const {  user: { _id, name, email, role, round } } = isAuthenticated();

    const [ success, setSuccess] = useState(false);

    const [run, setRun] = useState(false);

    const [ orders, setOrders] = useState({});

    const { user, token } = isAuthenticated();

    const [ favStudents, setFavStudents ] =  useState([]);
   
    const init = userId => {
        getFavStudents(user._id).then(data => {
            setFavStudents(data);
        });
    };

    const orderList = userId => {
      getOrders(user._id).then(data => {
          setOrders(data[data.length-1].favStudents);
      });
    };


    const showConfirmation = () => (
      <div class="alert alert-success alert-dismissible" role="alert" style={{ display: success ? "" : "none" }}>
        You have submitted your form to us! An email will be sent to {user.email} shortly.
    </div>
    );

    const submit = userId => {
        setSuccess(false);
        createSubmit(user._id, token).then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
              setSuccess(true);
              setTimeout(function () {
                if(window.location.hash != '#r') {
                    window.location.hash = 'r';
                    window.location.reload(1);
                }
            }, 1000);
            }
        });
    };

    const handleSetRank = (e) => {
      favStudents.map((student, i) => {
        if (student._id === e.studentId) {
            favStudents[i].rank = e.rank }
      });
    };

    const buy = () => { 
      var d = new Date();
      const month = d.toLocaleString('default', { month: 'long' });
      var y = d.getFullYear() 
        const createOrderData = {
          favStudents: favStudents,
          transaction_id: y + month + " " + user.name,
        };
        createOrder(user._id, token, createOrderData).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            setSuccess(true);
            setTimeout(function () {
              if(window.location.hash != '#r') {
                  window.location.hash = 'r';
                  window.location.reload(1);
              }
          }, 1000);
          }
      });
  };


    useEffect(() => {
        init();
    }, [run]);


    const confirmationButton = () =>
    (
      <div class="list-list">
      <div class="card-header">
      <h3 class="card-title">My Students</h3>
      <div class="card-options">
        {user.round === "Phase III" ?  <button type="button" class="btn btn-dark btn-lg disabled"
          >
            Submitted
          </button> : <button type="button" class="btn btn-dark btn-lg"
          onClick={() => { if (window.confirm('Are you sure you wish to submit?')) buy() } }>
            Submit
          </button>
      }  </div>
      </div>
        </div>
      )

    const favList = () => 
    ( <div >
          {user.round === "Phase III" ? 
              <div> {console.log(orders)} </div> : 
            <div> {favStudents.map((s, index) => 
              <CardCheckout key={s._id} student={s} indivRank={handleSetRank} setRun={setRun}
              run={run}/>
            )} </div>
            
            }</div>
    )
    



    return (

      <SiteWrapper>
      <Page.Content>
      <div className="my-3 my-md-5">
      <Container>
      {showConfirmation()}
      {confirmationButton()}
      {favList()}
      </Container>
      </div>
      </Page.Content>
      </SiteWrapper>

    );
};

export default FavStudents;
