import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import AdminLogin from "./pages/AdminLogin"
import Signup from "./pages/Signup"
import MovieDetails from "./pages/MovieDetails"
import Selectseats from "./pages/Selectseats"
import Bookingconfirmed from "./pages/Bookingconfirmed"
import AdminHome from "./pages/AdminHome"
import {AuthProvider} from "./context/AuthContext"

function App() {
 

  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path = '/' element={<Landing/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/home' element={<Home/>}/>
      <Route path = '/Adminlogin' element={<AdminLogin/>}/>
      <Route path = '/register' element={<Signup/>}/>
      <Route path="/movies/:movieName" element={<MovieDetails />} />
      <Route path="/shows/:showId/selectseats/:screenId/moviename/:movietitle/price/:price" element={<Selectseats />}/>
      <Route path="/bookingconfirmed" element={<Bookingconfirmed/>}/>
      <Route path="/modifydatabase" element={<AdminHome/>}/>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
