import React, { useState, useEffect, useContext } from "react";
import { Contexto } from "../Context/ContextProvider";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
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

  const cargarGrados = async () => {
    try {
      const response = await fetch(
        `${"http://localhost:3000/api/"}/grado/getall`
      );
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
        `${"http://localhost:3000/api"}/estudiante/getbygrado`,
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
      const response = await fetch(
        `${"http://localhost:3000/api/curso/getbygrado"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigoGrado,
          }),
        }
      );

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
        `${"http://localhost:3000/api/"}/estudiante/notas/${
          selectedEstudiante._id
        }`,
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
      }, 3000);
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
          <table className="table table-light table-sm align-middle">
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Button
                        color="success"
                        onClick={() => abrirModal(estudiante)}
                      >
                        Ver
                      </Button>
                      <Button
                        color="warning"
                        onClick={() => abrirModalRegistrarNotas(estudiante)}
                      >
                        Registrar
                      </Button>
                    </div>
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
            {selectedEstudiante && selectedEstudiante.nombreEstudiante}
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
