import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function NavbarNav(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    
      <Navbar className="navbar navbar-dark bg-dark " expand="md">
        <NavbarBrand className="ms-auto" href="/"> E.O.U.M José Joaquín Palma</NavbarBrand>
        
          <Nav className="ms-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Sesión
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Carlos Juantá</DropdownItem>
                <DropdownItem>Mi Perfil</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Cerrar Sesión</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav>Activo</Nav>
          
       </Navbar>
   
  );
}

export default NavbarNav;

