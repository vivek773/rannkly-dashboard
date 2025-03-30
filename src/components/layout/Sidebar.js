import React from "react";
import { NavLink } from "react-router-dom"; // Changed from Link to NavLink
import ToggleIcon from "../../assets/svg/ToggleIconIcon";
import Logo from "../../assets/images/logo.png";
import HomeIcon from "../../assets/svg/HomeIcon";
import AnalyticsIcon from "../../assets/svg/AnalyticsIcon";
import SettingsIcon from "../../assets/svg/SettingIcon";
import SocialMediaIcon from "../../assets/svg/SocialMediaIcon";
import SurveysIcon from "../../assets/svg/SurveysIcon";

const menuItems = [
  { path: "/", name: "Dashboard", icon: <HomeIcon /> },
  { path: "/analyics", name: "Analytics", icon: <AnalyticsIcon /> },
  { path: "/settings", name: "Settings", icon: <SettingsIcon /> },
  { path: "/social-media", name: "Social Media", icon: <SocialMediaIcon /> },
  { path: "/surveys", name: "Surveys", icon: <SurveysIcon /> },
];

const MenuSection = ({ title, isOpen }) => (
  <div className="menu-section mt-10 pb-10">
    <p className="section-title pl-10 title-40">{title}</p>
    <ul>
      {menuItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive && title !== "MANAGEMENT" ? "active" : ""}`
            }
          >
            {item.icon}
            {isOpen && <span className="ml-10 title-30">{item.name}</span>}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top-section pb-10">
        <h2 className="logo">
          <img src={Logo} alt="R" className="logo-img" />
        </h2>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <ToggleIcon />
        </button>
      </div>

      <MenuSection title="MAIN" isOpen={isOpen} />
      <MenuSection title="MANAGEMENT" isOpen={isOpen} />
    </div>
  );
};

export default Sidebar;