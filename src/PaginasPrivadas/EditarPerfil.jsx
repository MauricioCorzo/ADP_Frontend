import React, { useEffect , useState } from 'react'
import AdminNav from '../Components/AdminNav'
import useAuth from "../hooks/useAuth"
import Alerta from "../Components/Alerta"

const EditarPerfil = () => {

  const { auth , actualizarPerfil } = useAuth() // Nos traemos la info del perfil del usuario
  const [ perfil , setPerfil ] = useState("")
  const [ alerta , setAlerta ] = useState({})

  useEffect(() => {
    setPerfil(auth)
  },[auth])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { nombre , email } = perfil

    if([nombre,email].includes("")){
      setAlerta({msg: "Nombre y Email son requeridos" , error: true})
      setTimeout(() => {
        setAlerta({})
      }, 2500)
      return
    }

     const resultado = await actualizarPerfil(perfil) // Lo hago asi para que me retorne un objeto en el Authprovider y desp pueda hacer uso del componente de alerta con su msg y error

     setAlerta(resultado)
  }

  const {msg} = alerta
  return (
    <>
      <AdminNav />
      <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
      <p className='text-xl mt-5 mb-10 text-center'>Modifica tu<span className='text-indigo-600 font-bold'> Informacion Aqui</span></p>
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          { msg && <Alerta alerta={alerta} /> }
          <form onSubmit={handleSubmit}>
            <div className='my-3'>
              <label className='font-bold text-gray-600 uppercase'>Nombre</label>
              <input 
              type="text"
              placeholder='Nombre...'
              name='nombre'
              value={perfil.nombre || ""} // de esta forma sacamos el warning de la consola que no decia que era n formulario noControlado
              onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})}
              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
               />
            </div>
            <div className='my-3'>
              <label className='font-bold text-gray-600 uppercase'>Sitio Web</label>
              <input 
              type="text"
              placeholder='Sitio Web...'
              name='web'
              value={perfil.web || ""}
              onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})}
              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
               />
            </div>
            <div className='my-3'>
              <label className='font-bold text-gray-600 uppercase'>Telefono</label>
              <input 
              type="text"
              placeholder='Telefono...'
              name='telefono'
              value={perfil.telefono || ""}
              onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})}
              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
               />
            </div>
            <div className='my-3'>
              <label className='font-bold text-gray-600 uppercase'>Email</label>
              <input 
              type="text"
              placeholder='Email...'
              name='email'
              value={perfil.email || ""}
              onChange={e => setPerfil({...perfil, [e.target.name] : e.target.value})}
              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
               />
            </div>
            <input 
            type="submit" 
            value="Guardar Cambios" 
            className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer'  
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default EditarPerfil