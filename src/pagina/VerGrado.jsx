import React, { useState} from "react";
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

const VerGrado = () => {
  const [modal, setModal] = useState(false);
  const [selectedGrado, setSelectedGrado] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [datos, setDatos] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleVerClick = (grado) => {
    setSelectedGrado(grado);
    toggleModal();
  };

  const getGrados = async () => {
    try {
      // Reemplaza la URL de la API con la correcta para obtener grados
      const response = await fetch(`${"http://localhost:3000/api/"}/grado/getall`);
      const data = await response.json();

      // Filtra los grados por nombre si se ha ingresado un valor en el campo de búsqueda
      const gradosFiltrados = filtroNombre
        ? data.resultado.filter((grado) =>
            grado.nombreGrado.toLowerCase().includes(filtroNombre.toLowerCase())
          )
        : [];

      setDatos(gradosFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4>Grado</h4>
      <div className="p-5">
        <Row>
          <Col>
            <Button
              color="primary"
              onClick={() => {
                
                getGrados();
              }}
            >
              Buscar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Input
              placeholder="Buscar Grado por Nombre"
              type="text"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </Col>
          <Col className="text-end">
            <NavLink to="/grado">
              <Button color="success">Registrar Grado</Button>
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
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Sección</th>
                <th scope="col">Docente Asignado</th>
              </tr>
            </thead>
            <tbody className="table text-center">
              {datos.map((grado) => (
                <tr key={grado.codigoGrado}>
                  <td>{grado.codigoGrado}</td>
                  <td>{grado.nombreGrado}</td>
                  <td>{grado.descripcionGrado}</td>
                  <td>{grado.seccionGrado}</td>
                 {/* 
                  <td>
                  {grado.cuiDocente.map((docente) => (
                  <div key={docente._id}>
                  {docente.cuiDocente} 
                  </div>
                  ))}
                  </td>
                    */}
                    <td>
                    <Button
                      color="success"
                      onClick={() => {
                        handleVerClick(grado);
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
  <ModalHeader toggle={toggleModal}>Detalles del Grado</ModalHeader>
  <ModalBody>
    {selectedGrado && (
      <>
        {selectedGrado.cuiDocente.map((docente, index) => (
          <div key={index}>
            <p><strong>CUI Docente:</strong> {docente.cuiDocente}</p>
            <p><strong>Nombre Docente:</strong> {docente.nombreDocente}</p>
            <p><strong>Apellido Docente:</strong> {docente.apellidoDocente}</p>
            <p><strong>Correo Docente:</strong> {docente.correoDocente}</p>
            <p><strong>Telefono Docente:</strong> {docente.telefonoDocente}</p>

          </div>
        ))}
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

export default VerGrado;
