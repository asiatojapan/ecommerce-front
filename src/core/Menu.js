import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#1890ff" };
    } else {
        return { color: "#111" };
    }
};

const Menu2 = ({ history }) => (
  <div>
  <nav className="dt w-100 border-box pa3 ph5-ns shadow-5" style={{backgroundColor : "#fff"}}>
    <Link style={isActive(history, "/")} to="/" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" >Home</Link>
  <div className="dtc v-mid w-75 tr">
        {isAuthenticated() && isAuthenticated().user.role === 0 && (

                  <Link
                      className="nav-link"
                      style={isActive(history, "/user/dashboard")}
                      to="/user/dashboard" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
                  >
                      Dashboard
                  </Link>

          )}

          {!isAuthenticated() && (
            <Fragment>
              <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
              >
                  Signin
              </Link>
              <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
              >
                  Signup
              </Link>
      </Fragment>
      )}
      <Fragment>
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Link style={isActive(history, "/admin/dashboard")} to="/admin/dashboard" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"> Admin Dashboard</Link>
      )}

      {isAuthenticated() && (
              <span className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" onClick={() =>
                      signout(() => {
                          history.push("/");})}
              >  ログアウト
              </span>
      )}
      </Fragment>
  </div>
</nav>
</div>
);

export default withRouter(Menu2);
