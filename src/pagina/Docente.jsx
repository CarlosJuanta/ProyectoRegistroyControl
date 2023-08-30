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
const Docente = () => {
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
          type="text-area"
         
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
          type="text-area"
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
          type="text-area"
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
   
    <Col md={3}>
      <FormGroup>
      <Label for="telefonodocente">
          Telefono
        </Label>
        <Input
          id="telefonodocente"
          name="telefonodocente"
          placeholder="Telefono Docente"
          type="text-area"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="correodocente">
         Correo
        </Label>
        <Input
          id="correodocente"
          name="correodocente"
          placeholder="Correo Docente"
          type="email"
        />
      </FormGroup>
    </Col> 
    <Col md={3}>
      <FormGroup>
        <Label for="direcciondocente">
         Dirección
        </Label>
        <Input
          id="direcciondocente"
          name="direcciondocente"
          placeholder="ej. docente@gmail.com"
          type="email"
        />
      </FormGroup>
    </Col> 
    <Col md={3}>
      <FormGroup>
        <Label for="nacionalidaddocente">
          Nacionalidad
        </Label>
        <Input
          id="nacionalidaddocente"
          name="nacionalidaddocente"
          placeholder="Nacionalidad Docente"
          type="text-area"
        />
      </FormGroup>
    </Col>
  </Row> 
  
  <Button color="success">
    Registrar Docente
  </Button>
</Form>
    </>
  )
}

export default Docente
