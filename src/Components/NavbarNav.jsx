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
    </Navbar>
  );
}
export default NavbarNav;
