import {BrowserRouter, Routes, Route} from "react-router-dom"; 
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/accounts/Login";
import Signup from "./pages/accounts/Signup";
import Conversations from "./pages/messages/Conversations.jsx";
import Profiles from "./pages/accounts/profiles";
import ProfileSignUp from "./pages/accounts/ProfileSignUp.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import Search from "./pages/utilities/Search.jsx";

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
        <Route path="/conversation" element={
          <ProtectedRoute>
            <Conversations />
          </ProtectedRoute>
        } />
        <Route path="/profile/:profile_id" element={
          <ProtectedRoute>
            <Profiles />
          </ProtectedRoute>
        } />
        <Route path="/profileSignUp" element= {
          <ProtectedRoute>
            <ProfileSignUp/>
          </ProtectedRoute>
        }/>
        <Route path="/profileSignUp" element= {
            <ProfileSignUp/>
        }/>
        <Route path="/search" element= {
            <Search/>
        }/>
      </Routes>
    </BrowserRouter>
  );
}