import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider, Avatar
} from "tabler-react";

import type { NotificationProps } from "tabler-react";
import logo from './Logo.png'

type Props = {|
  +children: React.Node,
|};

type State = {|
  notificationsObjects: Array<NotificationProps>,
|};

type subNavItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +LinkComponent?: React.ElementType,
  +useExact?: boolean,
|};

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +active?: boolean,
  +LinkComponent?: React.ElementType,
  +subItems?: Array<subNavItem>,
  +useExact?: boolean,
|};


const { user, token } = isAuthenticated();

const navBarItems: Array<navItem> = [
  {
    value: "List",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Saved Students",
    to: "/user/students",
    icon: "flag",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Interview Students",
    to: "/user/interviews",
    icon: "check-circle",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Schedule",
    to: "/gallery",
    icon: "file-text",
    LinkComponent: withRouter(NavLink),
  },
];

const accountDropdownProps = {
  avatarURL:  <span class="avatar">BM</span>,
  name: isAuthenticated() ? user.name : "" ,
  description: isAuthenticated() ? user.role === 1 ? "Admin" : "User" : "",
  options: [
    { icon: "user", value: "Profile", to: "/profile" },
    { icon: "settings", value: "Settings" },
    { isDivider: true },
    { icon: "help-circle", value: "Need help?" },
    { icon: "log-out", value: "Sign out", to: "/logout"

    },
  ],
};

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#1890ff" };
    } else {
        return { color: "#111" };
    }
};


const SiteWrapper = ({ history, children }) => (
<Fragment>
  {isAuthenticated() && (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "",
          imageURL: logo,
          accountDropdown: accountDropdownProps,
          navItems: (
            <Nav.Item type="div" className="d-none d-md-flex">
            <div onClick={() =>
                    signout(() => {
                        history.push("/");})}
            >  Log Out
            </div>
            </Nav.Item>
          ),
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          copyright: (
            <React.Fragment>
              ASIAtoJAPAN
            </React.Fragment>
          ),
          nav: (
            <React.Fragment>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto={true}>
                <Button
                  href="https://github.com/tabler/tabler-react"
                  size="sm"
                  outline
                  color="primary"
                  RootComponent="a"
                >
                  Help
                </Button>
              </Grid.Col>
            </React.Fragment>
          ),
        }}
      >
      {children}
      </Site.Wrapper>)}
        </Fragment>
);

export default SiteWrapper;
