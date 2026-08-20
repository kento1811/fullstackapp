import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/authContext.jsx";
import { login as loginService } from "../../services/authService.js";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginService(username, password);

            console.log("Login successful:", data);

            login(data.user);

            navigate("/profiles");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#100f0f",
                }}
            >
                <div id="LoginContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label
                                className="form-label"
                                htmlFor="username"
                            >
                                Username:
                            </label>

                            <input
                                className="input-field"
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                        </div>

                        <div className="input-group">
                            <label
                                className="form-label"
                                htmlFor="password"
                            >
                                Password:
                            </label>

                            <input
                                className="input-field"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        <Button type="submit">
                            Login
                        </Button>
                    </form>

                    <div
                        style={{
                            marginTop: "10px",
                            textAlign: "center",
                        }}
                    >
                        Don't have an account?{" "}
                        <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}