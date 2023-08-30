import React from 'react'
import {NavLink} from 'react-router-dom'
import {
  Button,
 Table,

} from 'reactstrap';
const Curso = () => {
  return (
    <>
   <div class="table-responsive p-5">
    <table class="table table-hover table-light table-sm align-middle table-striped">
  <thead class="table-dark">
    <tr>
      <th scope="col">Código Curso</th>
      <th scope="col">Nombre </th>
      <th scope="col">Descripción</th>
      <th scope="col">Grado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Matemáticas</td>
      <td>Matemáticas Básica</td>
      <td>Primero </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Idioma Español</td>
      <td>Enseñanza de grámatica y caligrafía</td>
      <td>Primero</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Ciencias Sociales</td>
      <td>Historia De Guatemala</td>
      <td>Primero</td>
    </tr>
  </tbody>
</table> 
<div className='p-4'>
<NavLink to="/crearcurso">
          <Button color="success">
            Crear Curso
          </Button>
        </NavLink>
 
</div>
</div>
    </>
  )
}

export default Curso