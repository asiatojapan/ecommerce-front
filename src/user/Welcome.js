import React from "react";
import ReactDOM from "react-dom";
import SiteWrapper from "../templates/SiteWrapper";

const Welcome = () => {

  return (
    <div className="page" style={{height: "100vh"}}>
       <div class="page-single">
            <div class="container">
                <div class="row">
                    <div class="col text-center col-login mx-auto">
                    <h1>ご登録ありがとうざいます</h1>
                    <a className="likeBtn" href="/"> リストへ </a>
                    </div>
                </div>
            </div>
        </div>
      </div>
  );
}

export default Welcome;
