import React from "react";
import ReactDOM from "react-dom";
import SiteWrapper from "../templates/SiteWrapper";
import Photo from "../templates/Logo.png"
const Welcome = () => {

  return (
    <div className="page" style={{height: "100vh"}}>
            <div class="container">
                <div class="row">
                    <div class="col text-center col-login mx-auto"><img src={Photo} />
                    <div style={{marginTop: "1rem"}}>
                    <a className="likeBtn link" href="/checkout/preview" style={{marginRight: "5px"}}> 検討リストへ </a>
                    <a className="resumeGradient unlikeBtn smaller" href="/" style={{marginLeft: "5px"}}> リストへ </a>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  );
}

export default Welcome;
