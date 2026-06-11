import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Favorites from "./pages/Favorites.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddProperty from "./pages/AddProperty.jsx";
import MyProperties from "./pages/MyProperties";
import EditProperty from "./pages/EditProperty";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
  path="/my-properties"
  element={
    <ProtectedRoute>
      <MyProperties />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-property/:id"
  element={
    <ProtectedRoute>
      <EditProperty />
    </ProtectedRoute>
  }
/>


        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />


      </Routes>
    </>
  );
}

export default App;