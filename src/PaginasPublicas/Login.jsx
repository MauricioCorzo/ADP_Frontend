import React , { useState } from 'react'
import {Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Alerta from '../Components/Alerta'
import clienteAxios from '../config/axios'


const Login = () => {

  const [ email , setEmail ] = useState("")
  const [ password , setPassword ] = useState("")
  const [ alerta , setAlerta ] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate() // sirve para redireccionar al usuario


  const handleSubmit = async (e) => {
    e.preventDefault()

    if([ email , password ].includes("")){
      setAlerta({msg: "Ambos campos son requeridos" , error: true})
      setTimeout(()=>{
        setAlerta({})
      },2500)
      return
    }
    
    try {
      const { data } = await clienteAxios.post("/veterinarios/login" , {email,password}) // data es el json web token generado en el controller autenticar
      localStorage.setItem("token" , data.token) // lo guardamos en el LocalStorage
      setAuth(data)
      navigate("/admin")
    } catch (error) {
      setAlerta({msg: error.response.data.msg , error:true})
    }


  }

  const { msg } = alerta
  return (
    <>
       <div>
         <h1 className="text-indigo-600 font-black text-7xl">Inicia Sesion y Administra tus <span className="text-black"> Pacientes</span></h1>
       </div>
       <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alerta alerta={alerta} />}
        
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input type="email" 
              placeholder='Tu Email...'
              value={email}
              onChange={e => setEmail(e.target.value)} 
              className="border w-8/12 p-3 mt-3 bg-gray-50 rounded-xl" />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
              <input type="password" 
              placeholder='Tu Password...'
              value={password}
              onChange={e => setPassword(e.target.value)} 
              className="border w-8/12 p-3 mt-3 bg-gray-50 rounded-xl" />
            </div>
            <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-5/12 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900" />
          </form>
          <nav className="mt-10 lg:flex lg:justify-start" >
            <Link className="block text-center my-5 mr-11 text-gray-500" to="/registrar">¿No tienes cuenta? Regístrate aquí</Link>
            <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvidaste tu contraseña</Link>
          </nav>
       </div>
       
    </>
  )
}

export default Login