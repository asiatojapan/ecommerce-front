import React from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import SiteWrapper from '../templates/SiteWrapper'
import {
  Nav,
  Container,
} from "tabler-react";
import "../styles.css";

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +active?: boolean,
  +LinkComponent?: React.ElementType,
  +subItems?: Array<subNavItem>,
  +useExact?: boolean,
|};

const navBarItems: Array<navItem> = [

  {
    value: "All",
    to: "/user/interviews",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Day 1",
    to: "/user/interviews/day1",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Day 2",
    to: "/user/interviews/day2",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
];

const InterviewNav =({ history, children }) => {
    return (
      <SiteWrapper>
        <Container>
          <div>
          <div class="list-list">
          <div style={{fontSize: "26px", fontWeight: "500"}} >面接</div>
          <Nav
            itemsObjects={navBarItems}
          />
          </div>
        {children}
        </div>
     </Container>
      </SiteWrapper>
    );
};

export default withRouter(InterviewNav);
