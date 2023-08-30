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
const CrearCurso = () => {
  return (
    <>
    <h3>Formulario Crear Curso</h3>
    <Form className="bg-light p-4">

  <Row>
    <Col md={3}>
      <FormGroup>
        <Label for="codigocurso">
          Código Curso
        </Label>
        <Input
         placeholder="Código Curso"
          type="text-area"
         
        />
      </FormGroup>
    </Col> 
    <Col md={3}>
      <FormGroup>
        <Label for="nombrecurso">
          Nombre Curso
        </Label>
        <Input
         placeholder="Nombre Curso"
          type="text-area"
        />
      </FormGroup>
    </Col> 
    <Col md={3}>
      <FormGroup>
        <Label for="descripcioncurso">
          Descripcion 
        </Label>
        <Input
          placeholder="Descripcion "
          type="textarea"
        />
      </FormGroup>
    </Col>
    <Col md={3}>
  <FormGroup>
    <Label for="gradocurso">
      Grado
    </Label>
    <Input
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
  </Row>
  <Button color="success">
    Registrar Curso
  </Button>
</Form>
    </>
  )
}

export default CrearCurso