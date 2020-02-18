import React, { useState, useEffect }  from "react";
import { isAuthenticated, getUser } from "../auth";
import { NavLink, withRouter, Link } from "react-router-dom";
import CardStudent from '../templates/CardStudent';
import SiteWrapper from '../templates/SiteWrapper'
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Tab,
  Tabs,
  Table,
  Alert,
  Nav,
  Progress,
  Container,
  Badge,
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
          <div style={{fontSize: "26px", fontWeight: "500"}} >Interviews</div>
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
