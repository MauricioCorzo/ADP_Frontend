import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext()

 export const PacientesProvider = ({children}) => {

    const [ pacientes , setPacientes ] = useState([])
    const [ paciente , setPaciente ] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem("token")
                if(!token) {
                  return
                }    
                const config = {
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios("/pacientes", config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    },[])

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem("token")
        const config = {
            headers : {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}` , paciente , config)
                const pacientesActualizado = pacientes.map (pacienteDelState => pacienteDelState._id === data._id ? data : pacienteDelState ) // para que s emodifique el listado de pacientes y se reflejen los cambios
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        } else {
        try {
            const { data } = await clienteAxios.post("/pacientes" , paciente, config )  // se hace el config porque en las rutas definimos que tiene que pasar el checkAuth antes de hacer el llamado y necesitamos mandarle el token
            const { createdAt , updatedAt , __v, ...pacienteAlmacenado } = data  // crea el objeto menos las tres primeras propiedades
            setPacientes([pacienteAlmacenado, ...pacientes]) // para guardar el nuevo paciente y no pisar los pacientes existentes en el estado global de useContext
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
}

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm("¿Confirmas que deseas Eliminar?") // Se muestra un msj en pantalla para confirmar eliminar un paciente
        if(confirmar){
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacienteActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <PacientesContext.Provider value={{pacientes , guardarPaciente, setEdicion, paciente , eliminarPaciente}}>
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext
