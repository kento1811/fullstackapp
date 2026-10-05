import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

import "./Signup.css";
import Button from "../../components/utilities/Button.jsx";
import {signup} from "../../services/authService.js";
import { ErrorPopUp } from "../../components/utilities/ErrorPopup.jsx";

export default function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError,setIsError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setIsError(true);
            setErrorMessage("Passwords do not match!");
            return;
        }
        
        try {
            const {response, data} = await signup(
                username,
                email,
                password
            );

            console.log("Signup successful:");
            navigate("/ProfileSignUp");

        } catch (error) {
            console.error("Error during signup:", error);
            setIsError(true);
            const message = error?.message || String(error);
                if(message.includes('email')){
                    setErrorMessage("email already taken");
                }
                if(message.includes('username')){
                    setErrorMessage("username already taken");
                }
                return;
        }
    }

    return (
        <>
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#100f0f"}}>
                {isError && 
                    <ErrorPopUp errorMessage={errorMessage} setError={setIsError}></ErrorPopUp>
                }
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
                        Have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}