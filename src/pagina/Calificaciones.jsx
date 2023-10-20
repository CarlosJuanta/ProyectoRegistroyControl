import React, { useState, useEffect, useContext } from "react";
import { Contexto } from "../Context/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../Imagenes/logoescuela.png"; // Importa la imagen
import API_URL from "../Configure";
import {
  Button,
  Input,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  ModalFooter,
  Spinner,
} from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Asistencia = () => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRegistrarNotasOpen, setModalRegistrarNotasOpen] = useState(false);
  const [notaIngresada, setNotaIngresada] = useState(false); // Estado para mostrar el mensaje de nota ingresada
  const { usuario } = useContext(Contexto);
  const navigate = useNavigate();
  // Estados para el modal de registro de notas
  const [cursosPorGrado, setCursosPorGrado] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState("");
  const [selectedBloque, setSelectedBloque] = useState("1");
  const [nota, setNota] = useState("");
  const [loadingCursos, setLoadingCursos] = useState(false); // Estado para indicar la carga de cursos

  // Función para generar un PDF de las calificaciones del estudiante seleccionado
  const generarPDFCalificaciones = () => {
    if (selectedEstudiante) {
      const doc = new jsPDF();

      // Título del PDF
      doc.setFont("times");
      doc.setFontSize(12);
      // Agregar el logo al encabezado
      doc.addImage(logo, "PNG", 150, 8, 50, 30); // Ajusta las coordenadas y dimensiones según tus necesidades
      doc.text('ESCUELA OFICIAL URBANA MIXTA JOSÉ JOAQUÍN PALMA"', 10, 10);
      doc.text(
        "3a. Calle 33A-37 zona 8, Colonia La Democracia, Quetzaltenango",
        10,
        15
      );

      // Nombre y apellidos del estudiante
      const nombreCompleto =
        selectedEstudiante.nombreEstudiante +
        " " +
        selectedEstudiante.apellidoEstudiante;
      doc.text("Nombre: " + nombreCompleto, 10, 30);
      // Agrega el encabezado

      doc.text(
        `Grado: ${
          grados.find((grado) => grado.codigoGrado === selectedGrado)
            ?.nombreGrado
        }`,
        10,
        35
      );
      // Agregar la sección del grado
      doc.text(
        `Sección: ${
          grados.find((grado) => grado.codigoGrado === selectedGrado)
            ?.seccionGrado
        }`,
        70,
        35
      );

      // Datos de las calificaciones en una tabla
      const calificaciones = selectedEstudiante.notas;
      const data = [];
      calificaciones.forEach((calificacion) => {
        data.push([
          calificacion.curso.nombreCurso,
          ...calificacion.notas.map((nota) => nota.nota),
          calificacion.promedio,
          calificacion.estado,
        ]);
      });

      doc.autoTable({
        head: [
          ["Curso", "Bloque 1", "Bloque 2", "Bloque 3", "Bloque 4", "Promedio"],
        ],
        body: data,
        startY: 50,
      });

      // Guardar el PDF
      doc.save(`${nombreCompleto}_calificaciones.pdf`);
    }
  };

  const cargarGrados = async () => {
    try {
      const response = await fetch(`${API_URL}/grado/getall`);
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
      const response = await fetch(`${API_URL}/estudiante/getbygrado`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const data = await response.json();
        setEstudiantes(data.gradosAsignados);
        console.log(data.gradosAsignados);
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

  const cargarCursosPorGrado = async (codigoGrado) => {
    setLoadingCursos(true); // Indicar que se está cargando
    try {
      const response = await fetch(`${API_URL}/curso/getbygrado`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoGrado,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setCursosPorGrado(data.cursos);
      } else {
        console.log("Error al cargar los cursos por grado");
      }
    } catch (error) {
      console.error("Hubo un error al cargar los cursos por grado:", error);
    } finally {
      setLoadingCursos(false); // Indicar que la carga ha finalizado
    }
  };
  // Nueva función para registrar notas
  const registrarNotas = async () => {
    try {
      const response = await fetch(
        `${API_URL}/estudiante/notas/${selectedEstudiante._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cursoId: selectedCurso, // Utiliza el curso seleccionado
            bloque: selectedBloque, // Utiliza el bloque seleccionado
            nota: parseFloat(nota), // Utiliza la nota ingresada como número decimal
          }),
        }
      );

      if (response.status === 200) {
        setNotaIngresada(true); // Muestra el mensaje de nota ingresada
        //setModalRegistrarNotasOpen(false); // Cierra el modal después de registrar notas
        setSelectedCurso(""); // Limpia el curso seleccionado
        setSelectedBloque("1"); // Limpia el bloque seleccionado
        setNota(""); // Limpia la nota ingresada
        // Puedes agregar aquí una lógica adicional si es necesario
      } else {
        console.log("Error al registrar las notas");
      }
    } catch (error) {
      console.error("Hubo un error al registrar las notas:", error);
    }
  };

  useEffect(() => {
    cargarGrados();
  }, []);

  useEffect(() => {
    cargarEstudiantesPorGrado();
  }, [selectedGrado]);

  const abrirModal = (estudiante) => {
    setSelectedEstudiante(estudiante);
    cargarCursosPorGrado(selectedGrado); // Cargar cursos usando selectedGrado
    setModalOpen(true);
  };

  // Nueva función para abrir el modal de registro de notas
  const abrirModalRegistrarNotas = (estudiante) => {
    setSelectedEstudiante(estudiante);
    cargarCursosPorGrado(selectedGrado); // Cargar cursos usando selectedGrado
    setModalRegistrarNotasOpen(true);
  };

  useEffect(() => {
    let timer;
    if (notaIngresada) {
      timer = setTimeout(() => {
        setNotaIngresada(false);
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [notaIngresada]);

  if (!usuario) {
    navigate("/login");
  } else if (usuario.rol === "admin" || usuario.rol === "docente") {
    return (
      <>
        <h4>Calificaciones</h4>
        <div className="p-5">
          <Row>
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
          <table className="table table-light table-sm align-middle table-striped">
            <thead className="table-dark table text-center">
              <tr>
                <th scope="col">CUI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Grado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className="table text-center ">
              {estudiantes.map((estudiante, index) => (
                <tr key={estudiante._id}>
                  <td>{estudiante.cuiEstudiante}</td>
                  <td>{estudiante.nombreEstudiante}</td>
                  <td>{estudiante.apellidoEstudiante}</td>
                  <td>{estudiante.codigoGrado[0].nombreGrado}</td>
                  <td>
                    <td>
                      <Button
                        color="success"
                        onClick={() => abrirModal(estudiante)}
                      >
                        Ver
                      </Button>
                    </td>
                    <td>
                      <Button
                        color="warning"
                        onClick={() => abrirModalRegistrarNotas(estudiante)}
                      >
                        Registrar
                      </Button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          size="lg"
        >
          <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
            Calificaciones de{" "}
            {selectedEstudiante &&
              selectedEstudiante.nombreEstudiante +
                " " +
                selectedEstudiante.apellidoEstudiante}{" "}
            {"----------"}
            <img
              src={logo}
              alt="Logo"
              style={{ width: "80px", height: "60px" }}
            />
          </ModalHeader>

          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>Curso</th>
                  {selectedEstudiante &&
                    selectedEstudiante.notas[0]?.notas.map(
                      (nota, indexNota) => (
                        <th key={indexNota}>{`Bloque ${nota.bloque}`}</th>
                      )
                    )}
                  <th>Promedio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {selectedEstudiante &&
                  selectedEstudiante.notas.map((notaCurso, indexCurso) => (
                    <tr key={indexCurso}>
                      <td>{notaCurso.curso.nombreCurso}</td>
                      {notaCurso.notas.map((nota, indexNota) => (
                        <td key={indexNota}>{`${nota.nota}`}</td>
                      ))}
                      <td>
                        {(() => {
                          const sum = notaCurso.notas.reduce(
                            (acc, nota) => acc + nota.nota,
                            0
                          );
                          const promedio = sum / notaCurso.notas.length;
                          return promedio.toFixed(2); // Mostrar el promedio con 2 decimales
                        })()}
                      </td>
                      <td>
                        {(() => {
                          const sum = notaCurso.notas.reduce(
                            (acc, nota) => acc + nota.nota,
                            0
                          );
                          const promedio = sum / notaCurso.notas.length;
                          if (promedio >= 80) {
                            return <span className="excellent">Excelente</span>;
                          } else {
                            return (
                              <span className="improve">Necesita mejorar</span>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  ))}
                <Button color="primary" onClick={generarPDFCalificaciones}>
                  Generar PDF de Calificaciones
                </Button>
              </tbody>
            </Table>
          </ModalBody>
        </Modal>
        {/* Modal para registrar notas */}
        <Modal
          isOpen={modalRegistrarNotasOpen}
          toggle={() => setModalRegistrarNotasOpen(!modalRegistrarNotasOpen)}
          size="lg"
        >
          <ModalHeader
            toggle={() => setModalRegistrarNotasOpen(!modalRegistrarNotasOpen)}
          >
            Registrar Notas para{" "}
            {selectedEstudiante && selectedEstudiante.nombreEstudiante}
          </ModalHeader>
          <ModalBody>
            {/* Agregar un div para mostrar el mensaje */}
            {notaIngresada && (
              <div className="alert alert-success" role="alert">
                Nota ingresada con éxito.
              </div>
            )}
            <Input
              type="select"
              value={selectedCurso}
              onChange={(e) => setSelectedCurso(e.target.value)}
            >
              <option value="">Seleccionar Curso</option>
              {cursosPorGrado.map((curso) => (
                <option key={curso._id} value={curso._id}>
                  {curso.nombreCurso}
                </option>
              ))}
            </Input>
            <Input
              type="select"
              value={selectedBloque}
              onChange={(e) => setSelectedBloque(e.target.value)}
            >
              <option value="1">Bloque 1</option>
              <option value="2">Bloque 2</option>
              <option value="3">Bloque 3</option>
              <option value="4">Bloque 4</option>
            </Input>
            <Input
              type="number"
              placeholder="Nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => registrarNotas()}>
              Guardar Notas
            </Button>
            <Button
              color="secondary"
              onClick={() => setModalRegistrarNotasOpen(false)}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        {loadingCursos && <Spinner color="primary" />}{" "}
        {/* Mostrar spinner mientras se cargan los cursos */}
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Asistencia;
