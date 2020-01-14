import React, { Fragment } from "react";
import Menu2 from "./Menu";
import {Helmet} from 'react-helmet';
import "../styles.css";

const Layout2 = ({
    className,
    children
  }) => (
  <div>

  <Helmet>
    <style>{'body { background-color: #F4F4F4; }'}</style>
  </Helmet>
    <Menu2/>
    <div>
      {children}
      <footer class="pv4 ph3 ph5-m ph6-l mid-gray">
        <small class="f6 db tc">© 2016 <b class="ttu">SOME COMPANY Inc</b>., All Rights Reserved</small>
        <div class="tc mt3">
          <a href="/language/" title="Language" class="f6 dib ph2 link mid-gray dim">Language</a>
          <a href="/terms/"    title="Terms" class="f6 dib ph2 link mid-gray dim">Terms of Use</a>
          <a href="/privacy/"  title="Privacy" class="f6 dib ph2 link mid-gray dim">Privacy</a>
        </div>
      </footer>

    </div>
  </div>
);

export default Layout2;
