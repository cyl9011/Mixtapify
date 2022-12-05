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
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div id="redBlock"></div>
      <div id="navbarContainer">
        <Navbar color="dark" expand="md">
          <NavbarBrand tag={RouterNavLink} to={appRoutes.home}>
            <img src={logo} alt="logo" />
            <h1>Scotty Shirts U Illustrate (SSUI)</h1>

          </NavbarBrand>
          <div id="shoppingCartContainer">
              <NavLink tag={RouterNavLink} to={appRoutes.cart}>
                <img src={cart} alt="cart" />
              </NavLink>
              <div id="cartQuantity"></div>
            </div>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.product}>
                T-SHIRTS
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
                CREATE FROM PICTURE
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
                CREATE YOUR OWN
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
                ABOUT US
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to={appRoutes.notImplemented}>
                LOG IN
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBar;
