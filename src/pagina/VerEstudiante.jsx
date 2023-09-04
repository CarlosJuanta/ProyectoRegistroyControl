import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Col, Row, Button, Form } from "reactstrap";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";


const VerEstudiante = () => {
  const [datos, setDatos] = useState([]);

  const getEstudiantes = async () => {
    try {
      const response = await fetch(`${"http://localhost:3000/api/"}/estudiante/getall`);
      const data = await response.json();
      setDatos(data.resultado);
      console.log(data.resultado);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEstudiantes();
  }, []);

  if (datos.length === 0) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <h4>Estudiante</h4>
      <div className="p-5">
        <Row>
          <Col>
            <NavLink to="/estudiante">
              <Button color="success">Crear Estudiante</Button>
            </NavLink>
          </Col>
          <Col className="text-end">
            <Input placeholder="Buscar Estudiante" type="text-area" />
          </Col>
        </Row>
      </div>
      <div className="table-responsive p-5">
        <table className="table table-hover table-light table-sm align-middle table-striped">
          <thead className="table-dark table text-center">
            <tr>
              <th scope="col">CUI</th>
              <th scope="col">Nombre </th>
              <th scope="col">Apellido</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Dirección</th>
              <th scope="col">Nacionalidad</th>
              <th scope="col">Código MINEDUC</th>
              <th scope="col">Encargado</th>
            </tr>
          </thead>
          <tbody className="table text-center">
            {datos.map((estudiante) => (
              <tr key={estudiante.cuiEstudiante}>
                <td>{estudiante.cuiEstudiante}</td>
                <td>{estudiante.nombreEstudiante}</td>
                <td>{estudiante.apellidoEstudiante}</td>
                <td>{estudiante.fechanacEstudiante}</td>
                <td>{estudiante.direccionEstudiante}</td>
                <td>{estudiante.nacionalidadEstudiante}</td>
                <td>{estudiante.codigomineducEstudiante}</td>
                <td>{estudiante.correencargadoEstudiante}</td>
                <td>
                  <NavLink
                    to={`/encargadoinfo/${estudiante._id}`}
                    className="text-dark rounded py-2 w-100 d-inline-block px-2"
                    activeClassName="active"
                    style={{ textDecoration: "none" }}
                  >
                    <FaIcons.FaEye className="me-2" /> Ver
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VerEstudiante;
