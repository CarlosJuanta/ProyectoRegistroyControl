import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import '../Styles/stylehome.scss';
import logo from '../Imagenes/logoescuela.png'; // Importa la imagen
import NavbarNav from './NavbarNav'
import Sidebar from './Sidebar'
import Inicio from '../pagina/Inicio'
import Docente from '../pagina/Docente'
import Estudiante from '../pagina/Estudiante'
import Grado from '../pagina/Grado'
import Curso from '../pagina/Curso'
import Asistencia from '../pagina/Asistencia'
import Calificaciones from '../pagina/Calificaciones'

const Home = () => {
  return (
    <Router>
       
        <div className="flex">
        <Sidebar />
        <div className='content w-100'>
        <NavbarNav /> 
           <Routes>
          <Route exact path='/' element={< Inicio />}/>
          <Route exact path='/docente' element={< Docente />}/>
          <Route exact path='/estudiante' element={< Estudiante />}/> 
          <Route exact path='/grado' element={< Grado />}/> 
          <Route exact path='/curso' element={< Curso />}/> 
          <Route exact path='/asistencia' element={< Asistencia />}/> 
          <Route exact path='/calificaciones' element={< Calificaciones />}/>  
          </Routes>
          </div>
        </div>    
  </Router>
  )
}

export default Home