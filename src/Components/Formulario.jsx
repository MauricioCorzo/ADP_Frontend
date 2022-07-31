import React, { useState , useEffect } from 'react'
import Alerta from './Alerta'
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

    const [ nombre , setNombre ] = useState("")
    const [ propietario , setPropietario ] = useState("")
    const [ email , setEmail ] = useState("")
    const [ fecha , setFecha ] = useState("")
    const [ sintomas , setSintomas ] = useState("")
    const [ id , setId ] = useState(null)


    const [ alerta , setAlerta ] = useState({})

    const { guardarPaciente , paciente} = usePacientes()

    useEffect(() => {
        if(paciente?.nombre)
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
        setId(paciente._id)
    }, [paciente])


    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre,propietario,email,fecha,sintomas].includes("")){
            setAlerta({msg: "Todos los campos son requeridos" , error: true})
            setTimeout(() => {
                setAlerta({})
            },3000)
            return
        }

        
        guardarPaciente({nombre,propietario,email,fecha,sintomas, id})
        setAlerta({msg: "Guardado Correctamente"})
        setTimeout(() => {
            setAlerta({})
        },2500)
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
        setId("")
    }

    const {msg} = alerta

  return (
    <>
        <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
        <p className='text-xl mt-5 mb-10 text-center'>Añade tus pacientes y<span className='text-indigo-600 font-bold'> Administralos</span></p>

        <form onSubmit={handleSubmit} className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md '>
            <div className='mb-5'>
                <label htmlFor='nombre' className='text-gray-700 font-bold uppercase'>Nombre Mascota</label>
                <input
                id="nombre" 
                type="text"
                placeholder='Nombre de la Mascota...'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 />
            </div>
            <div className='mb-5'>
                <label htmlFor='propietario' className='text-gray-700 font-bold uppercase'>Nombre Propietario</label>
                <input
                id="propietario" 
                type="text"
                placeholder='Nombre del Propietario...'
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 />
            </div>
            <div className='mb-5'>
                <label htmlFor='email' className='text-gray-700 font-bold uppercase'>Email Propietario</label>
                <input
                id="email" 
                type="email"
                placeholder='Email del Propietario...'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 />
            </div>
            <div className='mb-5'>
                <label htmlFor='fecha' className='text-gray-700 font-bold uppercase'>Fecha Alta</label>
                <input
                id="fecha" 
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 />
            </div>
            <div className='mb-5'>
                <label htmlFor='sintomas' className='text-gray-700 font-bold uppercase'>Sintomas</label>
                <textarea
                id="sintomas" 
                placeholder='Describe los Sintomas...'
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                 />
            </div>
            <input 
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
            type="submit" 
            value={id ? 'Guardar Cambios' : 'Agregar Paciente'}/>
        </form>
        {msg && <Alerta  alerta={alerta}/>}
    </>
  )
}

export default Formulario
