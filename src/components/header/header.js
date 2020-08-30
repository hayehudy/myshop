import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="hd">
      המוצרים שלנו
      <Link to="/login">
        <button className="loginButton">התחבר כמנהל</button>
      </Link>
    </div>
  );
}

export default Header;
