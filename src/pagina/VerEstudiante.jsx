import React, { useState } from "react";
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
  const [selectedEncargado, setSelectedEncargado] = useState();
  const [filtroNombre, setFiltroNombre] = useState("");
  const [datos, setDatos] = useState([]);
  

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleVerClick = (estudiante) => {
    setSelectedEncargado(estudiante);
    toggleModal();
  };

  const getEstudiantes = async () => {
    try {
      
        const response = await fetch(`${"http://localhost:3000/api/"}/estudiante/getall`);
        const data = await response.json();
        const estudiantesFiltrados = filtroNombre
          ? data.resultado.filter((estudiante) =>
              new RegExp(filtroNombre, 'i').test(estudiante.nombreEstudiante)
            )
          : [];
        setDatos(estudiantesFiltrados);
      }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4>Estudiante</h4>
      <div className="p-5">
       <Row>
       <Col > 
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
          <Row >
       <Col sm={12} md={6} >
    <Input
      placeholder="Buscar Estudiante por Nombre"
      type="text"
      value={filtroNombre}
      onChange={(e) => setFiltroNombre(e.target.value)}
          />
          </Col>
          
          <Col className="text-end" >
            <NavLink to="/estudiante">
              <Button color="success">Crear Estudiante</Button>
            </NavLink>
          </Col >
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
    </>
  );
};

export default VerEstudiante;
