import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/page components/sidebar.jsx";
import ProfileComponent from "../../components/page components/ProfileComponent.jsx";
import "./profile.css";


export default function Profiles() {

    return (
        <div id = "profilesContainer">
            <Sidebar activePage = "Profiles"/>
            <div id="content">
                <ProfileComponent profile_id={window.location.pathname.split("/").pop()} />
            </div>
        </div>
    )
}