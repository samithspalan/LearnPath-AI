import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import "./Navbar.css";

const Navbar = ({ theme, onToggleTheme }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" style={{ textDecoration: "none" }}>
        <img src="/logo.png" alt="LearnPath AI" className="logo-icon" />
        <span className="brand-gradient">LearnPath AI</span>
      </Link>
      <div className="navbar-links">
        <Link to="/assessments">Assessments</Link>
        <Link to="/learning-plans">Learning Plans</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/ai-assistant">AI Assistant</Link>
      </div>
      <div className="navbar-actions">
        <button className="theme-toggle" onClick={onToggleTheme} type="button" aria-label="Toggle theme">
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
