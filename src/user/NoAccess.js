import React from "react";
import ReactDOM from "react-dom";
import SiteWrapper from "../templates/SiteWrapper";

const NoAccess = () => {


  return (
    <SiteWrapper>
        <div className="page" style={{height: "70vh"}}>
            <div className="container">
                <div className="row text-center">
                <div className="col text-center col-login mx-auto">
                    <h1>OOPS!</h1>
                     </div>
                </div>
            </div>
            </div>
    </SiteWrapper>
  );
}

export default NoAccess;
