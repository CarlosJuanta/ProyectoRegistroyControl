import React, { useState } from "react";
import { FormGroup, Label, Input, Col, Row, Button, Form } from "reactstrap";

const Docente = () => {
  const [cuidocente, setCuidocente] = useState("");
  const [nombredocente, setNombredocente] = useState("");
  const [apellidosdocente, setApellidosdocente] = useState("");
  const [telefonodocente, setTelefonodocente] = useState("");
  const [correodocente, setCorreodocente] = useState("");
  const [direcciondocente, setDirecciondocente] = useState("");
  const [nacionalidaddocente, setNacionalidaddocente] = useState("");

  const handleSubmit = async (e) => {
    if (correodocente.includes("@")) {
      try {
        const data = {
          cuiDocente: cuidocente,
          nombreDocente: nombredocente,
          apellidoDocente: apellidosdocente,
          telefonoDocente: telefonodocente,
          correoDocente: correodocente,
          direccionDocente: direcciondocente,
          nacionalidadDocente: nacionalidaddocente,
        };

        const response = await fetch(
          `${"http://localhost:3000/api/"}/docente/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        console.log(response.status);
        alert("Docente Registrado");
      } catch (error) {
        console.log(error);
        alert("Error al registrar Docente");
      }
    } else {
      alert("Correo no valido");
    }
  };

  return (
    <>
      <h3>Formulario Registro Nuevo Docente</h3>
      <div className="bg-light p-4">
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="cuidocente">CUI Docente</Label>
              <Input
                placeholder="CUI"
                type="text-area"
                onChange={(e) => {
                  // Utiliza una expresión regular para permitir solo números
                  const inputValue = e.target.value.replace(/\D/g, ""); // Elimina todo lo que no sea número
                  if (inputValue.length <= 13) {
                    setCuidocente(inputValue);
                  }
                }}
                value={cuidocente}
                maxLength={13}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="nombresdocente">Nombres</Label>
              <Input
                placeholder="Nombres Docente"
                type="text-area"
                onChange={(e) => setNombredocente(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="apellidosdocente">Apellidos</Label>
              <Input
                placeholder="Apellidos Docente"
                type="text-area"
                onChange={(e) => setApellidosdocente(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="telefonodocente">Telefono</Label>
              <Input
                id="telefonodocente"
                name="telefonodocente"
                placeholder="Telefono Docente"
                type="text-area"
                onChange={(e) => setTelefonodocente(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="correodocente">Correo</Label>
              <Input
                placeholder="ej. correo@gmail.com"
                type="email"
                onChange={(e) => setCorreodocente(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="direcciondocente">Dirección</Label>
              <Input
                placeholder="Dirección"
                type="text-area"
                onChange={(e) => setDirecciondocente(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="nacionalidaddocente">Nacionalidad</Label>
              <Input
                id="nacionalidaddocente"
                name="nacionalidaddocente"
                placeholder="Nacionalidad Docente"
                type="text-area"
                onChange={(e) => setNacionalidaddocente(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="success" onClick={handleSubmit}>
          Registrar Docente
        </Button>
      </div>
    </>
  );
};

export default Docente;
