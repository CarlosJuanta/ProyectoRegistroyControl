import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function NavbarNav(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">E.O.U.M José Joaquín Palma</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {/* Agrega aquí tus elementos de navegación */}
          <NavItem>
            <NavLink href="/">Inicio</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/nosotros">Nosotros</NavLink>
          </NavItem>
          {/* Agrega más elementos de navegación según tus necesidades */}
        </Nav>
      </Collapse>
    </Navbar>
  );
}
export default NavbarNav;
