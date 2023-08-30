import React from 'react'
import {NavLink} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import {
  Button,
  Input,
  Col,
  Row,
} from 'reactstrap';
const Asistencia = () => {
  return (
    <> 
     <h4 >Asistencia</h4>
    
     <div className="p-5">
      <Row>
        <Col>
        <Button color="success">Guardar Asistencia</Button>
        </Col>
      </Row>
     
      <div style={{ marginTop: '20px' }}></div>
     <Row>
      <Col>
        <Input 
        type="date"
        placeholder="Fecha"/>
      </Col>
      <Col className="text-end">
      <Input
      placeholder="Seleccionar"
      type="select"
    >
      <option value="primero">Primero</option>
      <option value="segundo">Segundo</option>
      <option value="tercero">Tercero</option>
      <option value="cuarto">Cuarto</option>
      <option value="quinto">Quinto</option>
      <option value="sexto">Sexto</option>
    </Input>
      </Col>
      
    </Row>
     </div>
    <div class="table-responsive p-4">
    <table class="table  table-light table-sm align-middle ">
  <thead class="table-dark table text-center">
  
    <tr>
      <th scope="col">CUI</th>
      <th scope="col">Nombre </th>
      <th scope="col">Apellido</th>
      <th scope="col">Grado</th>
      <th scope="col">Fecha</th>
      <th scope="col">Asistencia</th>
      <th scope="col">Falta</th>
      
      
    </tr>
  </thead>
  <tbody class="table text-center table-primary">
    <tr>
      <th scope="row">12345678</th>
      <td>Pedro</td>
      <td>De alvarado </td>
      <td>Primero</td> 
      <td>24/08/2023</td>
    <td><input type= "checkbox"/></td>
    <td>
      <th ><NavLink to="/verfalta" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/registrarfalta" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th>
    </td>
    </tr>
    <tr>
    <th scope="row">87654321</th>
      <td>Cristobal</td>
      <td>Colón</td>
      <td>Primero</td> 
      <td>24/08/2023</td>
      <td><input type= "checkbox"/></td>
    <td>
    <th ><NavLink to="/verfalta" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/registrarfalta" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th>
    </td>
    </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>24/08/2023</td>
      <td><input type= "checkbox" /></td>
    <td>
      <th><NavLink to="/verfalta" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/registrarfalta" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th>
    </td>
    </tr>
  </tbody>
</table> 
</div>
    </>
  )
}

export default Asistencia