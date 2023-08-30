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
const EncargadoInfor = () => {
  return (
    <>
    <h3>Información Encargado</h3>
    <Form className="bg-light p-5">

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
    Actualizar
  </Button>
</Form>
    
    
    </>
  )
}

export default EncargadoInfor