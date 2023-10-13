import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { Contexto } from "../Context/ContextProvider";
const Sidebar = () => {
  const { usuario, setUsuario } = useContext(Contexto);
  const navigate = useNavigate();

  console.log(usuario);

  const handleLogout = () => {
    const usuarioLogout = {
      rol: null,
    };
    setUsuario(usuarioLogout); // Establecer el usuario como nulo al cerrar sesión
    navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
  };

  if (!usuario) {
    navigate("/login");
  } else {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="sidebar bg-light">
                <ul>
                  {usuario.rol === "publico" || usuario.rol === null ? (
                    <li>
                      <NavLink
                        to="/login"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUser className="me-2" />
                        Login
                      </NavLink>
                    </li>
                  ) : null}

                  {usuario.rol === "admin" ? (
                    <li>
                      <NavLink
                        to="/inicio"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUniversity className="me-2" />
                        Nosotros
                      </NavLink>
                    </li>
                  ) : usuario.rol === "docente" ? (
                    <li>
                      <NavLink
                        to="/"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUniversity className="me-2" />
                        Nosotros
                      </NavLink>
                    </li>
                  ) : usuario.rol === "publico" || usuario.rol === null ? (
                    <li>
                      <NavLink
                        to="/inicio"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUniversity className="me-2" />
                        Nosotros
                      </NavLink>
                    </li>
                  ) : null}

                  {usuario.rol === "admin" ? (
                    <li>
                      <NavLink
                        to="/verestudiante"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUserGraduate className="me-2" />
                        Estudiante
                      </NavLink>
                    </li>
                  ) : null}
                  {usuario.rol === "admin" ? (
                    <li>
                      <NavLink
                        to="/verdocente"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUserTie className="me-2" />
                        Docente
                      </NavLink>
                    </li>
                  ) : null}

                  {usuario.rol === "admin" ? (
                    <li>
                      <NavLink
                        to="/vergrado"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUniversity className="me-2" />
                        Grado
                      </NavLink>
                    </li>
                  ) : null}

                  {usuario.rol === "admin" ? (
                    <li>
                      <NavLink
                        to="/curso"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaWallet className="me-2" />
                        Curso
                      </NavLink>
                    </li>
                  ) : null}

                  {usuario.rol === "admin" ? (
                    <li>
                      <NavLink
                        to="/asistencia"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUserEdit className="me-2" />
                        Asistencia
                      </NavLink>
                    </li>
                  ) : usuario.rol === "docente" ? (
                    <li>
                      <NavLink
                        to="/asistencia"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaUserEdit className="me-2" />
                        Asistencia
                      </NavLink>
                    </li>
                  ) : null}

                  {usuario.rol === "admin" ? (
                    <li>
                      <NavLink
                        to="/calificaciones"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaPencilAlt className="me-2" />
                        Calificaciones
                      </NavLink>
                    </li>
                  ) : usuario.rol === "docente" ? (
                    <li>
                      <NavLink
                        to="/calificaciones"
                        className=" rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaPencilAlt className="me-2" />
                        Calificaciones
                      </NavLink>
                    </li>
                  ) : null}

                  {usuario.rol === "admin" || usuario.rol === "docente" ? (
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-primary rounded py-2 w-100 d-inline-block px-2 linky"
                      >
                        <FaIcons.FaSignOutAlt className="me-2" />
                        Cerrar Sesión
                      </button>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Sidebar;
