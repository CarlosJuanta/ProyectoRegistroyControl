import React from 'react'
import {NavLink} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import {
  Button,
Row,
Col,
Input
} from 'reactstrap';
const VerDocente = () => {
  return (
    <>
     <h4>Docente</h4>
     <div className="p-5">
     <Row>
      <Col>
        <NavLink to="/docente">
          <Button color="success">
            Registrar Docente
          </Button>
        </NavLink>
      </Col>
      <Col className="text-end">
        <Input 
        placeholder = "Buscar Docente"
        type="text-area"
        />
      </Col>
      
    </Row>
     </div>
    <div class="table-responsive p-5">
    <table class="table table-hover table-light table-sm align-middle table-striped">
  <thead class="table-dark table text-center">
  
    <tr>
      <th scope="col">CUI</th>
      <th scope="col">Nombres </th>
      <th scope="col">Apellidos</th>
      <th scope="col">Teléfono</th>
      <th scope="col">Correo</th>
      <th scope="col">Dirección</th>
      <th scope="col">Nacionalidad</th>
      <th scope="col">Grados Asignados</th>
    </tr>
  </thead>
  <tbody class="table text-center">
    <tr>
      <th scope="row">12345678</th>
      <td>Cristobal</td>
      <td>Colón</td>
      <td>55458485</td>
      <td>cristobal@umg.com</td> 
    <td>Zona 10</td>
    <td>Guatemalteco</td>
    <td>
    <NavLink to="/gradodocente" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink>
    </td>
    </tr>
  </tbody>
</table> 
</div>
    </>
  )
}

export default VerDocente