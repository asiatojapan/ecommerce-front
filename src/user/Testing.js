import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const Testing = ({ session }) => {

  return (
    <div className="page" style={{height: "100vh"}}>
          <h1>Hi {session.name}</h1>
    <p>You are now logged in!</p>
      </div>
  );
}

export default connect(
  mapStateToProps,
)(Testing);
