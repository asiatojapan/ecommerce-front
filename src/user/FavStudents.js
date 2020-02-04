import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { getFavStudents, createSubmit } from "../core/apiCore";
import { Link } from "react-router-dom";
import CardMainStudent from '../templates/CardMainStudent';
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


const FavStudents = () => {
    const {  user: { _id, name, email, role, round } } = isAuthenticated();

    const [ success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();


    const [ favStudents, setFavStudents ] =  useState([]);


    const init = userId => {
        getFavStudents(user._id).then(data => {
            setFavStudents(data);
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


    useEffect(() => {
        init();
    }, []);


    const confirmationButton = () =>
    (
      <div class="card">
      <div class="card-header">
                        <h3 class="card-title">My Students</h3>
                        <div class="card-options">
                        { user.round === "Phase II" ?  <button type="button" class="btn btn-dark btn-lg disabled"
                            >
                             Submitted
                           </button> : <button type="button" class="btn btn-dark btn-lg"
                            onClick={() => { if (window.confirm('Are you sure you wish to submit?')) submit(user) } }>
                             Submit
                           </button>

                     }  </div>
                        </div>
                      </div>

    )



    return (

      <SiteWrapper>
      <Page.Content>
      <div className="my-3 my-md-5">
      <Container>
      {showConfirmation()}
      {confirmationButton()}
      {favStudents.map((s) => {
        return <CardMainStudent key={s._id} student={s} />
      })}
      </Container>
      </div>
      </Page.Content>
      </SiteWrapper>

    );
};

export default FavStudents;
