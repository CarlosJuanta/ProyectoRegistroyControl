import React from 'react'
import {NavLink} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="sidebar bg-light " expand=" sidebar md sm lg">
    <ul > 
        <li >
            <NavLink to="/" className=' rounded py-2 w-100 d-inline-block px-2 linky' ><FaIcons.FaUniversity className="me-2"/>Inicio</NavLink>
        </li>
        <li>
            <NavLink to="/verestudiante" className=' rounded py-2 w-100 d-inline-block px-2 linky' ><FaIcons.FaUserGraduate className="me-2"/>Estudiante</NavLink>
        </li>
        <li>
            <NavLink to="/verdocente" className=' rounded py-2 w-100 d-inline-block px-2 linky' ><FaIcons.FaUserTie className="me-2"/>Docente</NavLink>
        </li>
        <li>
            <NavLink to="/vergrado" className=' rounded py-2 w-100 d-inline-block px-2 linky' ><FaIcons.FaUniversity className="me-2"/>Grado</NavLink>
        </li>
        <li>
            <NavLink to="/curso" className=' rounded py-2 w-100 d-inline-block px-2 linky' ><FaIcons.FaWallet className="me-2"/>Curso</NavLink>
        </li>
        <li>
            <NavLink to="/verasistencia" className='rounded py-2 w-100 d-inline-block px-2 linky' ><FaIcons.FaUserEdit className="me-2"/>Asistencia</NavLink>
        </li>
        <li>
            <NavLink to="/calificaciones" className='rounded py-2 w-100 d-inline-block px-1 linky' ><FaIcons.FaPencilAlt className="me-2"/>Calificaciones</NavLink>
        </li>
    </ul>
    </div>
  )
}

export default Sidebar