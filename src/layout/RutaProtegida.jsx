import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import useAuth from '../hooks/useAuth'

const RutaProtegida = () => {

    const { auth , cargando } = useAuth() // extraemos la informacion del contex, en este caso, el token para poder mostrar el area privada
    if(cargando) return "cargando..."

  return (
    <>  
        <Header/>
            { auth?._id ? (
            <main className='container mx-auto mt-10'> 
                <Outlet/>
            </main>)
             : <Navigate to="/" />}
        <Footer />
    </>

  )
}

export default RutaProtegida
