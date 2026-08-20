import {useNavigate} from "react-router-dom";

import { useAuth } from "../contexts/authContext.jsx";
import { logout as logoutService } from "../services/authService.js";

import Button from "../components/Button.jsx";

import "./Home.css";
import Sidebar from "../components/sidebar.jsx";

export default function Home() {
    const navigate = useNavigate();
    const {user, logout} = useAuth();

    const handleLogout = async () => {
        try {
            await logoutService();

            logout();

            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
  return (
    <div id="home">
        <Sidebar activePage="Home"/>
        <div className = "ButtonContainer">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
    </div>
  );
}