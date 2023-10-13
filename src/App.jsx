import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";
import "./Styles/stylehome.scss";
import logo from "./Imagenes/logoescuela.png"; // Importa la imagen
import Login from "./pagina/Login";
import Sidebar from "./Components/Sidebar";
import NavbarNav from "./Components/NavbarNav";
import Inicio from "./pagina/Inicio";
import Docente from "./pagina/Docente";
import Estudiante from "./pagina/Estudiante";
import Grado from "./pagina/Grado";
import Curso from "./pagina/Curso";
import Asistencia from "./pagina/Asistencia";
import Calificaciones from "./pagina/Calificaciones";
import VerEstudiante from "./pagina/VerEstudiante";
import EncargadoInfo from "./pagina/EncargadoInfor";
import VerDocente from "./pagina/VerDocente";
import GradoDocente from "./pagina/GradoDocente";
import VerGrado from "./pagina/VerGrado";
import CrearCurso from "./pagina/CrearCurso";
import RegistrarFalta from "./pagina/RegistrarFalta";
import VerFalta from "./pagina/VerFalta";
import VerAsistencia from "./pagina/VerAsistencia";
import CalificacionCurso from "./pagina/CalificacionCurso";
import VerCalificacionCurso from "./pagina/VerCalificacionCurso";
import NotFoundPage from "./pagina/NotFoundPage";
import ContextProvider from "./Context/ContextProvider";

const App = () => {
  return (
    <ContextProvider>
      <div className="flex">
        <div className="position-fixed">
          <Sidebar />
        </div>
        <div className="content w-100 " style={{ paddingLeft: "225px" }}>
          <NavbarNav />
          <div className="contenido">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/inicio" element={<Inicio />} />
              <Route exact path="/docente" element={<Docente />} />
              <Route exact path="/estudiante" element={<Estudiante />} />
              <Route exact path="/grado" element={<Grado />} />
              <Route exact path="/curso" element={<Curso />} />
              <Route exact path="/asistencia" element={<Asistencia />} />
              <Route
                exact
                path="/calificaciones"
                element={<Calificaciones />}
              />
              <Route exact path="/verestudiante" element={<VerEstudiante />} />
              <Route
                exact
                path="/encargadoinfo/:id"
                element={<EncargadoInfo />}
              />
              <Route exact path="/verdocente" element={<VerDocente />} />
              <Route exact path="/gradodocente" element={<GradoDocente />} />
              <Route exact path="/vergrado" element={<VerGrado />} />
              <Route exact path="/crearcurso" element={<CrearCurso />} />
              <Route
                exact
                path="/registrarfalta"
                element={<RegistrarFalta />}
              />
              <Route exact path="/verfalta" element={<VerFalta />} />
              <Route exact path="/verasistencia" element={<VerAsistencia />} />
              <Route
                exact
                path="/calificacioncurso"
                element={<CalificacionCurso />}
              />
              <Route
                exact
                path="/vercalificacioncurso"
                element={<VerCalificacionCurso />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </ContextProvider>
  );
};

export default App;
