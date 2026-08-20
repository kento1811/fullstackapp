import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar( {activePage = ""}){
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <div id="sidebar" className={`${!isOpen ? 'closed' :''}`}>
      <div id="sidebar-inner">
        <div id="sidebar-top">
          <div id="logo" className="sidebarItem">
            <p>MyApp</p>
          </div>
          <div id="HomeButton" className="sidebarItem">
            <button className={`sidebarButton ${activePage == 'Home' ? 'active' : ''}`} onClick={() => navigate("/")}>
              <i className="fa-regular fa-house sidebar-icon"></i>
              Home
            </button>
          </div>
          <div id="ProfileButton" className="sidebarItem">
            <button className={`sidebarButton ${activePage == 'Profiles' ? 'active' : ''}`} onClick={() => navigate("/profiles")}>
              <i className="fa-solid fa-user sidebar-icon"></i>
              Profiles
            </button>
          </div>
          <div id="SettingButton" className="sidebarItem">
            <button className={`sidebarButton ${activePage == 'Conversations' ? 'active' : ''}`} onClick={() => navigate("/conversations")}>
              <i className="fa-regular fa-message sidebar-icon"></i>
              Message
            </button>
          </div>
          <div id="SettingButton" className="sidebarItem">
            <button className={`sidebarButton ${activePage == 'Setting' ? 'active' : ''}`} onClick={() => navigate("/setting")}>
              <i className="fa-solid fa-gear sidebar-icon"></i>
              Setting
            </button>
          </div>
        </div>
      </div>

      <div id="closeButton">
        <button onClick={() => setIsOpen(!isOpen)}>
          <i className={`fa-solid fa-bars ${!isOpen ? 'rotated' : ''}`}></i>
        </button>
      </div>
    </div>
  );
}