import React from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import appRoutes from "../../lib/appRoutes";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div id="nav">
      <div id="navbarContainer">
        <div className="bg-dark" color="bg-dark" expand="md">
          <Nav className="me-auto" navbar>
            {Object.values(appRoutes)
              .filter((page) => !page.route.includes(":"))
              .map((page) => {
                return (
                  <NavItem>
                    <NavLink tag={RouterNavLink} to={page.route}>
                      {page.page}
                    </NavLink>
                  </NavItem>
                );
              })}
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;