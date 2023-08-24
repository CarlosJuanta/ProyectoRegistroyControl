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
    <h3>Formulario Registro Nuevo Docente</h3>
    <Form className="bg-light p-4">

  <Row>
    <Col md={3}>
      <FormGroup>
        <Label for="cuidocente">
          CUI Docente
        </Label>
        <Input
          id="cuidocente"
          name="cuidocente"
          placeholder="CUI Docente"
          type="text"
         
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
      <Label for="nombresdocente">
          Nombres 
        </Label>
        <Input
          id="nombresdocente"
          name="nombredocente"
          placeholder="Nombres Docente"
          type="text"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="apellidosdocente">
          Apellidos 
        </Label>
        <Input
          id="apellidosdocente"
          name="apellidosdocente"
          placeholder="Apellidos Docente"
          type="text"
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
   
    <Col md={3}>
      <FormGroup>
      <Label for="telefonodocente">
          Fecha Nacimiento
        </Label>
        <Input
          id="telefonodocente"
          name="telefonodocente"
          placeholder="Telefono Docente"
          type="text"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="correodocente">
         Direccion
        </Label>
        <Input
          id="correodocente"
          name="correodocente"
          placeholder="Correo Docente"
        />
      </FormGroup>
    </Col> 
    <Col md={3}>
      <FormGroup>
        <Label for="direcciondocente">
          Nacionalidad
        </Label>
        <Input
          id="direcciondocente"
          name="direcciondocente"
          placeholder="Direccion Docente"
        />
      </FormGroup>
    </Col>
  </Row> 
  
  <Button>
    Registrar Docente
  </Button>
</Form>
    </>
  )
}

export default Estudiante