import {BrowserRouter, Routes, Route} from "react-router-dom"; 

import Home from "./pages/Home";
import Login from "./pages/accounts/Login";
import Signup from "./pages/accounts/Signup";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}