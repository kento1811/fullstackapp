import {useNavigate} from "react-router-dom";

import { useAuth } from "../contexts/authContext.jsx";
import { logout as logoutService } from "../services/authService.js";

import Button from "../components/Button";

import "./Home.css"

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
    <>
        <div className = "ButtonContainer">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
    </>
  );
}