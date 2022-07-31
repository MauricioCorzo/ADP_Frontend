import {BrowserRouter, Routes, Route} from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"
import Login from "./PaginasPublicas/Login"
import Registrar from "./PaginasPublicas/Registrar"
import OlvidePassword from "./PaginasPublicas/OlvidePassword"
import NuevoPassword from "./PaginasPublicas/NuevoPassword"
import ConfirmarCuenta from "./PaginasPublicas/ConfirmarCuenta"
import { AuthProvider } from "./context/AuthProvider"
import { PacientesProvider } from "./context/PacientesProvider"
import AdministrarPacientes from "./PaginasPrivadas/AdministrarPacientes"
import EditarPerfil from "./PaginasPrivadas/EditarPerfil"
import CambiarPassword from "./PaginasPrivadas/CambiarPassword"

//  El AuthProvider es el state que este disponible aqui va a estar disponible en todos los hijos, es parecido redux con el provider y el store

function App() {
 

  return (
    <BrowserRouter>
    <AuthProvider>
      <PacientesProvider>  
      <Routes>

        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />}/>
          <Route path="registrar" element={<Registrar />}/>
          <Route path="olvide-password" element={<OlvidePassword />}/>
          <Route path="olvide-password/:token" element={<NuevoPassword />}/>
          <Route path="confirmar/:id" element={<ConfirmarCuenta />}/>
        </Route>

        <Route path="/admin" element={<RutaProtegida />}>
          <Route index element={<AdministrarPacientes/>} />
          <Route path="perfil" element={<EditarPerfil/>} />
          <Route path="cambiar-password" element={<CambiarPassword/>} />
        </Route>


      </Routes>
      </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
