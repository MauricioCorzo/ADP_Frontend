import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../Components/Alerta'
import clienteAxios from '../config/axios'


const Registrar =  () => {

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repetirPassword, setRepetirPassword] = useState("")
  const [alerta, setAlerta] = useState({})


  let handleSubmit = async (e) =>{
    e.preventDefault()

    if([nombre,email,password,repetirPassword].includes("")){
      setAlerta({msg: "Hay campos vacios", error: true})
      setTimeout(() => {
        setAlerta(false)
      },2500)
      return
    }
    if(password !== repetirPassword){
      setAlerta({msg: "Las password deben ser iguales", error: true})
      setTimeout(() => {
        setAlerta(false)
      },2500)
      return
    }
    if(password.length < 6){
      setAlerta({msg: "Las password es muy corta, necesita mas de 6 caracteres", error: true})
      setTimeout(() => {
        setAlerta(false)
      },2500)
      return
    }

    setAlerta({})
    //Crea el usuario en la API

    try {
      const url = `/veterinarios`  // VARIABLE DE ENTERNO, ASI FUNCIONA CON VITE(FIJARSE EN AXIOS.JSX IMPORTADO ARRIBA)
      await clienteAxios.post(url, {nombre,email,password})
      setAlerta({msg: "Creado Correctamente, Revisa tu Email", error: false})
      setTimeout(() => {
        setAlerta(false)
      },2500)
    } catch (error) {
      setAlerta({ msg : error.response.data.msg , error: true})
      setTimeout(() => {
        setAlerta(false)
      },2500)
    }

  }
  const {msg} = alerta

  return (
    <>
     <div>
         <h1 className="text-indigo-600 font-black text-7xl">Crea tu Cuenta y Administra<span className="text-black"> tus Pacientes</span></h1>
       </div>
       <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
         {msg && <Alerta 
         alerta={alerta}
         />}
          
          <form onSubmit={handleSubmit}>
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
              <input 
              type="text"
              placeholder='Tu Nombre...' 
              className="border w-8/12 p-3 mt-3 bg-gray-50 rounded-xl" 
              value={nombre} 
              onChange={e => setNombre(e.target.value)}
              />
          </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input 
              type="email" 
              placeholder='Tu Email...' 
              className="border w-8/12 p-3 mt-3 bg-gray-50 rounded-xl" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
          </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
              <input 
              type="password" 
              placeholder='Tu Password...' 
              className="border w-8/12 p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
              />
          </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
              <input 
              type="password" 
              placeholder='Repite Tu Password...' 
              className="border w-8/12 p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
              />
          </div>
          <input 
          type="submit" 
          value="Crear Cuenta" 
          className="bg-indigo-700 w-5/12 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900" />
          </form>
          <nav className='mt-10 lg:flex lg:justify-between'> 
          <Link className="block text-center my-5 mr-11 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvidaste tu contraseña</Link>
          </nav>
        </div>
    </>
  )
}

export default Registrar