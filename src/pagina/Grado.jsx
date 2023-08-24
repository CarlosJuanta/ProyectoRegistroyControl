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
    <h3>Formulario Crear Grado</h3>
    <Form className="bg-light p-4">

  <Row>
    <Col md={3}>
      <FormGroup>
        <Label for="codigogrado">
          Código Grado
        </Label>
        <Input
          id="codigogrado"
          name="codigogrado"
          placeholder="Código Grado"
          type="text"
         
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
      <Label for="Nombre Grado">
          Nombre Grado
        </Label>
        <Input
          id="nombregrado"
          name="nombregrado"
          placeholder="Grado (Solo letras)"
          type="text"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="descripciongrado">
          Descripcion 
        </Label>
        <Input
          id="descripciongrado"
          name="descripciongrado"
          placeholder="Descripcion "
          type="text"
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
   
    <Col md={3}>
      <FormGroup>
      <Label for="seccion">
          Sección
        </Label>
        <Input
          id="seccion"
          name="seccion"
          placeholder="Sección"
          type="text"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="cuidocenteasignado">
         Direccion
        </Label>
        <Input
          id="cuidocenteasignado"
          name="cuidocenteasignado"
          placeholder="CUI Docente Asignado"
        />
      </FormGroup>
    </Col> 
    </Row>
  <Button>
    Registrar Grado
  </Button>
</Form>
    </>
  )
}

export default Estudiante