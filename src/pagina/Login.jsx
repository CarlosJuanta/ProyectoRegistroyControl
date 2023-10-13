import React, { useState, useContext, useEffect } from "react";
import "../Styles/style.css";
import logo from "../Imagenes/logoescuela.png"; // Importa la imagen
import { Contexto } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { usuario, fetchUser, setUsuario } = useContext(Contexto);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const respuesta = await fetchUser(username, contrasena);
    console.log(respuesta);
    if (respuesta === "admin") {
      navigate("/inicio");
    } else if (respuesta === "docente") {
      navigate("/verasistencia");
    } else {
      alert("Credenciales Inválidas");
    }
  };

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    } else {
      if (usuario.rol === "admin") {
        navigate("/inicio");
      } else if (usuario.rol === "docente") {
        navigate("/verasistencia");
      } else {
        navigate("/login");
      }
    }
  }, [usuario]);

  return (
    <div className="principal">
      <div className="login-container">
        <h2>Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              placeholder="contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
