import React from 'react'
import {NavLink} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import {
  Button,
Row,
Col,
Input
} from 'reactstrap';
const VerEstudiante = () => {
  return (
    <>
     <h4>Estudiante</h4>
     <div className="p-5">
     <Row>
      <Col>
        <NavLink to="/estudiante">
          <Button color="success">
            Crear Estudiante
          </Button>
        </NavLink>
      </Col>
      <Col className="text-end">
        <Input 
        placeholder = "Buscar Estudiante"
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
      <th scope="col">Nombre </th>
      <th scope="col">Apellido</th>
      <th scope="col">Fecha de Nacimiento</th>
      <th scope="col">Dirección</th>
      <th scope="col">Nacionalidad</th>
      <th scope="col">Código MINEDUC</th>
      <th scope="col">Encargado</th>
      
      
    </tr>
  </thead>
  <tbody class="table text-center">
    <tr>
      <th scope="row">12345678</th>
      <td>Pedro</td>
      <td>De alvarado </td>
      <td>24/08/2023</td>
      <td> Zona 8</td> 
    <td>Guatemalteco</td>
    <td>MGE1234</td>
    <td>
    <NavLink to="/encargadoinfo" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink>
    </td>
    </tr>
  </tbody>
</table> 
</div>
    </>
  )
}

export default VerEstudiante