import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/sidebar.jsx"
import "./profile.css";


export default function Profiles() {

    return (
        <div id = "profilesContainer">
            <Sidebar activePage = "Profiles"/>
            <div id="content"></div>
        </div>
    )
}