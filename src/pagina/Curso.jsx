import React from 'react'
import {
  Button,
 Table,
} from 'reactstrap';
const Curso = () => {
  return (
    <>
    <table class="table">
  <thead>
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
 <Button>
  Crear Curso
 </Button>
    </>
  )
}

export default Curso