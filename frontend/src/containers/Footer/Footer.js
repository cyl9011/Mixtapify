import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import appRoutes from "../../shared/appRoutes";

import logo from "../../assets/images/logo.png";
import cart from "../../assets/images/cart.png";
import "./Footer.css";

const Footer = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div id="footerContainer">
        <Nav>
          <NavItem>
            <NavLink tag={RouterNavLink} to={appRoutes.home}>
              Contact Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
              T-Site Map
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
              Privacy Policy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
              Careers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
              Reviews
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
              Designed by Corey Emery, Updated by Alex Cabera
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default Footer;
