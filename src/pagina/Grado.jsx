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
          type="text-area"
         
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
      type="select"
    >
      <option value="primero">Primero</option>
      <option value="segundo">Segundo</option>
      <option value="tercero">Tercero</option>
      <option value="cuarto">Cuarto</option>
      <option value="quinto">Quinto</option>
      <option value="sexto">Sexto</option>
    </Input>
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
          type="textarea"
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
          type="text-area"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="cuidocenteasignado">
         CUI docente asignado
        </Label>
        <Input
          id="cuidocenteasignado"
          name="cuidocenteasignado"
          placeholder="CUI Docente Asignado"
          type="text-area"
        />
      </FormGroup>
    </Col> 
    </Row>
  <Button color="success">
    Registrar Grado
  </Button>
</Form>
    </>
  )
}

export default Estudiante