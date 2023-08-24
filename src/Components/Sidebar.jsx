import React from 'react'
import {NavLink} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="sidebar bg-light">
    <ul> 
        <li>
            <NavLink to="/" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'><FaIcons.FaUniversity className="me-2"/>Inicio</NavLink>
        </li>
        <li>
            <NavLink to="/estudiante" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'><FaIcons.FaUserGraduate className="me-2"/>Estudiante</NavLink>
        </li>
        <li>
            <NavLink to="/docente" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'><FaIcons.FaUserTie className="me-2"/>Docente</NavLink>
        </li>
        <li>
            <NavLink to="/grado" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'><FaIcons.FaUniversity className="me-2"/>Grado</NavLink>
        </li>
        <li>
            <NavLink to="/curso" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'><FaIcons.FaWallet className="me-2"/>Curso</NavLink>
        </li>
        <li>
            <NavLink to="/asistencia" className='text-dark rounded py-2 w-100 d-inline-block px-2' activeClassName='active'><FaIcons.FaUserEdit className="me-2"/>Asistencia</NavLink>
        </li>
        <li>
            <NavLink to="/calificaciones" className='text-dark rounded py-2 w-100 d-inline-block px-1' activeClassName="active"><FaIcons.FaPencilAlt className="me-2"/>Calificaciones</NavLink>
        </li>
    </ul>
    </div>
  )
}

export default Sidebar