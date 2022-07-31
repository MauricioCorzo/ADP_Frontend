import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='flex gap-3 ml-10'>
        <Link to="/admin/perfil" className='font-bold uppercase text-gray-600'>Perfil</Link>
        <Link to="/admin/cambiar-password" className='font-bold uppercase text-gray-600'>Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav