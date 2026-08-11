import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

import "./Login.css";
import Button from "../../components/Button";
import {useAuth} from "../../contexts/authContext.jsx";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    console.log("API_URL:", API_URL);
    console.log("LOGIN URL:", `${API_URL}/api/auth/login`);

    const handleSubmit = async (e) => {
            e.preventDefault();
            
            try {
                const response = await fetch(`${API_URL}/api/auth/login`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                
                if(!response.ok){
                    console.error("Error during login:", data.error);
                    return;
                }

                localStorage.setItem("token", data.accessToken);
                console.log("Login successful:", data);

                login(data.user);

                navigate("/");

            } catch (error) {
                console.error("Error during login:", error);
            }
        }

    return (
        <>
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#091413"}}>
                <div id = "LoginContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="form-label" htmlFor="username">Username:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input
                                className="input-field"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Login</Button>
                    </form>

                    <div style = {{marginTop: "10px", textAlign: "center"}}>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}