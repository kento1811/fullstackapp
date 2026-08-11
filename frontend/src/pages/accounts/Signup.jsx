import {useState} from "react";
import {useNavigate} from "react-router-dom";

import "./Signup.css";
import Button from "../../components/Button";

export default function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            
            if(!response.ok){
                console.error("Error during signup:", data.error);
                return;
            }

            console.log("Signup successful:", data);
            navigate("/login");

        } catch (error) {
            console.error("Error during signup:", error);
        }
    }

    return (
        <>
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#091413"}}>
                <div id = "SignupContainer">
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
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input
                                className="input-field"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="input-group">
                            <label className="form-label" htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                className="input-field"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Signup</Button>
                    </form>

                    <div style = {{marginTop: "10px", textAlign: "center"}}>
                        Have an account? <a href="/login">Login</a>
                    </div>
                </div>
            </div>
        </>
    )
}