import React from 'react';
import '../Styles/style.css';
import logo from '../Imagenes/logoescuela.png'; // Importa la imagen

const Login = () => {
  return (
    <div className="principal">
    <h2 className="school-name">Escuela Oficial Urbana Mixta José Joaquín Palma</h2>
    <div className="login-container">
      <img className="logo" src={logo} alt="Logo de la escuela" />
      <h2>Bienvenido</h2>
      <form>
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <input type="text" id="usuario" name="usuario" placeholder="usuario" required />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena" placeholder="contraseña" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
    </div>
  );
};

export default Login;