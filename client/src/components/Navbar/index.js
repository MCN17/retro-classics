import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function displayNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          Retro Classics
        </Link>
      </h1>

      <nav>
        {displayNavigation()}
      </nav>
    </header>
  );
}

export default Nav;

