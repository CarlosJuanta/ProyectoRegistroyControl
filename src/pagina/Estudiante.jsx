import React from 'react'
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  Form,
} from 'reactstrap';
const Estudiante = () => {
  return (
    <>
    <h3>Formulario Registro Nuevo Estudiante</h3>
    <Form className="bg-light p-5">

  <Row>
    <Col md={3}>
      <FormGroup>
        <Label for="cui">
          CUI 
        </Label>
        <Input
          id="CUI"
          name="CUI"
          placeholder="CUI"
          type="text-area"
         
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
      <Label for="nombres">
          Nombres 
        </Label>
        <Input
          id="nombres"
          name="nombres"
          placeholder="Nombres"
          type="text-area"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="apellidos">
          Apellidos 
        </Label>
        <Input
          id="apellidos"
          name="apellidos"
          placeholder="Apellidos"
          type="text-area"
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
   
    <Col md={3}>
      <FormGroup>
      <Label for="fechaNac">
          Fecha Nacimiento
        </Label>
        <Input
          id="fechanac"
          name="fechanac"
          placeholder="Fecha Nacimiento"
          type="date"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="direccion">
         Direccion
        </Label>
        <Input
          id="direccion"
          name="direccion"
          placeholder="Dirección"
          type="text-area"
        />
      </FormGroup>
    </Col> 
    <Col md={3}>
      <FormGroup>
        <Label for="nacionalidad">
          Nacionalidad
        </Label>
        <Input
          id="nacionalidad"
          name="nacionalidad"
          placeholder="Nacionalidad"
          type="text-area"
        />
      </FormGroup>
    </Col>
  </Row> 
  <Row>
  
  </Row>
  <Row>
    <Col md={3}>
      <FormGroup>
        <Label for="codigomineduc">
          Código Mineduc
        </Label>
        <Input
          id="codigomineduc"
          name="codigomineduc"
          placeholder="Código Mineduc"
          type="text-area"
        />
      </FormGroup>
    </Col>
    
    
  </Row>
  
  <Row>
    <Col md={3}>
      <FormGroup>
        <Label for="cuiencargado">
          CUI Encargado
        </Label>
        <Input md={2}
          id="cuiencargado"
          name="cuiencargado"
          placeholder="CUI Encargado"
          type="text-area"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
      <Label for="nombresencargado">
          Nombres Encargado
        </Label>
        <Input
          id="nombresencargado"
          name="nombresencargado"
          placeholder="Nombres Encargado"
          type="text-area"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="apellidosencargado">
          Apellidos Encargado
        </Label>
        <Input
          id="apellidosencargado"
          name="apellidosencargado"
          placeholder="Apellidos Encargado"
          type="text-area"
        />
      </FormGroup>
    </Col>
  </Row>

  <Row>
  <Col md={5}>
      <FormGroup>
        <Label for="direccion">
         Direccion
        </Label>
        <Input
          id="direccion"
          name="direccion"
          placeholder="Dirección"
          type="text-area"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="correo">
         Correo
        </Label>
        <Input
          id="correo"
          name="correo"
          placeholder="ejemplo@gmail.com"
          type="email"
        />
      </FormGroup>
    </Col>
  </Row>
  
  <Button color="success">
    Registrar estudiante
  </Button>
</Form>
    
    
    </>
  )
}

export default Estudiante