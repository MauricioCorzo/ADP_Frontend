import React, {useEffect,useState} from 'react'
import {Link, useParams} from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../Components/Alerta"

const ConfirmarCuenta = () => {
  
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando , setCargando] = useState(true)
  const [alerta , setAlerta] = useState({})
  const params = useParams()
  // console.log(params)
  const {id} = params
  console.log(id)

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}` 
        const {data} = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({msg: data.msg})
      } catch (error) {
        setAlerta({msg: error.response.data.msg , error: true})
      }

      setCargando(false)
    }
    confirmarCuenta()
  },[])


  return (
    <>
     <div>
         <h1 className="text-indigo-600 font-black text-7xl">Confirma tu Cuenta y comienza a Administar<span className="text-black"> tus Pacientes</span></h1>
       </div>
       <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando && <Alerta alerta={alerta}/>}
        {cuentaConfirmada && <Link className="block text-center my-5 mr-11 text-gray-500" to="/">Inicia Sesión</Link>}
        </div>
    </>
  )
}

export default ConfirmarCuenta