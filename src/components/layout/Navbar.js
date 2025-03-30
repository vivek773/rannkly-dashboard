import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import SearchIcon from "../../assets/svg/SearchIcon";
import BellIcon from "../../assets/svg/BellIconIcon";

const Navbar = ({ isSidebarOpen }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
      <div className="greeting title-45">Good Morning, Nidaant</div>
      <div className="navbar-right">
        <SearchIcon />
        <BellIcon />
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className="profile">
          <img
            src="https://avatar.iran.liara.run/public/27"
            alt="User Profile"
          />
          <div className="user-info">
            <span className="name">Nidaant</span>
            <span className="email">nidaant@gmail.com</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
