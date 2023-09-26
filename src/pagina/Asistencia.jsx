import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { Button, Input, Col, Row } from 'reactstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa la librería
const Asistencia = () => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [registroExitoso, setRegistroExitoso] = useState(false);

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
        font: 'times', // Establece la fuente para la tabla como Times New Roman
        fontSize: 12, 
        }, // Establece el tamaño de fuente
    });

    doc.save('reporte_asistencia.pdf');
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
