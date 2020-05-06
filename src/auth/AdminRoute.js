import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticates } from "./index";
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const AdminRoute = ({ component: Component, logout, session, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticates() && session.role === 1 || isAuthenticates() && session.role === 4  ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminRoute);

