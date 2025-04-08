import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import routes from "../../../data/routes";
import AppRoute from "../../types/AppRoute";
import { Link } from "react-router-dom";
import { getOauthUrl } from "../../utilities/oauthUtilities";
import { getPrimaryMembership } from "../../utilities/profileUtilities";
import { getBungieNameFromInfoCard } from "../../utilities/bungieNameUtilities";
import { useAppState } from "../../contexts/AppState";
import { useEffect } from "react";

export default function Header() {
  const groupedRoutes = Object.values(routes)
    .filter((x) => x.showInNav)
    .reduce((a: { [key: string]: AppRoute[] }, v) => {
      (a[v.group] ||= []).push(v);
      return a;
    }, {});

  const primaryProfile = getPrimaryMembership();
  const [appState, _] = useAppState();

  useEffect(() => {}, [appState.refreshHeader]);

  return (
    <Navbar expand="lg" sticky="top" className="border-bottom border-secondary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {import.meta.env.VITE_REACT_APP_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {groupedRoutes[""].map((navItem) => (
              <Nav.Link as={Link} to={navItem.url}>
                {navItem.text}
              </Nav.Link>
            ))}
            {Object.keys(groupedRoutes)
              .filter((x) => x != "")
              .map((navGroup) => (
                <NavDropdown title={navGroup} id="basic-nav-dropdown">
                  {groupedRoutes[navGroup].map((navItem) => (
                    <Nav.Link as={Link} to={navItem.url}>
                      {navItem.text}
                    </Nav.Link>
                  ))}
                </NavDropdown>
              ))}
          </Nav>
          <Nav>
            {primaryProfile ? (
              <Nav.Link as={Link} to="/settings">
                {getBungieNameFromInfoCard(primaryProfile)}
              </Nav.Link>
            ) : (
              <Nav.Link href={getOauthUrl()}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
