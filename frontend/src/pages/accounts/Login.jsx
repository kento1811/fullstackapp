import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";
import { ErrorPopUp } from "../../components/utilities/ErrorPopup.jsx";
import Button from "../../components/utilities/Button.jsx";
import { useAuth } from "../../contexts/authContext.jsx";
import { login as loginService } from "../../services/authService.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError,setIsError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginService(email, password);

            login(data.user);

            navigate("/profile");
        } catch (error) {
            setIsError(true);
            setErrorMessage("Ivalid email or password");
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
                {isError&&
                    <ErrorPopUp errorMessage = {errorMessage} setError= {setIsError}></ErrorPopUp>
                }
                <div id="LoginContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label
                                className="form-label"
                                htmlFor="email"
                            >
                                Email:
                            </label>

                            <input
                                className="input-field"
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
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