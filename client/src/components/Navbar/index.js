import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./style.css";

// Import Components
import Cart from "../../components/Cart"

function Nav() {

  function displayNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link className="navLinks" to="/orderHistory">
              Order History
            </Link>
          </li>
          <li>
            <a href="/" className="navLinks" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link className="navLinks" to="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link className="navLinks" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Cart/>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="header">
      <h1>
        <Link className="retroClassicsLink" to="/">
          Retro Classics
        </Link>
      </h1>

      <nav className="nav">
        {displayNavigation()}
      </nav>
    </header>
  );
}

export default Nav;

