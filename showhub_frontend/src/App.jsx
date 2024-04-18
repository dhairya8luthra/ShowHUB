import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import AdminLogin from "./pages/AdminLogin"
import Signup from "./pages/Signup"
import MovieDetails from "./pages/MovieDetails"
import Selectseats from "./pages/Selectseats"

function App() {
 

  return (
    <>
    <Routes>
      <Route path = '/' element={<Landing/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/home' element={<Home/>}/>
      <Route path = '/Adminlogin' element={<AdminLogin/>}/>
      <Route path = '/register' element={<Signup/>}/>
      <Route path="/movies/:movieName" element={<MovieDetails />} />
      <Route path="/shows/:showId/selectseats/:screenId/moviename/:movietitle/price/:price" element={<Selectseats />}/>
    </Routes>
    </>
  )
}

export default App
