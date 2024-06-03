import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  // const cartUrl = "https://x8ki-letl-twmt.n7.xano.io/api:-KEOAAw6/cart"
  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   fetch(cartUrl)
  //     .then((response) => response.json())
  //     .then((data) => setCartItems(data))
  //     .catch((error) => console.error("Error fetching cart items:", error));
  // }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Logo />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/dashboard">
                DashBoard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item"></li>
          </ul>
          <div className="links">
            {/* <a className="btn">Log in</a>
            <a className="btn btn-custom">Register</a> */}
            <Link className="nav-link active" to="/cart">
            <FontAwesomeIcon icon={solidIcons.faCartShopping} />{" "}
              {/* {cartItems.length > 0 && (
                // <span className="cart-count">{cartItems.length}</span>
              )} */}
            </Link>
            <Link to={"/wishlist"}>
              <FontAwesomeIcon icon={regularIcons.faHeart} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
