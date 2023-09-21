import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { Button, Input, Col, Row } from 'reactstrap';

const Asistencia = () => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);

  // Función para cargar los grados
  const cargarGrados = async () => {
    try {
      const response = await fetch(`${"http://localhost:3000/api/"}/grado/getall`);
      if (response.status === 200) {
        const data = await response.json();
        setGrados(data.resultado);
      } else {
        console.log("Error al cargar los grados");
      }
    } catch (error) {
      console.error("Hubo un error al cargar los grados:", error);
    }
  };

  // Función para cargar estudiantes por grado seleccionado
  const cargarEstudiantesPorGrado = async () => {
    if (!selectedGrado) return;

    try {
      const data = { codigoGrado: selectedGrado };
      const response = await fetch(`${"http://localhost:3000/api"}/estudiante/getbygrado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const data = await response.json();
        setEstudiantes(data.gradosAsignados);
        console.log(data);
      } else {
        console.log("Error al cargar los estudiantes asignados al grado");
      }
    } catch (error) {
      console.error("Hubo un error al cargar los estudiantes asignados al grado:", error);
    }
  };

  // Cargar los grados al cargar el componente
  useEffect(() => {
    cargarGrados();
  }, []);

  // Cargar estudiantes cuando se seleccione un grado
  useEffect(() => {
    cargarEstudiantesPorGrado();
  }, [selectedGrado]);

  return (
    <>
      <h4>Asistencia</h4>

      <div className="p-5">
        <Row>
          <Col>
            <Button color="success">Guardar Asistencia</Button>
          </Col>
        </Row>

        <div style={{ marginTop: '20px' }}></div>

        <Row>
          <Col>
            <Input type="date" placeholder="Fecha" />
          </Col>
          <Col className="text-end">
            <Input
              placeholder="Seleccionar Grado"
              type="select"
              value={selectedGrado}
              onChange={(e) => setSelectedGrado(e.target.value)}
            >
              <option value="">Seleccione un Grado</option>
              {grados.map((grado) => (
                <option key={grado._id} value={grado.codigoGrado}>
                  {grado.nombreGrado}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
      </div>

      <div className="table-responsive p-4">
        <table className="table table-light table-sm align-middle">
          <thead className="table-dark table text-center">
            <tr>
              <th scope="col">CUI</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Grado</th>
              <th scope="col">Asistencia</th>
              <th scope="col">Llamado de atención</th>
            </tr>
          </thead>
          <tbody className="table text-center table-primary">
            
                {estudiantes.map((estudiante, index) => (
              <tr key={index._id}>
                <td>{estudiante.cuiEstudiante}</td>
                <td>{estudiante.nombreEstudiante}</td>
                <td>{estudiante.apellidoEstudiante}</td>
                <td>{estudiante.codigoGrado[0].nombreGrado}</td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <th>
                    <NavLink
                      to="/verfalta"
                      className="text-dark rounded py-2 w-100 d-inline-block px-2"
                      style={{ textDecoration: 'none' }}
                    >
                      <FaIcons.FaEye className="me-2" />
                      Ver
                    </NavLink>
                  </th>
                  <th>
                    <NavLink
                      to="/registrarfalta"
                      className="text-dark rounded py-2 w-100 d-inline-block px-2"
                      style={{ textDecoration: 'none' }}
                    >
                      <FaIcons.FaPenAlt className="me-2" />
                      Registrar
                    </NavLink>
                  </th>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Asistencia;
