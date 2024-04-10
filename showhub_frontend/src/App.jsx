import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import AdminLogin from "./pages/AdminLogin"

function App() {
 

  return (
    <>
    <Routes>
      <Route path = '/' element={<Landing/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/Home' element={<Home/>}/>
      <Route path = '/Adminlogin' element={<AdminLogin/>}/>

    </Routes>
    </>
  )
}

export default App
