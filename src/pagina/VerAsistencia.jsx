import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../Imagenes/logoescuela.png"; // Importa la imagen
import {
  Button,
  Input,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
} from "reactstrap";
import jsPDF from "jspdf";

const Asistencia = () => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const cargarGrados = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/grado/getall");
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

    const cargarEstudiantesPorGrado = async () => {
      if (!selectedGrado) return;

      try {
        const data = { codigoGrado: selectedGrado };
        const response = await fetch(
          "http://localhost:3000/api/estudiante/getbygrado",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setEstudiantes(data.gradosAsignados);
        } else {
          console.log("Error al cargar los estudiantes asignados al grado");
        }
      } catch (error) {
        console.error(
          "Hubo un error al cargar los estudiantes asignados al grado:",
          error
        );
      }
    };

    cargarGrados();
    if (selectedGrado) cargarEstudiantesPorGrado();
  }, [selectedGrado]);

  const abrirModal = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setModalOpen(true);
  };
  const obtenerFechaSistema = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generarReportePDF = () => {
    // Crear un nuevo documento jsPDF
    const doc = new jsPDF();

    // Agrega el encabezado
    doc.setFont("times");
    doc.setFontSize(12);
    // Agregar el logo al PDF
    // Agregar el logo al encabezado
    doc.addImage(logo, "PNG", 150, 8, 50, 30); // Ajusta las coordenadas y dimensiones según tus necesidades

    doc.text('ESCUELA OFICIAL URBANA MIXTA JOSÉ JOAQUÍN PALMA"', 10, 10);
    doc.text(
      `Grado: ${
        grados.find((grado) => grado.codigoGrado === selectedGrado)?.nombreGrado
      }`,
      10,
      20
    );
    doc.text(`Fecha: ${obtenerFechaSistema()}`, 10, 30);
    doc.text("Asistencia", 10, 40);

    // Contenido del reporte
    const asistenciasPorEstudiante = estudiantes.map((estudiante) => {
      const totalAsistencias = estudiante.asistencias.filter(
        (asistencia) => asistencia.estado
      ).length;
      return [
        estudiante.nombreEstudiante + " " + estudiante.apellidoEstudiante,
        totalAsistencias + " asistencias",
      ];
    });

    // Generar la tabla
    doc.autoTable({
      head: [["Estudiante", "Total Asistencias"]],
      body: asistenciasPorEstudiante,
      startY: 50,
      theme: "grid",
    });

    // Guardar el archivo con un nombre específico
    doc.save("reporte_asistencias.pdf");
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
            <Button color="primary" onClick={generarReportePDF}>
              Generar Reporte PDF
            </Button>
          </Col>
        </Row>

        <div style={{ marginTop: "20px" }}></div>

        <Row>
          <Col>
            <Input
              type="date"
              placeholder="Fecha"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
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
              <th scope="col">Total Asistencias</th>
              <th scope="col">Reportes</th>
            </tr>
          </thead>
          <tbody className="table text-center table-primary">
            {estudiantes.map((estudiante) => (
              <tr key={estudiante._id}>
                <td>{estudiante.cuiEstudiante}</td>
                <td>{estudiante.nombreEstudiante}</td>
                <td>{estudiante.apellidoEstudiante}</td>
                <td>{estudiante.codigoGrado[0].nombreGrado}</td>
                <td>
                  {selectedDate && (
                    <>
                      {
                        estudiante.asistencias.filter(
                          (asistencia) =>
                            asistencia.fecha === selectedDate &&
                            asistencia.estado
                        ).length
                      }
                    </>
                  )}
                </td>
                <td>
                  {
                    estudiante.asistencias.filter(
                      (asistencia) => asistencia.estado
                    ).length
                  }
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => abrirModal(estudiante)}
                  >
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Reportes de{" "}
          {selectedEstudiante && selectedEstudiante.nombreEstudiante}
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Motivo</th>
                <th>Descripción</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {selectedEstudiante &&
                selectedEstudiante.reportes.map((reporte) => (
                  <tr key={reporte._id}>
                    <td>{reporte.motivo}</td>
                    <td>{reporte.descripcion}</td>
                    <td>
                      {new Date(reporte.fecha).toLocaleDateString("es-ES")}
                    </td>
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
