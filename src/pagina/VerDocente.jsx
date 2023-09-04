import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Col, Row, Button, Form } from "reactstrap";

import {NavLink} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
const VerDocente = () => {
  const [datos, setDatos] = useState("");

  const getDocentes = async () => {
    try {
      const response = await fetch(`${"http://localhost:3000/api/"}/docente/getall`);
      const data = await response.json();
      setDatos(data.resultado);
      console.log(data.resultado);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocentes();
  }, []);

  if (datos.length === 0) {
    return <h1>Cargando...</h1>;
  }
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
  {datos.map((docente) => (
            <tr key={docente.cuiDocente}>
              <td>{docente.cuiDocente}</td>
              <td>{docente.nombreDocente}</td>
              <td>{docente.apellidoDocente}</td>
              <td>{docente.telefonoDocente}</td>
              <td>{docente.correoDocente}</td>
              <td>{docente.direccionDocente}</td>
              <td>{docente.nacionalidadDocente}</td>
              <td><NavLink to="/gradodocente" className='text-dark rounded py-2 w-100 d-inline-block px-2 ' activeClassName='active'  style={{ textDecoration: 'none' }} ><FaIcons.FaEye className="me-2"/>Ver</NavLink> </td>
            </tr>
          ))}
  </tbody>
</table> 
</div>
    </>
  )
}

export default VerDocente