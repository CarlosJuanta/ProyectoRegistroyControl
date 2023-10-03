import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Button, Input, Col, Row, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

const Asistencia = () => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEstudiante, setSelectedEstudiante] = useState(null); // Estado para almacenar el estudiante seleccionado
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura y el cierre del modal

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

  // Función para abrir el modal y mostrar los reportes del estudiante seleccionado
  const abrirModal = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setModalOpen(true);
  };

  return (
    <>
      <h4>Asistencia</h4>

      <div className="p-5">
      <Row>
          <Col className="text-end">
            <NavLink to="/asistencia">
              <Button color="success">Registrar Nueva Asistencia</Button>
            </NavLink>
          </Col>
        </Row>

        <div style={{ marginTop: '20px' }}></div>

        <Row>
          <Col>
            <Input
              type="date"
              placeholder="Fecha"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)} // Manejo de cambios en la fecha
            />
          </Col>
          <Col className="text-end">
            <Input
              placeholder="Seleccionar Grado"
              type="select"
              value={selectedGrado}
              onChange={(e) => setSelectedGrado(e.target.value)}
            >
              <option value="">Seleccionar...</option>
  {grados.map((grado) => (
    <option key={grado.codigoGrado} value={grado.codigoGrado}>
      {`${grado.nombreGrado} ${grado.seccionGrado}`}
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
              <th scope="col">Asistencias</th>
              <th scope="col">Reportes</th>
            </tr>
          </thead>
          <tbody className="table text-center table-primary">
            {estudiantes.map((estudiante, index) => (
              <tr key={estudiante._id}>
                <td>{estudiante.cuiEstudiante}</td>
                <td>{estudiante.nombreEstudiante}</td>
                <td>{estudiante.apellidoEstudiante}</td>
                <td>{estudiante.codigoGrado[0].nombreGrado}</td>

                <td>
                  {/* Aquí mantén la suma de asistencias */}
                  {selectedDate && (
                    <>{estudiante.asistencias.filter((asistencia) => asistencia.fecha === selectedDate && asistencia.estado).length}</>
                  )}
                </td>
                <td>
                  {/* Cambiamos el NavLink por un botón */}
                  <Button
                    color="primary"
                    onClick={() => abrirModal(estudiante)} // Abre el modal al hacer clic en "Ver"
                  >
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para mostrar los reportes */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Reportes de {selectedEstudiante && selectedEstudiante.nombreEstudiante}
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Motivo</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {selectedEstudiante &&
                selectedEstudiante.reportes.map((reporte) => (
                  <tr key={reporte._id}>
                    <td>{reporte.motivo}</td>
                    <td>{reporte.descripcion}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Asistencia;
