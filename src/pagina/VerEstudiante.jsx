import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

const VerEstudiante = () => {
  const [modal, setModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [selectedEncargado, setSelectedEncargado] = useState();
  const [filtroNombre, setFiltroNombre] = useState("");
  const [datos, setDatos] = useState([]);
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");
  const [selectedGradoAsignado, setSelectedGradoAsignado] = useState(""); // Nuevo estado para el grado asignado
  const [grados, setGrados] = useState([]); // Nuevo estado para almacenar los grados disponibles

  useEffect(() => {
    // Esta función se ejecuta al cargar el componente y obtiene los grados disponibles
    async function fetchGrados() {
      try {
        const response = await fetch("http://localhost:3000/api/grado/getall");
        const data = await response.json();
        setGrados(data.resultado || []); // Almacena los grados en el estado
      } catch (error) {
        console.log(error);
      }
    }

    fetchGrados(); // Llama a la función para obtener los grados al cargar el componente
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleSecondModal = () => {
    setSecondModal(!secondModal);
  };

  const handleVerClick = (estudiante) => {
    setSelectedEncargado(estudiante);
    toggleModal();
  };

  const handleAsignarGrado = (estudiante) => {
    setSelectedGradoAsignado(estudiante);
    toggleSecondModal();
  };

  const handleChangeGrado = (e) => {
    setGradoSeleccionado(e.target.value);
  };

  const agregarGradoAEstudiante = async () => {
    try {
      // Verifica si el grado seleccionado está vacío
      if (!gradoSeleccionado) {
        console.log("Selecciona un grado antes de guardar.");
        return;
      }

      const idEstudiante = selectedGradoAsignado._id;
      const gradoData = { codigoGrado: gradoSeleccionado };

      // Realiza la solicitud POST para agregar el grado al estudiante
      const response = await fetch(`http://localhost:3000/api/estudiante/agregarGrado/${idEstudiante}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gradoData),
      });

      if (response.status === 200) {
        // Actualiza los datos del estudiante con el nuevo grado asignado
        const updatedEstudiante = await response.json();
        setSelectedGradoAsignado(updatedEstudiante.estudiante);
        toggleSecondModal(); // Cierra el modal después de agregar el grado
        alert("Asignación exitosa"); // Muestra un alert de asignación exitosa
      } else {
        console.log("Error al agregar el grado al estudiante.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEstudiantes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/estudiante/getall");
      const data = await response.json();
      const estudiantesFiltrados = filtroNombre
        ? data.resultado.filter((estudiante) =>
            new RegExp(filtroNombre, 'i').test(estudiante.nombreEstudiante)
          )
        : [];
      setDatos(estudiantesFiltrados);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4>Estudiante</h4>
      <div className="p-5">
        <Row>
          <Col>
            <Button
              color="primary"
              onClick={() => {
                getEstudiantes();
              }}
            >
              Buscar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Input
              placeholder="Buscar Estudiante por Nombre"
              type="text"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </Col>
          <Col className="text-end">
            <NavLink to="/estudiante">
              <Button color="success">Crear Estudiante</Button>
            </NavLink>
          </Col>
        </Row>
      </div>
      <div className="table-responsive p-5">
        {datos.length > 0 ? (
          <table className="table table-hover table-light table-sm align-middle table-striped">
            <thead className="table-dark table text-center">
              <tr>
                <th scope="col">CUI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Fecha de Nacimiento</th>
                <th scope="col">Dirección</th>
                <th scope="col">Nacionalidad</th>
                <th scope="col">Código MINEDUC</th>
                <th scope="col">Encargado</th>
                <th scope="col">Asignar grado</th>
              </tr>
            </thead>
            <tbody className="table text-center">
              {datos.map((estudiante, index) => (
                <tr key={index._id}>
                  <td>{estudiante.cuiEstudiante}</td>
                  <td>{estudiante.nombreEstudiante}</td>
                  <td>{estudiante.apellidoEstudiante}</td>
                  <td>{estudiante.fechanacEstudiante}</td>
                  <td>{estudiante.direccionEstudiante}</td>
                  <td>{estudiante.nacionalidadEstudiante}</td>
                  <td>{estudiante.codigomineducEstudiante}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => {
                        handleVerClick(estudiante);
                      }}
                    >
                      <FaIcons.FaEye className="me-2" />
                      Ver
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => {
                        handleAsignarGrado(estudiante);
                      }}
                    >
                      <FaIcons.FaEye className="me-2" />
                      Asignar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Detalles del Encargado</ModalHeader>
        <ModalBody>
          {selectedEncargado && (
            <>
              <p><strong>CUI:</strong> {selectedEncargado.cuiencargadoEstudiante}</p>
              <p><strong>Nombre:</strong> {selectedEncargado.nombreencargadoEstudiante}</p>
              <p><strong>Apellido:</strong> {selectedEncargado.apellidoencargadoEstudiante}</p>
              <p><strong>Dirección:</strong> {selectedEncargado.direccionencargadoEstudiante}</p>
              <p><strong>Teléfono:</strong> {selectedEncargado.telefonoencargadoEstudiante}</p>
              <p><strong>Correo:</strong> {selectedEncargado.correencargadoEstudiante}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={secondModal} toggle={toggleSecondModal}>
        <ModalHeader toggle={toggleSecondModal}>Asignar Grado</ModalHeader>
        <ModalBody>
          {selectedGradoAsignado && (
            <>
              <strong>Grado Anterior:</strong>
              {selectedGradoAsignado.codigoGrado.map((grado, index) => (
                <p key={index._id}>{grado.nombreGrado}</p>
              ))}
            </>
          )}
          <FormGroup>
            <Label for="gradoSelect">Seleccionar Grado</Label>
            <Input
              type="select"
              name="gradoSelect"
              id="gradoSelect"
              value={gradoSeleccionado}
              onChange={handleChangeGrado}
            >
              <option value="">Seleccionar...</option>
              {grados.map((grado) => (
                <option key={grado._id} value={grado.codigoGrado}>
                  {grado.nombreGrado}
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={agregarGradoAEstudiante}>
            Guardar
          </Button>
          <Button color="secondary" onClick={toggleSecondModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VerEstudiante;
