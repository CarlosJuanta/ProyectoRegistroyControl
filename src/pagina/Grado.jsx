import React, {useState} from 'react'
import {FormGroup,Label,Input,Col,Row,Button,Form,
} from 'reactstrap';

const Grado = () => {
  const [codigogrado, setCodigogrado] = useState('')
  const [nombregrado, setNombregrado] = useState('')
  const [descripciongrado, setDescripciongrado] = useState('')
  const [secciongrado, setSecciongrado] = useState('')
  const [cuidocente, setCuidocente] = useState('')
  
  const handleSubmit = async (e) => {
    
    try {
      const data = {
        codigoGrado: codigogrado,
        nombreGrado: nombregrado,
        descripcionGrado: descripciongrado,
        seccionGrado: secciongrado,
        cuiDocente: cuidocente,
      };

      const response = await fetch(`${"http://localhost:3000/api/"}/grado/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response.status);
      alert("Grado Registrado");
     
    } catch (error) {
      console.log(error);
      alert("Error al registrar Grado");
    }
  };
  return (
    <>
    <h3>Formulario Crear Grado</h3>
    <div className="bg-light p-4">

  <Row>
    <Col md={3}>
      <FormGroup>
        <Label for="codigogrado">
          Código Grado
        </Label>
        <Input
          placeholder="Código Grado"
          type="text-area"
          onChange={(e) => setCodigogrado(e.target.value)}
        />
      </FormGroup>
    </Col>
    <Col md={3}>
  <FormGroup>
    <Label for="Nombre Grado">
      Nombre Grado
    </Label>
    <Input
      type="select"
      onChange={(e) => setNombregrado(e.target.value)}
      value={nombregrado} 
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
          placeholder="Descripcion "
          type="textarea"
          onChange= {(e) => setDescripciongrado(e.target.value)}
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
          placeholder="Sección"
          type="text-area"
          onChange={(e) => setSecciongrado(e.target.value)}
        />
      </FormGroup>
    </Col>
    <Col md={3}>
      <FormGroup>
        <Label for="cuidocenteasignado">
         CUI docente asignado
        </Label>
        <Input
          placeholder="CUI Docente Asignado"
          type="text-area"
          onChange= {(e) => setCuidocente(e.target.value)}
        />
      </FormGroup>
    </Col> 
    </Row>
  <Button color="success" onClick={handleSubmit}>
    Registrar Grado
  </Button>
</div>
    </>
  )
}

export default Grado