import React from 'react'
import logo from '../Imagenes/logoescuela.png'; // Importa la imagen
import { Container, Row, Col} from 'reactstrap'

const Inicio = (props) => {
  return (
    <>
  <div class="card-group">
  <div class="card border-white">
  
    <div class="card-body">
      <h5 class="card-title text-center">MISIÓN</h5>
      <p class="card-text">Integrar un equipo de profesionales de la educación comprometidos con innovaciones metodológicas y actitudinales que permitan la formación integral de los estudiantes capaces de desenvolverse en cualquier aspecto que la vida les presente.</p>
    </div>

  </div>
  <div class="card text-center border-white">
    <img src={logo} class="card-img-top" alt="..."/>
    <div class="card-body ">
  <h5 class="card-title">EDUCACIÓN DE CALIDAD</h5>
</div>
  </div>
  <div class="card border-white">
  
    <div class="card-body">
      <h5 class="card-title text-center">VISIÓN</h5>
      <p class="card-text">Ser una institución educativa preocupada en la formación integral de los estudiantes sustentada en principios y valores que le permita el crecimiento individual, familiar y social para el desarrollo del país. </p>
    </div>
  </div>
</div>

</>
  )
}

export default Inicio