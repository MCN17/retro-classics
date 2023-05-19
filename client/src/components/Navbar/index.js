import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./style.css";

//import react icons
import { faUser, faGamepad, faUserCircle, faCartShopping, faReceipt, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// Import Components
import Cart from "../../components/Cart"

function Nav() {

  function displayNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link className="navLinks" to="/orderHistory">
              <FontAwesomeIcon icon={faReceipt} />
              Order History
            </Link>
          </li>
          <li>
            <Link className="navLinks" to="/home">
              <FontAwesomeIcon icon={faGamepad} />
               Games
            </Link>
          </li>
          <li>
            <a href="/" className="navLinks" onClick={() => Auth.logout()}>
            <FontAwesomeIcon icon={faRightFromBracket} rotation={180} />
              Logout
            </a>
          </li>
          <li>
            <Cart/>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li className="signup">
            <Link className="navLinks" to="/signup">
              <FontAwesomeIcon icon={faUserCircle} />
              Signup
            </Link>
          </li>
          <li>
            <Link className="navLinks" to="/login">
              <FontAwesomeIcon icon={faUser} />
              Login
            </Link>
          </li>
          <li>
            <Link className="navLinks" to="/home">
              <FontAwesomeIcon icon={faGamepad} />
               Games
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

