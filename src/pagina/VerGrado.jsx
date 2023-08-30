import React from 'react'
import {NavLink} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import {
  Button,
Row,
Col,
Input
} from 'reactstrap';
const VerGrado = () => {
  return (
    <>
     <h4>Grado</h4>
     <div className="p-5">
     <Row>
      <Col>
        <NavLink to="/grado">
          <Button color="success">
            Crear Grado
          </Button>
        </NavLink>
      </Col>
      <Col className="text-end">
        <Input 
        placeholder = "Buscar Grado"
        type="text-area"
        />
      </Col>
      
    </Row>
     </div>
    <div class="table-responsive p-5">
    <table class="table table-hover table-light table-sm align-middle table-striped">
  <thead class="table-dark table text-center">
  
    <tr>
      <th scope="col">Código Grado</th>
      <th scope="col">Nombre </th>
      <th scope="col">Descripción</th>
      <th scope="col">Sección</th>
      <th scope="col">Plan de Estudio</th>
    </tr>
  </thead>
  <tbody class="table text-center">
    <tr>
      <th scope="row">12345</th>
      <td>Segundo</td>
      <td>Segundo Primaria </td>
      <td>B</td>
    <td>
    <NavLink to="/grado" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaArrowAltCircleDown className="me-2"/>Descargar</NavLink>
    </td>
    </tr>
  </tbody>
</table> 
</div>
    </>
  )
}

export default VerGrado