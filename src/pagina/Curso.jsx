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

const VerCurso = () => {
  const [modal, setModal] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [datos, setDatos] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleVerClick = (curso) => {
    setSelectedCurso(curso);
    toggleModal();
  };

  const getCursos = async () => {
    try {
      // Reemplaza la URL de la API con la correcta para obtener grados
      const response = await fetch(`${"http://localhost:3000/api/"}/curso/getall`);
      const data = await response.json();

      // Filtra los grados por nombre si se ha ingresado un valor en el campo de búsqueda
      const cursosFiltrados = filtroNombre
        ? data.resultado.filter((curso) =>
            curso.nombreCurso.toLowerCase().includes(filtroNombre.toLowerCase())
          )
        : [];

      setDatos(cursosFiltrados);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4>Curso</h4>
      <div className="p-5">
        <Row>
          <Col>
            <Button
              color="primary"
              onClick={() => {
                
              getCursos();
              }}
            >
              Buscar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Input
              placeholder="Buscar Curso por Nombre"
              type="text"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </Col>
          <Col className="text-end">
            <NavLink to="/crearcurso">
              <Button color="success">Registrar Curso</Button>
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
                <th scope="col">Grado Asignado </th>
              </tr>
            </thead>
            <tbody className="table text-center">
              {datos.map((curso) => (
                <tr key={curso.codigoCurso}>
                  <td>{curso.codigoCurso}</td>
                  <td>{curso.nombreCurso}</td>
                  <td>{curso.descripcionCurso}</td>
                  
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
                        handleVerClick(curso);
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
  <ModalHeader toggle={toggleModal}>Información del docente asignado</ModalHeader>
  <ModalBody>
    {selectedCurso && (
      <>
        {selectedCurso.codigoGrado.map((grado, index) => (
          <div key={index}>
            <p><strong>Código Grado:</strong> {grado.codigoGrado}</p>
            <p><strong>Nombre :</strong> {grado.nombreGrado}</p>
            <p><strong>Descripción:</strong> {grado.descripcionGrado}</p>
           
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

export default VerCurso;
