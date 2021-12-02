import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useUserContext } from "../../context/user";
import { AppRoutes } from "../../routing/routes";
import AppAnchor from "../bootstrap/anchor";
import AppNavLink from "../bootstrap/app-nav-link";

export function AppNavBar() {
  const userContext = useUserContext();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Recon Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <AppNavLink to={AppRoutes.HOME}>Home</AppNavLink>
            <AppNavLink to={AppRoutes.OPERATIONS_LIST}>Operations</AppNavLink>
          </Nav>
          {userContext?.user && (
            <Nav className="justify-content-end">
              <NavDropdown title={userContext.user.name} id="user-dropdown">
                <NavDropdown.Item as={AppAnchor} to={AppRoutes.USER_SELECT}>
                  Change user
                </NavDropdown.Item>
                <NavDropdown.Item onClick={userContext.signOut}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
