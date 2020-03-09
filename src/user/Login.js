import React from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const Login = ({ logout, session }) => (
  <>
    <h1>Hi {session.username}!</h1>
    <p>You are logged in</p>
    {session.email} {session.role}
    <Link to="/dashboardnew">Home</Link>
    <button onClick={logout}>Logout</button>
  </>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
