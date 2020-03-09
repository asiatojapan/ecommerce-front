import React from "react";
import ReactDOM from "react-dom";
import SiteWrapper from "../templates/SiteWrapper";

const Restricted = () => {


  return (
    <SiteWrapper>
        <div className="page" style={{height: "70vh"}}>
            <div className="container">
                <div className="row text-center">
                <div className="col text-center col-login mx-auto">
                    <h1>Your access has expired.</h1>
                      Please register with us at <a href="https://asiatojapan.com/"> ASIAtoJAPAN</a> or talk to one of our consultants.
                    </div>
                </div>
            </div>
            </div>
    </SiteWrapper>
  );
}

export default Restricted;
