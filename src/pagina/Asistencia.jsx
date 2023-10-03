import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { Button, Input, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Asistencia = () => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedEstudianteId, setSelectedEstudianteId] = useState('');
  const [motivo, setMotivo] = useState('');
  const [descripcion, setDescripcion] = useState('');

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

  const handleAsistenciaChange = (estudianteId, checked) => {
    const updatedAsistencias = [...asistencias];
    const index = updatedAsistencias.findIndex((asistencia) => asistencia.estudiante === estudianteId);

    if (index !== -1) {
      updatedAsistencias[index].estado = checked;
    } else {
      updatedAsistencias.push({ estudiante: estudianteId, estado: checked, fecha: obtenerFechaSistema() });
    }

    setAsistencias(updatedAsistencias);
  };

  const obtenerFechaSistema = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const guardarAsistencias = async () => { 
     // Pregunta al usuario si realmente quiere guardar la asistencia
  const confirmarGuardar = window.confirm("¿Estás seguro de que quieres guardar la asistencia?");

  if (!confirmarGuardar) {
    return; 
    }
    try {
      for (const asistencia of asistencias) {
        const idEstudiante = asistencia.estudiante;
        const { estado, fecha } = asistencia;

        const response = await fetch(`${"http://localhost:3000/api"}/estudiante/agregarAsistencia/${idEstudiante}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado, fecha }),
        });

        if (response.status === 200) {
          setRegistroExitoso(true);
        } else {
          console.log("Error al guardar la asistencia para el estudiante:", idEstudiante);
        }
      }
    } catch (error) {
      console.error("Hubo un error al guardar las asistencias:", error);
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
       
    // Agrega el encabezado
    doc.setFont('times');
    doc.setFontSize(12);
    doc.text('ESCUELA OFICIAL URBANA MIXTA JOSÉ JOAQUÍN PALMA"', 10, 10);
    doc.text(`Grado: ${grados.find((grado) => grado.codigoGrado === selectedGrado)?.nombreGrado}`, 10, 20);
    doc.text(`Fecha: ${obtenerFechaSistema()}`, 10, 30);
    doc.text('Asistencia', 10, 40);

    const headers = ['CUI', 'Nombre', 'Apellido', 'Asistencia', 'Fecha'];
    const data = estudiantes.map((estudiante) => {
      const asistencia = asistencias.find((asis) => asis.estudiante === estudiante._id);
      const asistenciaTexto = asistencia ? (asistencia.estado ? 'Presente' : 'Ausente') : 'Ausente';

      return [
        estudiante.cuiEstudiante,
        estudiante.nombreEstudiante,
        estudiante.apellidoEstudiante,
        asistenciaTexto,
        asistencia ? asistencia.fecha : obtenerFechaSistema(),
      ];
    });

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 50,
      styles: {
        font: 'times',
        fontSize: 12,
      },
    });

    doc.save('reporte_asistencia.pdf');
  };

  const toggleModal = (estudianteId) => {
    setSelectedEstudianteId(estudianteId);
    setModal(!modal);
  };

  const registrarFalta = async () => {
    try {
      const idEstudiante = selectedEstudianteId;
      const data = { motivo, descripcion };

      const response = await fetch(`${"http://localhost:3000/api"}/estudiante/agregarReporte/${idEstudiante}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setRegistroExitoso(true);
        setModal(false); 
        setMotivo('');
        setDescripcion('');

      } else {
        console.log("Error al registrar el reporte para el estudiante:", idEstudiante);
      }
    } catch (error) {
      console.error("Hubo un error al registrar el reporte:", error);
    }
  };

  useEffect(() => {
    cargarGrados();
  }, []);

  useEffect(() => {
    cargarEstudiantesPorGrado();
  }, [selectedGrado]);

  useEffect(() => {
    let timer;
    if (registroExitoso) {
      timer = setTimeout(() => {
        setRegistroExitoso(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [registroExitoso]);

  return (
    <>
      <h4>Asistencia</h4>

      <div className="p-5">
        <Row>
          <Col>
            <Button color="success" onClick={guardarAsistencias}>Guardar Asistencia</Button>
            <Button color="primary" onClick={generarPDF} style={{ marginLeft: '10px' }}>Generar PDF</Button>
          </Col>
        </Row>

        <div style={{ marginTop: '20px' }}></div>

        <Row>
          <Col>
            <Input
              type="date"
              placeholder="Fecha"
              value={obtenerFechaSistema()}
              readOnly
            />
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

      {registroExitoso && (
        <div className="alert alert-success" role="alert">
          Registro exitoso.
        </div>
      )}

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
            {estudiantes.map((estudiante) => (
              <tr key={estudiante._id}>
                <td>{estudiante.cuiEstudiante}</td>
                <td>{estudiante.nombreEstudiante}</td>
                <td>{estudiante.apellidoEstudiante}</td>
                <td>{estudiante.codigoGrado[0].nombreGrado}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={asistencias.some((asistencia) => asistencia.estudiante === estudiante._id && asistencia.estado)}
                    onChange={(e) => handleAsistenciaChange(estudiante._id, e.target.checked)}
                  />
                </td>
                <td>
                  <Button
                    color="success"
                    onClick={() => {
                      toggleModal(estudiante._id); // Abre el modal para registrar falta
                    }}
                  >
                    <FaIcons.FaPenAlt className="me-2" />
                    Registrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para registrar falta */}
      <Modal isOpen={modal} toggle={() => toggleModal('')}>
        <ModalHeader toggle={() => toggleModal('')}>Registrar Falta</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="motivo" className="form-label">Motivo</label>
            <input
              type="text"
              className="form-control"
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="descripcion"
              rows="3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={registrarFalta}>Registrar</Button>
          <Button color="secondary" onClick={() => toggleModal('')}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Asistencia;
