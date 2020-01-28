import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { readStudent,createSubmit } from "../core/apiCore";
import { Link } from "react-router-dom";
import CardMainStudent from '../templates/CardMainStudent';
import CardStudent from '../templates/CardStudent';
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


const LikedStudentsList = () => {
    const {
        user: { _id, name, email, role, round }
    } = isAuthenticated();

    const [ success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const [ likedstudents, setLikedstudents ] =  useState([]);


    const init = userId => {
        getUser(userId).then(data => {
            setLikedstudents(data.liked_students);
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
            }, 2000);
            }
        });
    };


    useEffect(() => {
        init(user._id);
    }, []);


    const confirmationButton = () =>
    (
      <div class="card">
            <div class="card-body p-3 d-flex align-items-center">
                    <div class="mr-3 lh-sm">
                      <div class="strong  align-items-center">
                        <h3>My Students</h3>
                      </div>
                    </div>
                    <div class="ml-auto">
                    { user.round === "Phase II" ?  <button type="button" class="btn btn-dark btn-lg"
                        onClick={() => { if (window.confirm('Are you sure you wish to submit?')) submit(user) } }>
                         Submit
                       </button>
                        : <button type="button" class="btn btn-dark btn-lg disabled"
                            >
                             Submitted
                           </button>
                 }
                    </div>
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
      {likedstudents.map((s, i) => (
        <div>
          <CardMainStudent student={s} />
          </div>
          ))}
      </Container>
          </div>
            </Page.Content>
          </SiteWrapper>

    );
};

export default LikedStudentsList;
