import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Alerta from "../Components/Alerta"
import clienteAxios from "../config/axios"


const OlvidePassword = () => {

  const [ email , setEmail] = useState("")
  const [ alerta , setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === "" || email.length < 6){
      setAlerta({msg: "El email es obligatorio" , error: true})
      setTimeout(() => {
        setAlerta({})
      }, 2500)
      return
    }

    try {
      const url = "/veterinarios/olvide-password"
      const {data} = await clienteAxios.post( url , { email }) 
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({msg: error.response.data.msg , error: true})  // Mensaje de error declarado en el backend
    }

  }
  const {msg} = alerta

  return (
    <>
    <div>
         <h1 className="text-indigo-600 font-black text-7xl">Recuperta tu Acceso y no Pierdas <span className="text-black"> tus Pacientes</span></h1>
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
          <input type="submit" value="Enviar Instrucciones" className="bg-indigo-700 w-5/12 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900" />
           </form>
           <nav className="mt-10 lg:flex lg:justify-start" >
           <Link className="block text-center my-5 mr-11 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
            <Link className="block text-center my-5 mr-11 text-gray-500" to="/registrar">¿No tienes cuenta? Regístrate aquí</Link>
          </nav>
    </div>
    </>
  )
}

export default OlvidePassword