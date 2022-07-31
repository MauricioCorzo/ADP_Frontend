import React, { useState } from 'react'
import AdminNav from '../Components/AdminNav'
import Alerta from '../Components/Alerta'
import useAuth from '../hooks/useAuth'

const CambiarPassword = () => {

    const { guardarNuevaPassword } = useAuth()
    const [ alerta , setAlerta ] = useState({})
    const [ password , setPassword ] = useState({
        password_actual : "",
        password_nuevo : ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(Object.values(password).some(campo => campo === "")){
            setAlerta({ msg : "Todos los campos son obligatorios" , error: true})
            setTimeout(() => {
                setAlerta({})
            },2500)
            return
        }
        if(password.password_nuevo.length < 6){
            setAlerta({msg: "El passwor nuevo deber contener minimo 6 caracteres" , error: true});
            setTimeout(() => {
                setAlerta({})
            }, 2500);
            return;
        }

        const respuesta = await guardarNuevaPassword(password)

        setAlerta(respuesta)
    }

    const { msg } = alerta

  return (
    <>
        <AdminNav />
        <h2 className='font-black text-3xl text-center mt-10'>Cambiar Password</h2>
        <p className='text-xl mt-5 mb-10 text-center'>Modifica tus<span className='text-indigo-600 font-bold'> Password Aqui</span></p>

        <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          { msg && <Alerta alerta={alerta} /> }
          <form onSubmit={handleSubmit}>
            <div className='my-3'>
              <label className='font-bold text-gray-600 uppercase'>Password Actual</label>
              <input 
              type="password"
              placeholder='Password Actual...'
              name='password_actual'
              onChange={e => setPassword({...password, [e.target.name] : e.target.value})}
              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
               />
            </div>
            <div className='my-3'>
              <label className='font-bold text-gray-600 uppercase'>Nuevo Password</label>
              <input 
              type="password"
              placeholder='Password Nuevo...'
              name='password_nuevo'
              onChange={e => setPassword({...password, [e.target.name] : e.target.value})}
              className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
               />
            </div>
            <input 
            type="submit" 
            value="Actualizar Password" 
            className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer'  
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword