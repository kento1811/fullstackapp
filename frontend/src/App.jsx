import {BrowserRouter, Routes, Route} from "react-router-dom"; 
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/accounts/Login";
import Signup from "./pages/accounts/Signup";
import Conversations from "./pages/messages/Conversations.jsx";
import Profiles from "./pages/accounts/profiles";
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
        <Route path="/conversations" element={
          <ProtectedRoute>
            <Conversations />
          </ProtectedRoute>
        } />
        <Route path="/profiles" element={
          <ProtectedRoute>
            <Profiles />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}