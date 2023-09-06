import React, { useState,  } from "react";
import {
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

const VerDocente = () => {
  const [modal, setModal] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState();
  const [filtroNombre, setFiltroNombre] = useState("");
  const [datos, setDatos] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleVerClick = (docente) => {
    setSelectedDocente(docente);
    toggleModal();
  };

  const getDocentes = async () => {
    try {
      const response = await fetch(`${"http://localhost:3000/api/"}/docente/getall`);
      const data = await response.json();
      // Filtra los docentes por nombre si se ha ingresado un valor en el campo de búsqueda
      const docentesFiltrados = filtroNombre
        ? data.resultado.filter((docente) =>
            docente.nombreDocente.toLowerCase().includes(filtroNombre.toLowerCase())
          )
        : [];
      setDatos(docentesFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4>Docente</h4>
      <div className="p-5">
      <Row>
       <Col > 
          <Button
          color="primary"
          onClick={() => {
          setBusquedaRealizada(true);
          getDocentes();
          }}
          >
          Buscar
          </Button>
          </Col>
       </Row>
        <Row>
          <Col sm={12} md={6}>
          <Input
              placeholder="Buscar Docente por Nombre"
              type="text"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
            </Col>
          <Col className="text-end">
          <NavLink to="/docente">
              <Button color="success">Registrar Docente</Button>
            </NavLink>
          </Col>
         </Row>
      </div>
      <div className="table-responsive p-5">
        {datos.length > 0 ? (
          <table className="table table-hover table-light table-sm align-middle table-striped">
            {/* El contenido de la tabla se mostrará solo si hay datos */}
            <thead className="table-dark table text-center">
              <tr>
                <th scope="col">CUI</th>
                <th scope="col">Nombres</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Correo</th>
                <th scope="col">Dirección</th>
                <th scope="col">Nacionalidad</th>
                <th scope="col">Grados Asignados</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className="table text-center">
              {datos.map((docente) => (
                <tr key={docente.cuiDocente}>
                  <td>{docente.cuiDocente}</td>
                  <td>{docente.nombreDocente}</td>
                  <td>{docente.apellidoDocente}</td>
                  <td>{docente.telefonoDocente}</td>
                  <td>{docente.correoDocente}</td>
                  <td>{docente.direccionDocente}</td>
                  <td>{docente.nacionalidadDocente}</td>
                  <td>
                    <NavLink
                      to="/gradodocente"
                      className="text-dark rounded py-2 w-100 d-inline-block px-2"
                      activeClassName="active"
                      style={{ textDecoration: "none" }}
                    >
                      <FaIcons.FaEye className="me-2" /> Ver
                    </NavLink>
                  </td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => {
                        handleVerClick(docente);
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
        <ModalHeader toggle={toggleModal}>Detalles del Docente</ModalHeader>
        <ModalBody>
          {selectedDocente && (
            <>
              <p><strong>CUI:</strong> {selectedDocente.cuiDocente}</p>
              <p><strong>Nombres:</strong> {selectedDocente.nombreDocente}</p>
              <p><strong>Apellidos:</strong> {selectedDocente.apellidoDocente}</p>
              <p><strong>Teléfono:</strong> {selectedDocente.telefonoDocente}</p>
              <p><strong>Correo:</strong> {selectedDocente.correoDocente}</p>
              <p><strong>Dirección:</strong> {selectedDocente.direccionDocente}</p>
              <p><strong>Nacionalidad:</strong> {selectedDocente.nacionalidadDocente}</p>
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

export default VerDocente;
