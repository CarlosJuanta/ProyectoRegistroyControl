import React from 'react'
import {NavLink} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import {
  Button,
  Row,
  Col,
  Input,

} from 'reactstrap';
const Calificaciones = () => {
  return (
    <> 
     <h4>Calificaciones</h4> 
    <div className='p-5'>
<Row>
     <Col>
     <h5>Unidad</h5>
       <Input 
       type="select"
       placeholder    ="Unidad">
       <option value="primera">Primera</option>
     <option value="segunda">Segunda</option>
     <option value="tercera">Tercera</option>
     <option value="cuarta">Cuarta</option>
      </Input>
     </Col>
     <Col >
      <h5>Grado</h5>
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
     <div class="table-responsive p-5">
    <table class="table table-hover table-light table-sm align-middle table-striped">
  <thead class="table-dark table text-center">
    <tr>
      <th scope="col">CUI</th>
      <th scope="col">Nombre </th>
      <th scope="col">Apellido</th>
      <th scope="col">Grado</th>
      <th scope="col">Calificación</th>
    
      
    </tr>
  </thead>
  <tbody class="table text-center">
    <tr>
      <th scope="row">12345678</th>
      <td>Pedro</td>
      <td>De alvarado </td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th>
      </td>
     </tr>
    <tr>
    <th scope="row">87654321</th>
      <td>Cristobal</td>
      <td>Colón</td>
      <td>Primero</td> 
       <td>
       <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
       </td>
        </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
     <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
    <tr>
    <th scope="row">78654321</th>
      <td>Maria</td>
      <td>Méndez</td>
      <td>Primero</td> 
      <td>
      <th ><NavLink to="/vercalificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink></th>
      <th><NavLink to="/calificacioncurso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaPenAlt className="me-2"/>Registrar</NavLink></th> 
      </td>
    </tr>
  </tbody>
</table> 
</div>


    </>
  )
}

export default Calificaciones