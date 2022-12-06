import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import appRoutes from "../../shared/appRoutes";

import "./NavBar.css";

const NavBar = () => {

  return (
    <div id="nav">
      <div id="navbarContainer">
        <div className="bg-dark" color="bg-dark" expand="md">

          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.home}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.sender}>
                Sender
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.recipient}>
                Recipient
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.title}>
                Title
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.decorate}>
                Decorate
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.choose}>
                Choose
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.cassette}>
                Cassette
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
