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
const RegistrarFalta = () => {
  return (
    <>
    <h3>Formulario Registrar Falta </h3>
    <Form className="bg-light p-4">

  <Row>
    <Col md={3}>
      <FormGroup>
        <Label for="motivofalta">
          Motivo
        </Label>
        <Input
          placeholder="Motivo"
          type="text-area"
         
        />
      </FormGroup>
    </Col>
    <Col md={3}>
  <FormGroup>
    <Label for="Descripción">
      Descripción
    </Label>
    <Input
      type="textarea"
    
    />
  </FormGroup>
</Col>
</Row>
  <Button color="success">
    Registrar Falta
  </Button>
</Form>
    </>
  )
}

export default RegistrarFalta