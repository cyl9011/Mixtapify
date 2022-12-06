import React from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import appRoutes from "../../lib/appRoutes";

import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const curRoute = location.pathname.replaceAll("/", "");

  return (
    <div id="nav">
      <div id="navbarContainer">
        <Nav className="me-auto" navbar>
          {Object.values(appRoutes)
            .filter(
              (page) =>
                !(
                  page.route.includes(":") ||
                  page.route.includes("not-implemented")
                )
            )
            .map((navItem) => {
              const { route, page } = navItem;
              const onCurRoute = route.replaceAll("/", "") === curRoute;

              return (
                <NavItem key={page}>
                  <NavLink
                    tag={RouterNavLink}
                    to={route}
                    className={onCurRoute ? "enabled-link" : "disabled-link"}
                  >
                    {page}
                  </NavLink>
                </NavItem>
              );
            })}
        </Nav>
      </div>
    </div>
  );
};

export default NavBar;
