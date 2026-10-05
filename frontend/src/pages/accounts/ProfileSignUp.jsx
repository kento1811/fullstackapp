import {useState} from "react";
import {useNavigate} from "react-router-dom";

import "./ProfileSignUp.css";
import Button from "../../components/utilities/Button.jsx";
import { ErrorPopUp } from "../../components/utilities/ErrorPopup.jsx";

export default function ProfileSignUp(){
    const [name, setName] = useState("");
    const [quote, setQuote] = useState("");
    const [isMale, setIsMale] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isError,setIsError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

        } catch (error) {
                return;
        }
    }

    return (
        <>
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#100f0f"}}>
                {isError && 
                    <ErrorPopUp errorMessage={errorMessage} setError={setIsError}></ErrorPopUp>
                }
                <div id = "signup-profile-container">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="form-label" htmlFor="text">name:</label>
                            <input
                                className="input-field"
                                type="name"
                                id="name"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                         <div className="input-group">
                            <label className="form-label" htmlFor="text">quote:</label>
                            <input
                                className="input-field"
                                type="quote"
                                id="quote"
                                value={quote}
                                onChange={(e) => setQuote(e.target.value)}
                            />
                        </div>
                         <div className="input-group">
                            <label className="form-label">Giới tính:</label>     
                            <div className="radio-checkbox">
                                <label htmlFor="male">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        required
                                        checked={isMale === true}
                                        onChange={(e) => setIsMale(true)}
                                    />
                                    Nam
                                </label>
                                <label htmlFor="female">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        required
                                        checked={isMale === false}
                                        onChange={(e) => setIsMale(false)}
                                    />
                                    Nữ
                                </label>
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="form-label" htmlFor="dateOfBirth">Ngày sinh:</label>
                            <input
                                className="input-field"
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                required
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Save</Button>
                    </form>
                </div>
            </div>
        </>
    )
}