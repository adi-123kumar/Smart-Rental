import {Routes , Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import PropertyDetails from "./pages/PropertyDetails.jsx"
import Dashboard from "./pages/Dashboard.jsx"


function App(){
  return(
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/property/:id" element={<PropertyDetails/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
  )
}

export default App;