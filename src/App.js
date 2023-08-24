

function App() {
  return (
    <div>
    <div class="login-container">
        <img class="logo" src="ruta-a-tu-imagen.png" alt="Logo de la escuela"/>
        <h2 class="school-name">José Joaquín Palma</h2>
        <form>
            <div class="form-group">
                <label for="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" required/>
            </div>
            <div class="form-group">
                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" required/>
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
    </div>
    </div>
  );
}

export default App;
